import { AuthApiClient, AuthApiClientInterface } from "../scenes/auth/AuthApiClient";
import { BaseApiClient, BaseApiClientInterface, PortalApiClient } from './api'
import { posthogKey, sentryDsn } from './constants'
import { formsPlugin } from 'kea-forms'
import { loadersPlugin } from 'kea-loaders'
import { routerPlugin } from 'kea-router'
import { KeaPlugin, resetContext } from 'kea'
import posthog from 'posthog-js'
import * as Sentry from "@sentry/react"
import { notifications } from '@mantine/notifications';
import { CrmObjectApiClient, CrmObjectApiClientInterface } from "../data/crm/api/CrmObjectsApiClient";
import { ContactsRepository, ContactsRepositoryInterface } from "../scenes/contacts/data/ContactsRepository";
import { addPortalIdIfMissing, removePortalIdIfPresent } from "../lib/router-utils";

interface InitKeaProps {
    state?: Record<string, any>
    routerHistory?: any
    routerLocation?: any
    beforePlugins?: KeaPlugin[]
}

export class AppContext {
    private static _currentPortalId: number | null = null

    static setCurrentPortalId(portalId: number) {
        this._currentPortalId = portalId
    }

    static getCurrentPortalId(): number {
        if (!this._currentPortalId) {
            throw new Error('No Current Portal')
        }
        return this._currentPortalId
    }
}

class AppContainer {
    private readonly apiClient = this.buildBaseApiClient()

    init() {
        this.initMonitoring()
        this.initKea()
    }

    // Repositories
    buildContactsRepository(): ContactsRepositoryInterface {
        return new ContactsRepository(this.buildCrmObjectApiClient(AppContext.getCurrentPortalId()))
    }

    // Api Clients
    buildAuthApiClient(): AuthApiClientInterface {
        return new AuthApiClient(this.apiClient)
    }

    // Private
    private buildCrmObjectApiClient(portalId: number): CrmObjectApiClientInterface {
        return new CrmObjectApiClient(this.apiClient, AppContext.getCurrentPortalId())
    }

    private buildBaseApiClient(): BaseApiClientInterface {
        return new BaseApiClient()
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

    private initKea({ routerHistory, routerLocation, beforePlugins }: InitKeaProps = {}) {
        resetContext({
            plugins: [
                routerPlugin({
                    history: routerHistory,
                    location: routerLocation,
                    urlPatternOptions: {
                        // :TRICKY: What chars to allow in named segment values i.e. ":key"
                        // in "/url/:key". Default: "a-zA-Z0-9-_~ %".
                        segmentValueCharset: "a-zA-Z0-9-_~ %.@()!'|",
                    },
                    pathFromRoutesToWindow: (path) => {
                        return addPortalIdIfMissing(path)
                    },
                    transformPathInActions: (path) => {
                        return addPortalIdIfMissing(path)
                    },
                    pathFromWindowToRoutes: (path) => {
                        return removePortalIdIfPresent(path)
                    },
                }),
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

export const appContainer = new AppContainer()