import { CreateCrmObjectRequest, CreateCrmObjectRequestInterface, RawCrmObject } from "../models/CrmObject"
import { BaseApiClientInterface, Paginated } from "../../../domain/api"

export interface CrmObjectApiClientInterface {
    createObject(objectTypeId: string, request: CreateCrmObjectRequest): Promise<void>
    getObjects(objectTypeId: string, page: number): Promise<Paginated<RawCrmObject>>
    getObject(objectTypeId: string, objectId: string): Promise<RawCrmObject>
}

export class CrmObjectApiClient implements CrmObjectApiClientInterface {
    constructor(private apiClient: BaseApiClientInterface, private teamId: string) { }

    async getObjects(objectTypeId: string, page: number): Promise<Paginated<RawCrmObject>> {
        return this.apiClient.get(`/api/team/${this.teamId}/crm-objects/${objectTypeId}?page=${page ?? ''}`)
    }

    async getObject(objectTypeId: string, objectId: string): Promise<RawCrmObject> {
        return this.apiClient.get(`/api/team/${this.teamId}/crm-objects/${objectTypeId}/${objectId}`)
    }

    async createObject(objectTypeId: string, request: CreateCrmObjectRequestInterface): Promise<void> {
        return this.apiClient.post(`/api/team/${this.teamId}/crm-objects/${objectTypeId}`, request)
    }
}