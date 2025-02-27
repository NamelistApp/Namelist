import { actions, afterMount, defaults, kea, listeners, path } from "kea"
import type { userLogicType } from "./userLogicType"
import { loaders } from "kea-loaders"
import { router } from "kea-router"
import { User } from "../core/types"
import { urls } from "../core/urls"
import { AppContext, appContainer } from "../core/app-container"

const authApiClient = appContainer.buildAuthApiClient()

export const userLogic = kea<userLogicType>([
    path(["src", "userLogic"]),
    defaults({ user: null }),
    actions({
        loadUser: () => ({}),
        logout: true
    }),
    listeners(({ actions }) => ({
        logout: async () => {
            await authApiClient.logout()
            actions.loadUserSuccess(null)

            router.actions.push(urls.login())
        },
        loadUserSuccess: ({ user }) => {
            if (user) {
                AppContext.setCurrentPortalId(user.portal.id)
            }
        }
    })),
    loaders(({ actions }) => ({
        user: [
            null as User | null,
            {
                loadUser: async () => {
                    try {
                        return await authApiClient.currentUser()
                    } catch (error: any) {
                        actions.loadUserFailure(error.message)
                    }
                    return null
                }
            }
        ]
    })),
    afterMount(({ actions }) => {
        actions.loadUser()
    })
])