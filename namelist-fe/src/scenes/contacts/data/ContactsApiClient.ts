import { BaseApiClientInterface } from "../../../domain/api"
import { CreateContactRequest } from "./models"

export interface ContactsApiClientInterface {
    createContact(request: CreateContactRequest): Promise<void>
}

export class ContactsApiClient implements ContactsApiClientInterface {
    constructor(private apiClient: BaseApiClientInterface) { }

    async createContact(request: CreateContactRequest): Promise<void> {
        return this.apiClient.post(`/api/contacts`, request)
    }
}