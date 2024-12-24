import { LoadingOverlay } from "@mantine/core"
import { BindLogic, useMountedLogic, useValues } from "kea"
import { appLogic } from "./appLogic"
import { sceneLogic } from "../sceneLogic"
import { appScenes } from "../appScenes"
import { userLogic } from "../../auth/userLogic"
import { SceneComponent } from "../sceneTypes"
import { PlainLayout } from "./layouts/PlainLayout"
import AppLayout from "./layouts/AppLayout"

const Spinner = () => (
    <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
)

export function App(): JSX.Element {
    const { isLoading } = useValues(appLogic)

    return (
        <>
            {isLoading ? <Spinner /> : <AppScene />}
        </>
    )
}

function AppScene(): JSX.Element {
    useMountedLogic(sceneLogic({ scenes: appScenes }))
    const { activeScene, activeLoadedScene, sceneParams, params, loadedScenes, sceneConfig } = useValues(sceneLogic)
    const { user } = useValues(userLogic)

    let sceneElement: JSX.Element
    if (activeScene && activeScene in loadedScenes) {
        const { component: SceneComponent } = loadedScenes[activeScene]
        sceneElement = <SceneComponent {...params} />
    } else {
        sceneElement = <Spinner />
    }

    const currentSceneElement = (
        <>
            {activeLoadedScene?.logic ? (
                <BindLogic logic={activeLoadedScene.logic} props={activeLoadedScene.paramsToProps?.(sceneParams) || {}}>
                    {sceneElement}
                </BindLogic>
            ) : (
                sceneElement
            )}
        </>
    )

    if (!user || sceneConfig?.layout == 'plain') {
        return (
            <PlainLayout>
                {currentSceneElement}
            </PlainLayout>
        )
    }

    return (
        <AppLayout>
            {currentSceneElement}
        </AppLayout>
    )
}