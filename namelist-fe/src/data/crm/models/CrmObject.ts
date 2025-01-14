export enum CrmObjectTypeId {
    Contact = 'contact',
    Form = 'form'
}

export enum CrmObjectSource {
    WebApp = "web_app"
}

export interface CreateCrmObjectRequestInterface {
    properties: Record<string, string | number | {} | null>
}

export class CreateCrmObjectRequest {
    constructor(
        public properties: Record<string, string | number | null | {}>
    ) { }
}

export interface CrmObjectPropertyInterface {
    id: number
    object_id: number
    property_definition_id: number
    key: string
    name: string
    version: number
    value: any
    created_at: Date
    updated_at: Date | null
    deleted_at: Date | null
}

export interface CrmObjectInterface {
    id: number
    crm_object_type_id: string
    portal_id: number
    created_at: Date
    updated_at: Date | null
    deleted_at: Date | null
    properties: CrmObjectPropertyInterface[]
}