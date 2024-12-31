import { afterMount, connect, kea, path, props } from 'kea'
import { forms } from 'kea-forms'
import { notifications } from '@mantine/notifications'
import { router } from 'kea-router'
import { modals } from '@mantine/modals'

import type { createContactLogicType } from './createContactLogicType'
import { mainContainer } from '../../../MainContainer'
import { CreateContactRequest } from '../data/models'
import { toastError } from '../../app/utils'
import { userLogic } from '../../../auth/userLogic'

const createContactLogic = kea<createContactLogicType>([
    path(['scenes', 'contacts', 'create', 'createContactLogic']),
    connect([userLogic]),
    forms(({ actions, props }) => ({
        createContactForm: {
            defaults: {
                email_address: null,
                phone_number: null,
                first_name: null,
                last_name: null,
            } as CreateContactRequest,
            errors: (req: CreateContactRequest) => ({
                email_address: ((!req.email_address || !/^\S+@\S+$/.test(req.email_address)) && !req.first_name) ? 'First name or valid email address is required' : null,
            }),
            submit: async (req) => {
                try {
                    const contactsRepository = mainContainer.buildContactsRepository()
                    await contactsRepository.createContact(req)

                    actions.resetCreateContactForm()

                    notifications.show({
                        color: 'green',
                        title: 'Success',
                        message: 'Contact created',
                        radius: 'md',
                    })
                } catch (error: any) {
                    console.error(error)
                    toastError()
                }
            },
        },
    }))
])

export default createContactLogic
