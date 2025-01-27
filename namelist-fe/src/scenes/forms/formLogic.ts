import { path, kea, key, props, selectors, afterMount, defaults, reducers, actions, listeners } from "kea"

import { CrmFormSceneProps } from "./Form"
import { loaders } from "kea-loaders"
import { Form, FormStats, FormStatsResponse } from "./data/form-models"
import { appContainer } from "../../core/app-container"

import type { formLogicType } from "./formLogicType";
import dayjs from "dayjs"
import { DateRange } from "../../lib/utils"
import { FormFactory } from "./forms-factory"

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
                setDateRange: (_, dateRange: DateRange) => dateRange
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
            __default: {} as FormStats,
            loadFormStats: async (formId = props.formId) => {
                const [startDate, endDate] = values.dateRange.map(date => dayjs(date))
                const daysBetween = endDate.diff(startDate, 'day') + 1

                console.log('are equal', endDate.isSame(startDate, 'day'))
                console.log('daysBetween', daysBetween)

                const prevDateRange = [
                    startDate.subtract(daysBetween, 'day').toDate(),
                    endDate.subtract(daysBetween, 'day').toDate()
                ] as DateRange
                const [prevStats, currentStats] = await Promise.all([
                    appContainer.formsRepository().getFormStats(formId, prevDateRange),
                    appContainer.formsRepository().getFormStats(formId, values.dateRange)
                ])

                return FormFactory.makeFormStats(prevStats, currentStats)
            }
        },
    })),
    listeners(({ actions, values }) => ({
        setDateRange: () => {
            console.log('dateRange', values.dateRange)
            actions.loadFormStats()
        }
    })),
    afterMount(({ actions }) => {
        actions.loadForm()
        actions.loadFormStats()
    })
])