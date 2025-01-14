import { Paginated } from "../../../core/api"
import { CrmObjectApiClientInterface } from "../../../data/crm/api/CrmObjectsApiClient"
import { CreateCrmObjectRequest, CreateCrmObjectRequestInterface, CrmObject, CrmObjectSource, CrmObjectTypeId } from "../../../data/crm/models/CrmObject"
import { CreateFormRequest, Form } from "./form-models"

export interface FormsRepositoryInterface {
    getForms(page: number): Promise<Paginated<Form>>
    createForm(form: CreateFormRequest): Promise<void>
}

export class FormsRepository implements FormsRepositoryInterface {
    constructor(private apiClient: CrmObjectApiClientInterface) { }

    async getForms(page: number): Promise<Paginated<Form>> {
        const response = await this.apiClient.getObjects(CrmObjectTypeId.Form, page)
        return {
            ...response,
            data: response.data.map((object) => this.toForm(object))
        }
    }

    async createForm(form: CreateFormRequest): Promise<void> {
        return await this.apiClient.createObject(CrmObjectTypeId.Form, this.toCrmObjectRequest(form))
    }

    private toCrmObjectRequest(request: CreateFormRequest): CreateCrmObjectRequestInterface {
        return new CreateCrmObjectRequest({
            name: request.name,
            type: request.type,
            fields: request.fields
        })
    }

    private toForm(object: CrmObject): Form {
        return new Form(
            object.id,
            object.object_type_id,
            object.properties,
            object.created_at,
            object.updated_at
        )
    }
}

