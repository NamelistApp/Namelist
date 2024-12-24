import { kea, path } from 'kea'
import type { dashboardLogicType } from './dashboardLogicType'

const dashboardLogic = kea<dashboardLogicType>([
    path(['scenes', 'dashboard', 'dashboardLogic']),
])

export default dashboardLogic
