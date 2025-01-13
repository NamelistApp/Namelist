import { CrmObject, CrmProperty } from "../../../data/crm/models/CrmObject"

export class Contact {
    private pinnedPropertyKeys = ['email_address', 'phone_number', 'first_name', 'last_name', 'source']

    constructor(
        public id: number,
        public objectTypeId: string,
        public properties: CrmProperty[],
        public createdAt: Date,
        public updatedAt: Date | null
    ) { }

    property(key: string): string | null {
        const property = this.properties.find(property => property.key === key)
        return property ? property.value : null
    }

    get pinnedProperties(): CrmProperty[] {
        return this.properties.filter(property => this.pinnedPropertyKeys.includes(property.name))
    }

    get displayProperties(): CrmProperty[] {
        return [
            ...this.pinnedProperties,
            ...this.properties.filter(property => !this.pinnedPropertyKeys.includes(property.name))
        ]
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