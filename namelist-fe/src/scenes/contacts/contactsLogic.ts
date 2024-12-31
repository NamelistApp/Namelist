import { kea, key, path, props } from 'kea'
import type { contactsLogicType } from './contactsLogicType'

export type ContactsProps = {
    portalId: number
}

const contactsLogic = kea<contactsLogicType>([
    props({} as ContactsProps),
    path((key) => ['scenes', 'contacts', 'contactsLogic', key]),
    key((props) => `paywalls-${props.portalId}`),
])

export default contactsLogic
