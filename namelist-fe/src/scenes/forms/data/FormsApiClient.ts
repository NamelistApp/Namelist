import dayjs from "dayjs"
import { BaseApiClientInterface, Paginated } from "../../../core/api"
import { DateRange } from "../../../lib/utils"
import { Form, FormResponse, FormStatsResponse } from "./form-models"

export interface FormsApiClientInterface {
    getForms(page: number): Promise<Paginated<FormResponse>>
    getForm(formId: number): Promise<FormResponse>
    getFormStats(formId: number, dateRange: DateRange): Promise<FormStatsResponse>
}

export class FormsApiClient implements FormsApiClientInterface {
    constructor(private apiClient: BaseApiClientInterface, private portalId: number) { }

    async getForms(page: number): Promise<Paginated<FormResponse>> {
        return this.apiClient.get(`/api/portal/${this.portalId}/forms?page=${page}`)
    }

    async getForm(formId: number): Promise<FormResponse> {
        return this.apiClient.get(`/api/portal/${this.portalId}/forms/${formId}`)
    }

    async getFormStats(formId: number, dateRange: DateRange): Promise<FormStatsResponse> {
        const [startDate, endDate] = dateRange.map(date => dayjs(date).format('YYYY-MM-DD'))
        return this.apiClient.get(`/api/portal/${this.portalId}/forms/${formId}/stats?startDate=${startDate}&endDate=${endDate}`)
    }
}