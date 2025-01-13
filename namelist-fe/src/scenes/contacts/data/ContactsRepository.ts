import { Paginated } from "../../../core/api"
import { ContactsAdapter } from "../adapters/ContactsAdapter"
import { CrmObjectApiClientInterface } from "../../../data/crm/api/CrmObjectsApiClient"
import { Contact, CreateContactRequest } from "./models"
import { CrmObjectTypeId } from "../../../data/crm/models/CrmObject"

export interface ContactsRepositoryInterface {
    createContact(contact: CreateContactRequest): Promise<void>
    getContacts(page: number): Promise<Paginated<Contact>>
    getContact(id: number): Promise<Contact>
}

export class ContactsRepository implements ContactsRepositoryInterface {
    constructor(private apiClient: CrmObjectApiClientInterface) { }

    async getContacts(page: number): Promise<Paginated<Contact>> {
        const response = await this.apiClient.getObjects(CrmObjectTypeId.Contact, page)
        return ContactsAdapter.fromPaginatedObjects(response)
    }

    async getContact(id: number): Promise<Contact> {
        const response = await this.apiClient.getObject(CrmObjectTypeId.Contact, id)
        return ContactsAdapter.toContact(response)
    }

    async createContact(contact: CreateContactRequest): Promise<void> {
        return await this.apiClient.createObject(CrmObjectTypeId.Contact, ContactsAdapter.toCrmObjectRequest(contact))
    }
}