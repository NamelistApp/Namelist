export enum CrmObjectTypeId {
    Contact = 1
}

export enum CrmObjectSource {
    Manual = "manual"
}

export interface CreateCrmObjectRequestInterface {
    properties: Record<string, string | number | null>
}

export class CreateCrmObjectRequest {
    constructor(
        public properties: Record<string, string | number | null>
    ) { }
}

export class RawCrmProperty {
    constructor(
        public id: number,
        public object_id: number,
        public property_definition_id: number,
        public name: string,
        public version: number,
        public value: any,
        public created_at: Date,
        public updated_at: Date | null,
        public deleted_at: Date | null,
    ) { }
}

export class RawCrmObject {
    constructor(
        public id: number,
        public object_type_id: number,
        public portal_id: number,
        public created_at: Date,
        public updated_at: Date | null,
        public deleted_at: Date | null,
        public properties: RawCrmProperty[]
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
    objectTypeId: number
    properties: CrmObjectPropertyInterface[]
    createdAt: Date
    updatedAt: Date | null
}