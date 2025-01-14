import { CrmObjectPropertyInterface } from "../../../data/crm/models/CrmObject"

export class Form {
    constructor(
        public id: number,
        public objectTypeId: string,
        public properties: CrmObjectPropertyInterface[],
        public createdAt: Date,
        public updatedAt: Date | null
    ) { }

    property(key: string): string | null {
        const property = this.properties.find(property => property.key === key)
        return property ? property.value : null
    }

    get name(): string | null {
        return this.property('name')
    }
}

export enum FormType {
    Waitlist = 'waitlist'
}

export enum FormFieldType {
    Text = 'text',
    Email = 'email',
    Phone = 'phone',
}

export interface FormField {
    name: string
    type: FormFieldType
    required: boolean
}

export interface CreateFormRequest {
    name: string
    type: FormType
    fields: FormField[]
}