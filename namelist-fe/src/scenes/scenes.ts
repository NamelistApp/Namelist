import { combineUrl } from "kea-router"
import { Params, Scene, SceneConfig, LoadedScene } from './sceneTypes'
import { urls } from '../domain/urls'
import { Error404 } from "../layout/Error404"
import { NetworkError } from "../layout/NetworkError"

export const emptySceneParams = { params: {}, searchParams: {}, hashParams: {} }

export const preloadedScenes: Record<string, LoadedScene> = {
    [Scene.Error404]: {
        id: Scene.Error404,
        component: Error404,
        sceneParams: emptySceneParams,
    },
    [Scene.ErrorNetwork]: {
        id: Scene.ErrorNetwork,
        component: NetworkError,
        sceneParams: emptySceneParams,
    },
}

export const sceneConfigurations: Record<Scene, SceneConfig> = {
    [Scene.Error404]: {
        name: 'Not found',
    },
    [Scene.ErrorNetwork]: {
        name: 'Network error',
    },
    [Scene.Login]: {
        anonymousOnly: true,
    }
}

const preserveParams = (url: string) => (_params: Params, searchParams: Params, hashParams: Params) => {
    const combined = combineUrl(url, searchParams, hashParams)
    return combined.url
}

// NOTE: These redirects will fully replace the URL. If you want to keep support for query and hash params then you should use the above `preserveParams` function.
export const redirects: Record<string, string | ((params: Params, searchParams: Params, hashParams: Params) => string)> = {
}

export const routes: Record<string, Scene> = {
    [urls.login()]: Scene.Login
}