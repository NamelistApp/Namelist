import { CrmObject, CrmProperty } from "../../../data/crm/models/CrmObject"

export class Form extends CrmObject {
    get name(): string | null {
        return this.property('name')
    }
}