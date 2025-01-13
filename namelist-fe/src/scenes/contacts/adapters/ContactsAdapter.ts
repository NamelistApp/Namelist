import { CreateCrmObjectRequest, CreateCrmObjectRequestInterface, CrmObject, CrmObjectSource } from "../../../data/crm/models/CrmObject";
import { Paginated } from "../../../core/api";
import { Contact, CreateContactRequest } from "../data/models";

export class ContactsAdapter {
    static fromPaginatedObjects(response: Paginated<CrmObject>): Paginated<Contact> {
        return {
            ...response,
            data: response.data.map((object) => this.toContact(object))
        }
    }

    static toCrmObjectRequest(contactRequest: CreateContactRequest): CreateCrmObjectRequestInterface {
        return new CreateCrmObjectRequest({
            first_name: contactRequest.firstName,
            last_name: contactRequest.lastName,
            email_address: contactRequest.emailAddress,
            phone_number: contactRequest.phoneNumber,
            source: CrmObjectSource.WebApp
        })
    }

    static toContact(object: CrmObject): Contact {
        return new Contact(
            object.id,
            object.crm_object_type_id,
            object.properties,
            object.created_at,
            object.updated_at
        )
    }
}