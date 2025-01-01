import { CrmObjectInterface, CrmObjectProperty, RawCrmObject } from "../../../data/objects/models/CrmObject"
import { BaseApiClientInterface, Paginated } from "../../../domain/api"
import { CreateContactRequest } from "./models"

export interface ContactsApiClientInterface {
    createContact(request: CreateContactRequest): Promise<void>
    getContacts(page: number): Promise<Paginated<RawCrmObject>>
}

export class ContactsApiClient implements ContactsApiClientInterface {
    constructor(private apiClient: BaseApiClientInterface, private portalId: number) { }

    async getContacts(page: number): Promise<Paginated<RawCrmObject>> {
        return this.apiClient.get(`/api/portal/${this.portalId}/contacts?page=${page}`)
    }

    async createContact(request: CreateContactRequest): Promise<void> {
        return this.apiClient.post(`/api/portal/${this.portalId}/contacts`, request)
    }
}