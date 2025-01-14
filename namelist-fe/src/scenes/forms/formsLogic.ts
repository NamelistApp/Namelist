import { afterMount, defaults, kea, path } from 'kea'

import type { formsLogicType } from "./formsLogicType"
import { loaders } from 'kea-loaders'
import { Paginated } from '../../core/api'
import { appContainer } from '../../core/app-container'
import { Form } from './data/form-models'


export const formsLogic = kea<formsLogicType>([
    path(['scenes', 'forms', 'formsLogic']),
    defaults({
        forms: {} as Paginated<Form>,
        page: 1
    }),
    loaders(({ values }) => ({
        forms: {
            loadForms: async () => {
                return await appContainer.buildFormsRepository().getForms(values.page)
            }
        }
    })),
    afterMount(({ actions }) => {
        actions.loadForms()
    })
])
