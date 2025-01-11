import { actions, BuiltLogic, connect, kea, listeners, path, props, reducers, selectors } from 'kea'
import { router, urlToAction } from 'kea-router'
import { Scene, routes, redirects, sceneConfigurations, emptySceneParams, preloadedScenes } from './scenes'
import { SceneParams, LoadedScene, SceneConfig, SceneExport, Params } from './sceneTypes'

import posthog from 'posthog-js'

import type { sceneLogicType } from "./sceneLogicType";
import { userLogic } from '../auth/userLogic'
import { handleLoginRedirect } from './auth/loginLogic'
import { urls } from '../domain/urls'
import { addTeamIdIfMissing } from '../lib/router-utils'

export const sceneLogic = kea<sceneLogicType>([
    props(
        {} as {
            scenes?: Record<Scene, () => any>
        }
    ),
    path(['scenes', 'sceneLogic']),
    connect(() => ({
        logic: [router, userLogic],
        actions: [router, ['locationChanged']],
    })),
    actions({
        /* 1. Prepares to open the scene, as the listener may override and do something
            else (e.g. redirecting if unauthenticated), then calls (2) `loadScene`*/
        openScene: (scene: Scene, params: SceneParams, method: string) => ({ scene, params, method }),

        // 2. Start loading the scene's Javascript and mount any logic, then calls (3) `setScene`
        loadScene: (scene: Scene, params: SceneParams, method: string) => ({ scene, params, method }),

        // 3. Set the `scene` reducer
        setScene: (scene: Scene, params: SceneParams, scrollToTop: boolean = false) => ({ scene, params, scrollToTop }),

        setLoadedScene: (loadedScene: LoadedScene) => ({
            loadedScene,
        }),

        reloadBrowserDueToImportError: true
    }),
    reducers({
        scene: [
            null as Scene | null,
            {
                setScene: (_, { scene }) => scene,
            },
        ],
        loadedScenes: [
            preloadedScenes,
            {
                setScene: (state, { scene, params }) =>
                    scene in state
                        ? {
                            ...state,
                            [scene]: { ...state[scene], sceneParams: params, lastTouch: new Date().valueOf() },
                        }
                        : state,
                setLoadedScene: (state, { loadedScene }) => ({
                    ...state,
                    [loadedScene.id]: { ...loadedScene, lastTouch: new Date().valueOf() },
                }),
            },
        ],
        loadingScene: [
            null as Scene | null,
            {
                loadscene: (_, { scene }) => scene,
                setScene: () => null,
            },
        ],
        lastReloadAt: [null as number | null, { persist: true }, {}],
    }),
    selectors({
        sceneConfig: [
            (s) => [s.scene],
            (scene: Scene): SceneConfig | null => {
                return sceneConfigurations[scene] || null
            },
        ],
        activeScene: [
            (s) => [s.scene],
            (scene) => scene || null,
        ],
        activeLoadedScene: [
            (s) => [s.activeScene, s.loadedScenes],
            (activeScene, loadedScenes) => (activeScene ? loadedScenes[activeScene] : null),
        ],
        sceneParams: [
            (s) => [s.activeLoadedScene],
            (activeLoadedScene): SceneParams =>
                activeLoadedScene?.sceneParams || { params: {}, searchParams: {}, hashParams: {} },
        ],
        activeSceneLogic: [
            (s) => [s.activeLoadedScene, s.sceneParams],
            (activeLoadedScene, sceneParams): BuiltLogic | null =>
                activeLoadedScene?.logic
                    ? activeLoadedScene.logic.build(activeLoadedScene.paramsToProps?.(sceneParams) || {})
                    : null,
        ],
        params: [(s) => [s.sceneParams], (sceneParams): Record<string, string> => sceneParams.params || {}],
        searchParams: [(s) => [s.sceneParams], (sceneParams): Record<string, any> => sceneParams.searchParams || {}],
        hashParams: [(s) => [s.sceneParams], (sceneParams): Record<string, any> => sceneParams.hashParams || {}],
    }),
    listeners(({ values, actions, props, selectors }) => ({
        openScene: ({ scene, params, method }) => {
            const sceneConfig = sceneConfigurations[scene] || {}
            // get most up to date user on the userLogic
            const user = userLogic.values.user

            const currentPathname = router.values.location.pathname
            const canonicalPathname = addTeamIdIfMissing(router.values.location.pathname)
            if (currentPathname !== canonicalPathname) {
                router.actions.replace(canonicalPathname, router.values.searchParams, router.values.hashParams)
                return
            }

            if (!user) {
                if (!sceneConfig.anonymousOnly && !sceneConfig.anonymousAllowed) {
                    router.actions.replace(urls.login() + `?next=${window.location.pathname}`)
                    return
                }
            } else {
                if (sceneConfig.anonymousOnly) {
                    if (scene === Scene.Login) {
                        handleLoginRedirect()
                    } else {
                        router.actions.replace(urls.default())
                    }
                    return
                }
            }

            actions.loadScene(scene, params, method)
        },
        loadScene: async ({ scene, params, method }, breakpoint) => {
            const clickedLink = method === 'PUSH'
            if (values.scene === scene) {
                actions.setScene(scene, params, clickedLink)
                return
            }

            if (!props.scenes?.[scene]) {
                actions.setScene(Scene.Error404, emptySceneParams, clickedLink)
                return
            }

            let loadedScene = values.loadedScenes[scene]
            const wasNotLoaded = !loadedScene

            if (!loadedScene) {
                // if we can't load the scene in a second, show a spinner
                const timeout = window.setTimeout(() => actions.setScene(scene, params, true), 500)
                let importedScene

                try {
                    importedScene = await props.scenes[scene]()
                } catch (error: any) {
                    if (
                        error.name === 'ChunkLoadError' || // webpack
                        error.message?.includes('Failed to fetch dynamically imported module') // esbuild
                    ) {
                        // Reloaded once in the last 20 seconds and now reloading again? Show network error
                        if (
                            values.lastReloadAt &&
                            parseInt(String(values.lastReloadAt)) > new Date().valueOf() - 20000
                        ) {
                            console.error('App assets regenerated. Showing error page.')
                            actions.setScene(Scene.ErrorNetwork, emptySceneParams, clickedLink)
                        } else {
                            console.error('App assets regenerated. Reloading this page.')
                            actions.reloadBrowserDueToImportError()
                        }
                        return
                    }
                    throw error
                } finally {
                    window.clearTimeout(timeout)
                }
                breakpoint()

                const { default: defaultExport, logic, scene: _scene, ...others } = importedScene

                if (_scene) {
                    loadedScene = { id: scene, ...(_scene as SceneExport), sceneParams: params }
                } else if (defaultExport) {
                    console.warn(`Scene ${scene} not yet converted to use SceneExport!`)
                    loadedScene = {
                        id: scene,
                        component: defaultExport,
                        logic: logic,
                        sceneParams: params,
                    }
                } else {
                    console.warn(`Scene ${scene} not yet converted to use SceneExport!`)
                    loadedScene = {
                        id: scene,
                        component:
                            Object.keys(others).length === 1
                                ? others[Object.keys(others)[0]]
                                : values.loadedScenes[Scene.Error404].component,
                        logic: logic,
                        sceneParams: params,
                    }
                    if (Object.keys(others).length > 1) {
                        console.error('There are multiple exports for this scene. Showing 404 instead.')
                    }
                }
                actions.setLoadedScene(loadedScene)

                if (loadedScene.logic) {
                    // initialize the logic and give it 50ms to load before opening the scene
                    const unmount = loadedScene.logic.build(loadedScene.paramsToProps?.(params) || {}).mount()
                    try {
                        await breakpoint(50)
                    } catch (e) {
                        // if we change the scene while waiting these 50ms, unmount
                        unmount()
                        throw e
                    }
                }
            }
            actions.setScene(scene, params, clickedLink || wasNotLoaded)
        },
        setScene: ({ scene, scrollToTop }, _, __, previousState) => {
            posthog.capture('$pageview')

            // if we clicked on a link, scroll to top
            const previousScene = selectors.scene(previousState)
            if (scrollToTop && scene !== previousScene) {
                window.scrollTo(0, 0)
            }
        },
        reloadBrowserDueToImportError: () => {
            window.location.reload()
        },
        locationChanged: () => {
            const {
                location: { pathname, search, hash },
            } = router.values

            // Remove trailing slash
            if (pathname !== '/' && pathname.endsWith('/')) {
                router.actions.replace(pathname.replace(/(\/+)$/, ''), search, hash)
            }
        }
    })),
    urlToAction(({ actions }) => {
        const mapping: Record<string, (params: Params, searchParams: Params, hashParams: Params, payload: { method: string }) => any> = {}

        for (const path of Object.keys(redirects)) {
            mapping[path] = (params, searchParams, hashParams) => {
                const redirect = redirects[path]
                router.actions.replace(typeof redirect === 'function' ? redirect(params, searchParams, hashParams) : redirect)
            }
        }

        for (const [path, scene] of Object.entries(routes)) {
            mapping[path] = (params, searchParams, hashParams, { method }) => actions.openScene(scene, { params, searchParams, hashParams }, method)
        }

        mapping['/*'] = (_, __, { method }) => actions.openScene(Scene.Error404, emptySceneParams, method)

        return mapping
    }),
])
