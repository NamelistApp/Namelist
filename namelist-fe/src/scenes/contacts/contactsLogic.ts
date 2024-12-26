import { kea, path } from 'kea'
import type { contactsLogicType } from './contactsLogicType'

const contactsLogic = kea<contactsLogicType>([
    path(['scenes', 'contacts', 'contactsLogic']),
])

export default contactsLogic
