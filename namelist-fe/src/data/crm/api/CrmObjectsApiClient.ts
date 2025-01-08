import { CreateCrmObjectRequest, CreateCrmObjectRequestInterface, RawCrmObject } from "../models/CrmObject"
import { BaseApiClientInterface, Paginated } from "../../../domain/api"

export interface CrmObjectApiClientInterface {
    createObject(objectTypeId: number, request: CreateCrmObjectRequest): Promise<void>
    getObjects(objectTypeId: number, page: number): Promise<Paginated<RawCrmObject>>
    getObject(objectTypeId: number, objectId: number): Promise<RawCrmObject>
}

export class CrmObjectApiClient implements CrmObjectApiClientInterface {
    constructor(private apiClient: BaseApiClientInterface, private portalId: number) { }

    async getObjects(objectTypeId: number, page: number): Promise<Paginated<RawCrmObject>> {
        return this.apiClient.get(`/api/portal/${this.portalId}/crm-objects/${objectTypeId}?page=${page ?? ''}`)
    }

    async getObject(objectTypeId: number, objectId: number): Promise<RawCrmObject> {
        return this.apiClient.get(`/api/portal/${this.portalId}/crm-objects/${objectTypeId}/${objectId}`)
    }

    async createObject(objectTypeId: number, request: CreateCrmObjectRequestInterface): Promise<void> {
        return this.apiClient.post(`/api/portal/${this.portalId}/crm-objects/${objectTypeId}`, request)
    }
}