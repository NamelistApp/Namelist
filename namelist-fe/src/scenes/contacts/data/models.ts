import { filterRecord } from "../../../core/utils"
import { CrmProperties, CrmPropertyValue } from "../../../data/crm/models/CrmObject"

export class Contact {
    private pinnedPropertyKeys = ['email_address', 'phone_number', 'first_name', 'last_name', 'source']

    constructor(
        public id: number,
        public objectTypeId: string,
        public properties: CrmProperties,
        public createdAt: Date,
        public updatedAt: Date | null
    ) { }

    property(key: string): CrmPropertyValue {
        return this.properties[key]
    }

    get pinnedProperties(): CrmProperties {
        return filterRecord(this.properties, this.pinnedPropertyKeys)
    }

    get displayProperties(): CrmProperties {
        // return all pinned properties first. Then all all other properties after (filter out pinned properties)
        return {
            ...this.pinnedProperties,
            ...filterRecord(this.properties, Object.keys(this.properties).filter(key => !this.pinnedPropertyKeys.includes(key)))
        }
    }

    get displayName(): string | null {
        const name = [this.property('first_name'), this.property('last_name')].filter(Boolean).join(' ')
        return name.trim() ? name : null
    }
}

export type CreateContactRequest = {
    emailAddress: string | null
    phoneNumber: string | null
    firstName: string | null
    lastName: string | null
}