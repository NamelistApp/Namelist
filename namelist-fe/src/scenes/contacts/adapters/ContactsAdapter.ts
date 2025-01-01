import { ObjectAdapter } from "../../../data/objects/adapters/ObjectAdapter";
import { CrmObjectProperty, RawCrmObject } from "../../../data/objects/models/CrmObject";
import { Paginated } from "../../../domain/api";
import { Contact } from "../data/models";

export class ContactsAdapter {
    static fromPaginatedObjects(response: Paginated<RawCrmObject>): Paginated<Contact> {
        return {
            ...response,
            data: response.data.map((object) => this.toContact(object))
        }
    }

    private static toContact(object: RawCrmObject): Contact {
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