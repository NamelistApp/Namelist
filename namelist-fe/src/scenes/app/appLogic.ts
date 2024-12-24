import { connect, kea, path, selectors } from 'kea'
import type { appLogicType } from './appLogicType'
import { userLogic } from '../../auth/userLogic'

export const appLogic = kea<appLogicType>([
    path(['src', 'scenes', 'app']),
    connect([userLogic]),
    selectors({
        isLoading: [
            (s) => [userLogic.selectors.userLoading],
            (userLoading) => userLoading
        ]
    })
])