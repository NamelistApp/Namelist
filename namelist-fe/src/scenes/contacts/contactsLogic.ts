import { actions, afterMount, defaults, kea, key, path, props } from 'kea'
import type { contactsLogicType } from './contactsLogicType'
import { Paginated } from '../../core/api'
import { Contact } from './data/models'
import { loaders } from 'kea-loaders'
import { appContainer } from '../../core/app-container'

const contactsLogic = kea<contactsLogicType>([
    path(['scenes', 'contacts', 'contactsLogic']),
    defaults({
        contacts: {} as Paginated<Contact>,
        page: 1
    }),
    loaders(({ values }) => ({
        contacts: {
            loadContacts: async () => {
                return await appContainer.buildContactsRepository().getContacts(values.page)
            }
        }
    })),
    afterMount(({ actions }) => {
        actions.loadContacts()
    })
])

export default contactsLogic
