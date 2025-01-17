import { path, kea, key, props, selectors, afterMount, defaults, reducers, actions, listeners } from "kea"

import { CrmFormSceneProps } from "./Form"
import { loaders } from "kea-loaders"
import { Form, FormStatsResponse } from "./data/form-models"
import { appContainer } from "../../core/app-container"

import type { formLogicType } from "./formLogicType";
import dayjs from "dayjs"
import { DateRange } from "../../lib/utils"

export const formLogic = kea<formLogicType>([
    path((key) => ['scenes', 'forms', 'crmFormLogic', key]),
    props({} as CrmFormSceneProps),
    key((props) => props.formId),
    actions({
        setDateRange: (dateRange: DateRange) => dateRange
    }),
    reducers({
        dateRange: [
            [dayjs().subtract(1, 'month').startOf('day').toDate(), dayjs().toDate()] as DateRange,
            {
                setDateRange: (dateRange: DateRange) => dateRange
            }
        ]
    }),
    selectors({
        formId: [() => [(_, props) => props.formId], (formId): string => formId]
    }),
    loaders(({ props, values }) => ({
        form: {
            __default: {} as Form,
            loadForm: async (formId = props.formId) => {
                return await appContainer.formsRepository().getForm(formId)
            }
        },
        formStats: {
            __default: {} as FormStatsResponse,
            loadFormStats: async (formId = props.formId) => {
                return await appContainer.formsRepository().getFormStats(formId, values.dateRange)
            }
        }
    })),
    listeners(({ actions }) => ({
        setDateRange: () => {
            actions.loadFormStats()
        }
    })),
    afterMount(({ actions }) => {
        actions.loadForm()
        actions.loadFormStats()
    })
])