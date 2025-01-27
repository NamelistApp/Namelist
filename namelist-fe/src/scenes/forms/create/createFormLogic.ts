import { connect, kea, path, props } from 'kea'
import { forms } from 'kea-forms'
import { notifications } from '@mantine/notifications'

import { appContainer } from '../../../core/app-container'
import { toastError } from '../../app/utils'
import { AxiosError } from 'axios'

import type { createFormLogicType } from "./createFormLogicType";
import { CreateFormRequest, FormFieldType, FormType } from '../data/form-models'
import { formsLogic } from '../formsLogic'

export type CreateFormProps = {
    onSuccess?: () => void
}

export const createFormLogic = kea<createFormLogicType>([
    path(['scenes', 'forms', 'create', 'createFormLogic']),
    connect({
        actions: [formsLogic, ['loadForms']],
    }),
    props({} as CreateFormProps),
    forms(({ actions, props }) => ({
        createCrmForm: {
            defaults: {
                name: '',
                type: FormType.Waitlist,
                fields: [
                    { name: 'Email Address', type: FormFieldType.Email, required: true }
                ],
            } as CreateFormRequest,
            errors: (req: CreateFormRequest) => ({
                name: !req.name ? 'Name is required' : null,
                type: !Object.values(FormType).includes(req.type) ? 'Type must be in ' + Object.values(FormType).join(', ') : null,
            }),
            submit: async (req) => {
                try {
                    await appContainer.formsRepository().createForm(req)

                    actions.loadForms()
                    actions.resetCreateCrmForm()
                    props.onSuccess?.()

                    notifications.show({
                        color: 'green',
                        title: 'Success',
                        message: 'Form created',
                        radius: 'md',
                    })
                } catch (error: any) {
                    if (error instanceof AxiosError) {
                        toastError(error.response?.data?.message || 'Something went wrong')
                        return
                    }

                    toastError()
                }
            },
        },
    }))
])
