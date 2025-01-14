import { CrmObject, CrmProperty } from "../../../data/crm/models/CrmObject"

export class Form extends CrmObject {
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