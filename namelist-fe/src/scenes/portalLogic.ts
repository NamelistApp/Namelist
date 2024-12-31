import { kea, path, actions, connect, reducers, selectors, listeners, afterMount } from 'kea'
import { loaders } from 'kea-loaders'
import { userLogic } from '../auth/userLogic'
import type { portalLogicType } from './portalLogicType';
import { Portal } from '../domain/types';
import { AppContext, mainContainer } from '../MainContainer';

export const portalLogic = kea<portalLogicType>([
    path(['scenes', 'portalLogic']),
    connect([userLogic]),
    loaders(({ values, actions }) => ({
        currentPortal: [
            null as Portal | null,
            {
                loadCurrentPortal: async () => {
                    if (!userLogic.values.user) {
                        return null
                    }

                    return userLogic.values.user.portal
                }
            },
        ],
    })),
    selectors({
        currentPortalId: [(s) => [s.currentPortal], (currentPortal) => currentPortal?.id || null],
    }),
    listeners(({ actions }) => ({
        loadCurrentPortalSuccess: ({ currentPortal }) => {
            if (currentPortal) {
                AppContext.setCurrentPortalId(currentPortal.id)
            }
        },
    })),
    afterMount(({ actions }) => {
        actions.loadCurrentPortal()
    }),
])
