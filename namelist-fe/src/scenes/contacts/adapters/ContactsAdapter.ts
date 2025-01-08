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
        const propertiesMap = new Map(object.properties.map((property: CrmObjectProperty) => [property.name, property]))

        return new Contact(
            object.id,
            object.object_type_id,
            propertiesMap.get('first_name')?.value,
            propertiesMap.get('last_name')?.value,
            propertiesMap.get('email_address')?.value,
            propertiesMap.get('phone_number')?.value,
            propertiesMap.get('source')?.value,
            object.created_at,
            object.updated_at
        )
    }
}