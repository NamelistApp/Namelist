import { actions, kea, listeners, path } from 'kea'
import { forms } from 'kea-forms'
import { router, encodeParams } from 'kea-router'
import { notifications } from '@mantine/notifications'
import type { loginLogicType } from './loginLogicType'
import { appContainer } from '../../container'
import { backendHost, isDemo } from '../../domain/constants'
import { LoginRequest } from './AuthApiClient'
import { userLogic } from '../../auth/userLogic'

const authApiClient = appContainer.buildAuthApiClient()

const loginLogic = kea<loginLogicType>([
    path(['scenes', 'auth', 'loginLogic']),
    actions({
        loginWithGoogle: true,
    }),
    listeners(({ actions }) => ({
        loginWithGoogle: async () => {
            window.location.href = `${backendHost}/auth/google/redirect`
        },
    })),
    forms(({ actions }) => ({
        loginForm: {
            defaults: {
                email: isDemo ? 'demo@paywalls.io' : '',
                password: isDemo ? 'DemoPassword' : '',
            } as LoginRequest,
            errors: ({ email, password }: LoginRequest) => ({
                email: email ? (/^\S+@\S+$/.test(email) ? null : 'Please enter a valid email') : 'Please enter an email',
                password: password.length <= 6 ? 'Password should include at least 6 characters' : null,
            }),
            submit: async ({ email, password }) => {
                try {
                    await authApiClient.csrfToken() // ❌ TODO is this required?
                    await authApiClient.login({ email, password })

                    userLogic.actions.loadUser()

                    notifications.show({
                        color: 'green',
                        title: '👋 Welcome back!',
                        message: 'Great to see you.',
                        radius: 'md',
                    })
                    actions.resetLoginForm()
                } catch (error: any) {
                    notifications.show({
                        color: 'red',
                        title: 'Error',
                        message: 'Could not login. Please try again',
                        radius: 'md',
                    })
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
