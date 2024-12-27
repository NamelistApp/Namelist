import { AuthApiClient, AuthApiClientInterface } from "./scenes/auth/AuthApiClient";
import { BaseApiClient, BaseApiClientInterface } from "./domain/api";
import { posthogKey, sentryDsn } from './domain/constants'
import { formsPlugin } from 'kea-forms'
import { loadersPlugin } from 'kea-loaders'
import { routerPlugin } from 'kea-router'
import { resetContext } from 'kea'
import posthog from 'posthog-js'
import * as Sentry from "@sentry/react"
import { notifications } from '@mantine/notifications';
import { ContactsApiClient, ContactsApiClientInterface } from "./scenes/contacts/data/ContactsApiClient";
import { ContactsRepository, ContactsRepositoryInterface } from "./scenes/contacts/data/ContactsRepository";

class AppContainer {
    private apiClient: BaseApiClientInterface

    constructor(apiClient: BaseApiClientInterface) {
        this.apiClient = apiClient
    }

    init() {
        this.initMonitoring()
        this.initKea()
    }

    buildAuthApiClient(): AuthApiClientInterface {
        return new AuthApiClient(this.apiClient)
    }

    buildContactsRepository(): ContactsRepositoryInterface {
        return new ContactsRepository(this.buildContactsApiClient())
    }

    private buildContactsApiClient(): ContactsApiClientInterface {
        return new ContactsApiClient(this.apiClient)
    }

    private initMonitoring() {
        sentryDsn && Sentry.init({
            dsn: sentryDsn,
            integrations: [
                Sentry.replayIntegration(),
            ],

            // Set tracesSampleRate to 1.0 to capture 100%
            // of transactions for tracing.
            tracesSampleRate: 1.0,

            // Capture Replay for 10% of all sessions,
            // plus for 100% of sessions with an error
            replaysSessionSampleRate: 0.1,
            replaysOnErrorSampleRate: 1.0,
        });

        posthogKey && posthog.init(posthogKey,
            {
                api_host: 'https://us.i.posthog.com',
                person_profiles: 'identified_only'
            }
        )
    }

    private initKea() {
        resetContext({
            plugins: [
                routerPlugin,
                formsPlugin,
                loadersPlugin({
                    onFailure() {
                        notifications.show({
                            color: 'red',
                            title: 'Error',
                            message: 'Something went wrong',
                            radius: 'md'
                        })
                    }
                })
            ]
        })
    }
}

const apiClient = new BaseApiClient()

export const appContainer = new AppContainer(apiClient)