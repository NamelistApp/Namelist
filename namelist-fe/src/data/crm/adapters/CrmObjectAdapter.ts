import { CrmObjectProperty, RawCrmProperty } from "../models/CrmObject";

export class CrmObjectAdapter {
    static toCrmProperty(property: RawCrmProperty): CrmObjectProperty {
        return new CrmObjectProperty(property.id, property.name, property.value);
    }

    static toCrmProperties(properties: RawCrmProperty[]): CrmObjectProperty[] {
        return properties.map((property) => CrmObjectAdapter.toCrmProperty(property));
    }
}