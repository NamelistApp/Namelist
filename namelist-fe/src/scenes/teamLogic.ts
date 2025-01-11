import { kea, path, actions, connect, reducers, selectors, listeners, afterMount } from 'kea'
import { loaders } from 'kea-loaders'
import { userLogic } from '../auth/userLogic'
import { Team } from '../domain/types';
import { AppContext, mainContainer } from '../MainContainer';

import type { teamLogicType } from "./teamLogicType";

export const teamLogic = kea<teamLogicType>([
    path(['scenes', 'teamLogic']),
    connect([userLogic]),
    loaders(({ values, actions }) => ({
        currentTeam: [
            null as Team | null,
            {
                loadCurrentTeam: async () => {
                    if (!userLogic.values.user) {
                        return null
                    }

                    return userLogic.values.user.team
                }
            },
        ],
    })),
    selectors({
        currentTeamId: [(s) => [s.currentTeam], (currentTeam) => currentTeam?.id || null],
    }),
    listeners(({ actions }) => ({
        loadCurrentTeamSuccess: ({ currentTeam }) => {
            if (currentTeam) {
                AppContext.setCurrentTeamId(currentTeam.id)
            }
        },
    })),
    afterMount(({ actions }) => {
        actions.loadCurrentTeam()
    }),
])
