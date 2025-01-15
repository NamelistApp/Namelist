import { path, kea, key, props, selectors } from "kea"

import type { crmFormLogicType } from "./crmFormLogicType"
import { CrmFormSceneProps } from "./CrmForm"

export const crmFormLogic = kea<crmFormLogicType>([
    path((key) => ['scenes', 'forms', 'crmFormLogic', key]),
    props({} as CrmFormSceneProps),
    key((props) => props.formId),
    selectors({
        formId: [() => [(_, props) => props.formId], (formId): string => formId],
    }),
])