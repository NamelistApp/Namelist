import { connect, kea, path } from 'kea'

import type { breadcrumbLogicType } from "./breadcrumbLogicType";
import { userLogic } from '../../../../auth/userLogic';

export const breadcrumbLogic = kea<breadcrumbLogicType>([
    path(['src', 'app', 'components', 'breadcrumb']),
    connect([userLogic])
])