import { CreateCrmObjectRequest, CreateCrmObjectRequestInterface, CrmObjectProperty, CrmObjectSource, RawCrmObject } from "../../../data/crm/models/CrmObject";
import { Paginated } from "../../../domain/api";
import { Contact, CreateContactRequest } from "../data/models";

export class ContactsAdapter {
    static fromPaginatedObjects(response: Paginated<RawCrmObject>): Paginated<Contact> {
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
            source: CrmObjectSource.Manual
        })
    }

    static toContact(object: RawCrmObject): Contact {
        return new Contact(
            object.id,
            object.crm_object_type_id,
            object.properties['first_name'],
            object.properties['last_name'],
            object.properties['email_address'],
            object.properties['phone_number'],
            object.properties['source'],
            object.created_at,
            object.updated_at
        )
    }
}