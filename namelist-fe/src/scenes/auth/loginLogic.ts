import { actions, connect, defaults, kea, listeners, path, selectors } from 'kea'
import { forms } from 'kea-forms'
import { router, encodeParams } from 'kea-router'
import { notifications } from '@mantine/notifications'
import type { loginLogicType } from './loginLogicType'
import { mainContainer } from '../../MainContainer'
import { backendHost, isDemo } from '../../domain/constants'
import { LoginRequest } from './AuthApiClient'
import { userLogic } from '../../auth/userLogic'

const authApiClient = mainContainer.buildAuthApiClient()

enum ServerLoginError {
    GoogleSignInAccountExists = 'GoogleSignInAccountExists',
}

const loginLogic = kea<loginLogicType>([
    path(['scenes', 'auth', 'loginLogic']),
    connect({
        logic: [userLogic],
        actions: [userLogic, ['loadUserSuccess']], // Import specific actions from userLogic
    }),
    selectors({
        serverLoginError: [
            (s) => [],
            () => {
                const params = new URLSearchParams(window.location.search)
                return params.get('loginError') as ServerLoginError;
            }
        ]
    }),
    actions({
        loginWithGoogle: true,
    }),
    listeners(({ actions }) => ({
        loginWithGoogle: async () => {
            window.location.href = `${backendHost}/auth/google/redirect`
        },
    })),
    listeners(({ actions }) => ({
        loadUserSuccess: () => {
            notifications.show({
                color: 'green',
                title: '👋 Welcome back!',
                message: 'Great to see you.',
                radius: 'md',
            })
            actions.resetLoginForm()
            handleLoginRedirect()
        },
        submitLoginFormSuccess: () => {
            userLogic.actions.loadUser()
        },
    })),
    forms(({ actions }) => ({
        loginForm: {
            defaults: {
                email: isDemo ? 'demo@namelist.app' : 'david@namelist.app',
                password: isDemo ? 'DemoPassword' : 'password',
            } as LoginRequest,
            errors: ({ email, password }: LoginRequest) => ({
                email: email ? (/^\S+@\S+$/.test(email) ? null : 'Please enter a valid email') : 'Please enter an email',
                password: password.length <= 6 ? 'Password should include at least 6 characters' : null,
            }),
            submit: async ({ email, password }, breakpoint) => {
                breakpoint()
                try {
                    await authApiClient.csrfToken()
                    return await authApiClient.login({ email, password })
                } catch (error: any) {
                    notifications.show({
                        color: 'red',
                        title: 'Error',
                        message: 'Could not login. Please try again',
                        radius: 'md',
                    })
                    throw error
                }
            },
        },
    })),
])

export function handleLoginRedirect(): void {
    let nextURL = '/'
    try {
        const nextPath = router.values.searchParams['next'] || '/'
        const url = new URL(nextPath.startsWith('/') ? location.origin + nextPath : nextPath)
        nextURL = url.pathname + url.search + encodeParams(router.values.hashParams, '#')
    } catch (e) {
        // do nothing
    }
    // A safe way to redirect to a user input URL. Calls history.replaceState() ensuring the URLs origin does not change
    router.actions.replace(nextURL)
}

export default loginLogic
