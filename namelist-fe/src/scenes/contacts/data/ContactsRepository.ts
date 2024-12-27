import { ContactsApiClientInterface } from "./ContactsApiClient"
import { CreateContactRequest } from "./models"

export interface ContactsRepositoryInterface {
    createContact(contact: CreateContactRequest): Promise<void>
}

export class ContactsRepository implements ContactsRepositoryInterface {
    constructor(private apiClient: ContactsApiClientInterface) { }

    async createContact(contact: CreateContactRequest): Promise<void> {
        return await this.apiClient.createContact(contact)
    }
}