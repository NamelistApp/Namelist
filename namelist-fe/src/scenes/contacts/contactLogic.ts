import { afterMount, kea, key, listeners, path, props, selectors } from "kea";

import type { contactLogicType } from "./contactLogicType";
import { Contact } from "./data/models";
import { loaders } from "kea-loaders";
import { appContainer } from "../../core/app-container";

export type ContactLogicProps = {
    contactId: number
}

const contactLogic = kea<contactLogicType>([
    props({} as ContactLogicProps),
    path((key) => ["src", "scenes", "contacts", "contactLogic", key]),
    key((props) => props.contactId),
    selectors({
        contactId: [() => [(_, props) => props.contactId], (contactId): number => contactId],
    }),
    loaders(({ props }) => ({
        contact: {
            __default: {} as Contact,
            loadContact: async (contactId = props.contactId) => {
                return await appContainer.buildContactsRepository().getContact(contactId)
            }
        }
    })),
    listeners({
        loadContactFailure: (error) => {
            console.log(error)
        }
    }),
    afterMount(({ actions }) => {
        actions.loadContact()
    })
]);

export default contactLogic