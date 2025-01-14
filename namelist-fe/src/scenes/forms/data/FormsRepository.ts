import { Paginated } from "../../../core/api"
import { CrmObjectApiClientInterface } from "../../../data/crm/api/CrmObjectsApiClient"
import { CrmObjectTypeId } from "../../../data/crm/models/CrmObject"
import { Form } from "./form-models"

export interface FormsRepositoryInterface {
    getForms(page: number): Promise<Paginated<Form>>
}

export class FormsRepository implements FormsRepositoryInterface {
    constructor(private apiClient: CrmObjectApiClientInterface) { }

    async getForms(page: number): Promise<Paginated<Form>> {
        const response = await this.apiClient.getObjects(CrmObjectTypeId.Form, page)
        return {
            ...response,
            data: response.data as Form[]
        }
    }
}

