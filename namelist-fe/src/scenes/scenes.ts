import { combineUrl } from "kea-router"
import { Params, SceneConfig, LoadedScene } from './sceneTypes'
import { urls } from '../core/urls'
import { Error404 } from "../layout/Error404"
import { NetworkError } from "../layout/NetworkError"

export enum Scene {
    Login = 'Login',
    Dashboard = 'Dashboard',
    Contacts = 'Contacts',
    Contact = 'Contact',
    Form = 'Form',
    Forms = 'Forms',
    Error404 = '404',
    ErrorNetwork = '4xx'
}

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
    },

    // Portal based routes
    [Scene.Dashboard]: {
        layout: 'app',
        portalBased: true
    },
    [Scene.Contacts]: {
        layout: 'app',
        portalBased: true
    },
    [Scene.Contact]: {
        layout: 'app',
        portalBased: true
    },
    [Scene.Forms]: {
        layout: 'app',
        portalBased: true
    },
    [Scene.Form]: {
        layout: 'app',
        portalBased: true
    },
}

const preserveParams = (url: string) => (_params: Params, searchParams: Params, hashParams: Params) => {
    const combined = combineUrl(url, searchParams, hashParams)
    return combined.url
}

// NOTE: These redirects will fully replace the URL. If you want to keep support for query and hash params then you should use the above `preserveParams` function.
export const redirects: Record<string, string | ((params: Params, searchParams: Params, hashParams: Params) => string)> = {
}

export const routes: Record<string, Scene> = {
    [urls.login()]: Scene.Login,
    [urls.dashboard()]: Scene.Dashboard,
    [urls.dashboard()]: Scene.Dashboard,
    [urls.contacts()]: Scene.Contacts,
    [urls.contact(':contactId')]: Scene.Contact,
    [urls.forms()]: Scene.Forms,
    [urls.form(':formId')]: Scene.Form,
}