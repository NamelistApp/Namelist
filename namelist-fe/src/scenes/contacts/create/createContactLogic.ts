import { kea, path } from 'kea'
import { forms } from 'kea-forms'
import { notifications } from '@mantine/notifications'
import { router } from 'kea-router'
import { modals } from '@mantine/modals'

import type { createContactLogicType } from './createContactLogicType'
import { appContainer } from '../../../container'
import { CreateContactRequest } from '../data/models'

const contactsRepository = appContainer.buildContactsRepository()

const createContactLogic = kea<createContactLogicType>([
    path(['scenes', 'contacts', 'create', 'createContactLogic']),
    forms(({ actions }) => ({
        createContactForm: {
            defaults: {
                name: '',
            } as CreateContactRequest,
            errors: ({ name }: CreateContactRequest) => ({
                name: !name ? 'A name is required' : null,
            }),
            submit: async ({ name }) => {

            },
        },
    })),
])

export default createContactLogic
