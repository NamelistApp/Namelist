import { kea, path } from 'kea'
import { forms } from 'kea-forms'
import { notifications } from '@mantine/notifications'
import { router } from 'kea-router'
import { modals } from '@mantine/modals'

import type { createContactLogicType } from './createContactLogicType'
import { appContainer } from '../../../container'
import { CreateContactRequest } from '../data/models'
import { toastError } from '../../app/utils'

const contactsRepository = appContainer.buildContactsRepository()

const createContactLogic = kea<createContactLogicType>([
    path(['scenes', 'contacts', 'create', 'createContactLogic']),
    forms(({ actions }) => ({
        createContactForm: {
            defaults: {
                email_address: '',
                phone_number: '',
                first_name: '',
                last_name: '',
            } as CreateContactRequest,
            errors: (req: CreateContactRequest) => ({
                email_address: (!/^\S+@\S+$/.test(req.email_address) && !req.first_name) ? 'First name or valid email address is required' : null,
            }),
            submit: async (req) => {
                try {
                    await contactsRepository.createContact(req)

                    actions.resetCreateContactForm()

                    notifications.show({
                        color: 'green',
                        title: 'Success',
                        message: 'Contact created',
                        radius: 'md',
                    })
                } catch (error: any) {
                    toastError()
                }
            },
        },
    })),
])

export default createContactLogic
