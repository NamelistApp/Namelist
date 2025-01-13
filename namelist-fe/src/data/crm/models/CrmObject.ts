export enum CrmObjectTypeId {
    Contact = 'contact'
}

export enum CrmObjectSource {
    WebApp = "web_app"
}

export interface CreateCrmObjectRequestInterface {
    properties: Record<string, string | number | null>
}

export class CreateCrmObjectRequest {
    constructor(
        public properties: Record<string, string | number | null>
    ) { }
}

export class CrmProperty {
    constructor(
        public id: number,
        public object_id: number,
        public property_definition_id: number,
        public key: string,
        public name: string,
        public version: number,
        public value: any,
        public created_at: Date,
        public updated_at: Date | null,
        public deleted_at: Date | null,
    ) { }
}

export class CrmObject {
    constructor(
        public id: number,
        public crm_object_type_id: string,
        public portal_id: number,
        public created_at: Date,
        public updated_at: Date | null,
        public deleted_at: Date | null,
        public properties: CrmProperty[]
    ) { }

    property(name: string): string | null {
        const property = this.properties.find(property => property.name === name)
        return property ? property.value : null
    }
}

export interface CrmObjectPropertyInterface {
    id: number
    key: string
    name: string
    value: any
}

export interface CrmObjectInterface {
    id: number
    objectTypeId: string
    properties: CrmObjectPropertyInterface[]
    createdAt: Date
    updatedAt: Date | null
}