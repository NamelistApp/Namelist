import { CreateCrmObjectRequest, CreateCrmObjectRequestInterface, CrmObject } from "../models/CrmObject"
import { BaseApiClientInterface, Paginated } from "../../../core/api"

export interface CrmObjectApiClientInterface {
    createObject(objectTypeId: string, request: CreateCrmObjectRequest): Promise<void>
    getObjects(objectTypeId: string, page: number): Promise<Paginated<CrmObject>>
    getObject(objectTypeId: string, objectId: number): Promise<CrmObject>
}

export class CrmObjectApiClient implements CrmObjectApiClientInterface {
    constructor(private apiClient: BaseApiClientInterface, private portalId: number) { }

    async getObjects(objectTypeId: string, page: number): Promise<Paginated<CrmObject>> {
        return this.apiClient.get(`/api/portal/${this.portalId}/crm-objects/${objectTypeId}?page=${page ?? ''}`)
    }

    async getObject(objectTypeId: string, objectId: number): Promise<CrmObject> {
        return this.apiClient.get(`/api/portal/${this.portalId}/crm-objects/${objectTypeId}/${objectId}`)
    }

    async createObject(objectTypeId: string, request: CreateCrmObjectRequestInterface): Promise<void> {
        return this.apiClient.post(`/api/portal/${this.portalId}/crm-objects/${objectTypeId}`, request)
    }
}