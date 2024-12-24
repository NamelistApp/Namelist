import { LogicWrapper } from "kea"

export enum Scene {
    Login = 'Login',
    Error404 = '404',
    ErrorNetwork = '4xx'
}

export type SceneProps = Record<string, any>
export type SceneComponent = (params?: SceneProps) => JSX.Element | null

export interface SceneExport {
    component: SceneComponent // component to render for this scene
    logic?: LogicWrapper // logic to mount for this scene
    paramsToProps?: (params: SceneProps) => SceneProps // convert URL parameters from scenes.ts into logic props
    lastTouched?: number // last time this scene was navigated to, unix timestamp
}

export interface LoadedScene extends SceneExport {
    id: string
    sceneParams: SceneParams
}

export interface SceneParams {
    params: Record<string, any>
    searchParams: Record<string, any>
    hashParams: Record<string, any>
}

export interface Params {
    [key: string]: any
}

export interface SceneConfig {
    /** Custom name for the scene */
    name?: string
    /** Route should only be accessed when logged out */
    anonymousOnly?: boolean
    /** Route **can** be accessed when logged out */
    anonymousAllowed?: boolean
    /**
     * If `app`, navigation is shown, and the scene has default padding.
     * If `plain`, there's no navigation present, and the scene has no padding. (ie. auth)
     * @default 'app'
     */
    layout?: 'app' | 'plain'
}