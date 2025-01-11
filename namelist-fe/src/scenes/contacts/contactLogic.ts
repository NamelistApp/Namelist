import { afterMount, kea, key, listeners, path, props, selectors } from "kea";

import type { contactLogicType } from "./contactLogicType";
import { Contact } from "./data/models";
import { loaders } from "kea-loaders";
import { mainContainer } from "../../MainContainer";

export type ContactLogicProps = {
    contactId: string
}

const contactLogic = kea<contactLogicType>([
    props({} as ContactLogicProps),
    path((key) => ["src", "scenes", "contacts", "contactLogic", key]),
    key((props) => props.contactId),
    selectors({
        contactId: [() => [(_, props) => props.contactId], (contactId): string => contactId],
    }),
    loaders(({ props }) => ({
        contact: {
            __default: {} as Contact,
            loadContact: async (contactId = props.contactId) => {
                return await mainContainer.buildContactsRepository().getContact(contactId)
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