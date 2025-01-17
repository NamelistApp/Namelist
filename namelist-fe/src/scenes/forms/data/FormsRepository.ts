import { BaseApiClientInterface, Paginated } from "../../../core/api"
import { CrmObjectApiClientInterface } from "../../../data/crm/api/CrmObjectsApiClient"
import { CreateCrmObjectRequest, CreateCrmObjectRequestInterface, CrmObjectInterface, CrmObjectTypeId } from "../../../data/crm/models/CrmObject"
import { DateRange } from "../../../lib/utils"
import { CreateFormRequest, Form, FormResponse, FormStatsResponse } from "./form-models"
import { FormsApiClientInterface } from "./FormsApiClient"

export interface FormsRepositoryInterface {
    getForms(page: number): Promise<Paginated<Form>>
    getForm(formId: number): Promise<Form>
    getFormStats(formId: number, dateRange: DateRange): Promise<FormStatsResponse>
    createForm(form: CreateFormRequest): Promise<void>
}

export class FormsRepository implements FormsRepositoryInterface {
    constructor(private crmApiClient: CrmObjectApiClientInterface, private formsApiClient: FormsApiClientInterface) { }

    async getForms(page: number): Promise<Paginated<Form>> {
        const response = await this.formsApiClient.getForms(page)
        return {
            ...response,
            data: response.data.map((object) => this.toForm(object))
        }
    }

    async getForm(formId: number): Promise<Form> {
        const response = await this.formsApiClient.getForm(formId)
        return this.toForm(response)
    }

    async getFormStats(formId: number, dateRange: DateRange): Promise<FormStatsResponse> {
        return await this.formsApiClient.getFormStats(formId, dateRange)
    }

    async createForm(form: CreateFormRequest): Promise<void> {
        return await this.crmApiClient.createObject(CrmObjectTypeId.Form, this.toCrmObjectRequest(form))
    }

    private toCrmObjectRequest(request: CreateFormRequest): CreateCrmObjectRequestInterface {
        return new CreateCrmObjectRequest({
            name: request.name,
            type: request.type,
            fields: request.fields
        })
    }

    private toForm(object: FormResponse): Form {
        return new Form(
            object.id,
            object.crm_object_type_id,
            object.view_count,
            object.submission_count,
            object.properties,
            object.created_at,
            object.updated_at
        )
    }
}

