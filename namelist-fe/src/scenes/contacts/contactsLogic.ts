import { actions, afterMount, kea, listeners, path, props, reducers } from 'kea'
import type { contactsLogicType } from './contactsLogicType'
import { loaders } from 'kea-loaders'
import { appContainer } from '../../core/app-container'
import { actionToUrl, router, urlToAction } from 'kea-router'
import { urls } from '../../core/urls'

export type ContactsLogicProps = {
    page?: string
}

const contactsLogic = kea<contactsLogicType>([
    props({} as ContactsLogicProps),
    path(['scenes', 'contacts', 'contactsLogic']),
    actions({
        setPage: (page: number) => ({ page })
    }),
    reducers(({ props }) => ({
        page: [
            props.page ? parseInt(props.page) : 1,
            {
                setPage: (_, { page }: { page: number }) => page
            }
        ]
    })),
    listeners(({ actions }) => ({
        setPage: () => {
            actions.loadContacts()
        }
    })),
    loaders(({ values }) => ({
        contacts: {
            loadContacts: async () => {
                return await appContainer.buildContactsRepository().getContacts(values.page)
            }
        }
    })),
    actionToUrl(({ values }) => ({
        setPage: () => {
            return [router.values.location.pathname, { ...router.values.searchParams, page: values.page }]
        }
    })),
    urlToAction(({ actions }) => ({
        [urls.contacts()]: (_, { page }) => {
            if (page) {
                actions.setPage(parseInt(page))
            } else {
                actions.loadContacts()
            }
        }
    }))
])

export default contactsLogic
