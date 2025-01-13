export enum CrmObjectTypeId {
    Contact = 'contact'
}

export enum CrmObjectSource {
    Manual = "web_app"
}

export interface CreateCrmObjectRequestInterface {
    properties: Record<string, string | number | null>
}

export class CreateCrmObjectRequest {
    constructor(
        public properties: Record<string, string | number | null>
    ) { }
}

export class RawCrmObject {
    constructor(
        public id: number,
        public crm_object_type_id: string,
        public portal_id: number,
        public created_at: Date,
        public updated_at: Date | null,
        public deleted_at: Date | null,
        public properties: Record<string, any>
    ) { }
}

export interface CrmObjectPropertyInterface {
    id: number
    name: string
    value: any
}

export class CrmObjectProperty implements CrmObjectPropertyInterface {
    constructor(
        public id: number,
        public name: string,
        public value: any
    ) { }
}

export interface CrmObjectInterface {
    id: number
    objectTypeId: string
    properties: CrmObjectPropertyInterface[]
    createdAt: Date
    updatedAt: Date | null
}