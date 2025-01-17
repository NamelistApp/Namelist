import { Scene } from "./scenes"
import { preloadedScenes } from "./scenes"

export const appScenes: Record<Scene, () => any> = {
    [Scene.Error404]: () => ({ default: preloadedScenes[Scene.Error404].component }),
    [Scene.ErrorNetwork]: () => ({ default: preloadedScenes[Scene.ErrorNetwork].component }),
    [Scene.Login]: () => import('./auth/Login'),
    [Scene.Dashboard]: () => import('./dashboard/Dashboard'),
    [Scene.Contacts]: () => import('./contacts/Contacts'),
    [Scene.Contact]: () => import('./contacts/Contact'),
    [Scene.Forms]: () => import('./forms/Forms'),
    [Scene.Form]: () => import('./forms/Form'),
}