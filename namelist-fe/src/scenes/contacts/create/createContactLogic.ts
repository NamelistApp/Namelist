import { connect, kea, path, props } from 'kea'
import { forms } from 'kea-forms'
import { notifications } from '@mantine/notifications'

import type { createContactLogicType } from './createContactLogicType'
import { mainContainer } from '../../../MainContainer'
import { toastError } from '../../app/utils'
import { CreateContactRequest } from '../data/models'
import contactsLogic from '../contactsLogic'
import { AxiosError } from 'axios'

export type CreateContactProps = {
    onSuccess?: () => void
}

const createContactLogic = kea<createContactLogicType>([
    path(['scenes', 'contacts', 'create', 'createContactLogic']),
    props({} as CreateContactProps),
    connect(() => ({
        actions: [contactsLogic, ['loadContacts']],
    })),
    forms(({ actions, props }) => ({
        createContactForm: {
            defaults: {
                emailAddress: null,
                phoneNumber: null,
                firstName: null,
                lastName: null,
            } as CreateContactRequest,
            errors: (req: CreateContactRequest) => ({
                emailAddress: ((!req.emailAddress || !/^\S+@\S+$/.test(req.emailAddress)) && !req.firstName) ? 'First name or valid email address is required' : null,
            }),
            submit: async (req) => {
                try {
                    const contactsRepository = mainContainer.buildContactsRepository()
                    await contactsRepository.createContact(req)

                    actions.resetCreateContactForm()
                    props.onSuccess?.()
                    actions.loadContacts()

                    notifications.show({
                        color: 'green',
                        title: 'Success',
                        message: 'Contact created',
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

export default createContactLogic
