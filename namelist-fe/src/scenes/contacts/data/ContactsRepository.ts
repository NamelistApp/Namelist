import { Paginated } from "../../../domain/api"
import { ContactsAdapter } from "../adapters/ContactsAdapter"
import { ContactsApiClientInterface } from "./ContactsApiClient"
import { Contact, CreateContactRequest } from "./models"

export interface ContactsRepositoryInterface {
    createContact(contact: CreateContactRequest): Promise<void>
    getContacts(page: number): Promise<Paginated<Contact>>
}

export class ContactsRepository implements ContactsRepositoryInterface {
    constructor(private apiClient: ContactsApiClientInterface) { }

    async getContacts(page: number): Promise<Paginated<Contact>> {
        const response = await this.apiClient.getContacts(page)
        return ContactsAdapter.fromPaginatedObjects(response)
    }

    async createContact(contact: CreateContactRequest): Promise<void> {
        return await this.apiClient.createContact(contact)
    }
}