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

export type CrmPropertyValue = string | number | null
export type CrmProperties = Record<string, CrmPropertyValue>

export interface CrmObjectInterface {
    id: number
    crm_object_type_id: string
    portal_id: number
    created_at: Date
    updated_at: Date | null
    deleted_at: Date | null
    properties: CrmProperties
}