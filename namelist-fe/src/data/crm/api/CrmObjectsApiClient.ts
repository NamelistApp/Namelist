import { CreateCrmObjectRequest, RawCrmObject } from "../models/CrmObject"
import { BaseApiClientInterface, Paginated } from "../../../domain/api"

export interface CrmObjectApiClientInterface {
    createObject(objectTypeId: number, request: CreateCrmObjectRequest): Promise<void>
    getObjects(objectTypeId: number, page: number): Promise<Paginated<RawCrmObject>>
}

export class CrmObjectApiClient implements CrmObjectApiClientInterface {
    constructor(private apiClient: BaseApiClientInterface, private portalId: number) { }

    async getObjects(objectTypeId: number, page: number): Promise<Paginated<RawCrmObject>> {
        return this.apiClient.get(`/api/portal/${this.portalId}/objects/${objectTypeId}?page=${page ?? ''}`)
    }

    async createObject(objectTypeId: number, request: CreateCrmObjectRequestInterface): Promise<void> {
        return this.apiClient.post(`/api/portal/${this.portalId}/objects/${objectTypeId}`, request)
    }
}