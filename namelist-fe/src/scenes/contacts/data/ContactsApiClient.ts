import { BaseApiClientInterface } from "../../../domain/api"
import { CreateContactRequest } from "./models"

export interface ContactsApiClientInterface {
    createContact(project: CreateContactRequest): Promise<void>
}

export class ContactsApiClient implements ContactsApiClientInterface {
    constructor(private apiClient: BaseApiClientInterface) { }

    async createContact(contact: CreateContactRequest): Promise<void> {
        // TODO
        return
    }
}

