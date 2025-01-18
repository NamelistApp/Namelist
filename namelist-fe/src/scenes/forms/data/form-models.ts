import { CrmObjectPropertyInterface } from "../../../data/crm/models/CrmObject"

export interface FormResponse {
    id: number
    crm_object_type_id: string
    portal_id: number
    submission_count: number
    view_count: number
    created_at: Date
    updated_at: Date | null
    deleted_at: Date | null
    properties: CrmObjectPropertyInterface[]
}

export interface FormStatsResponse {
    start_date: Date
    end_date: Date
    submission_count: number
    view_count: number
    conversion_rate: number
    chart: { date: string, Views: number, Submissions: number, 'Conversion Rate': number }[]
}

export interface FormStats {
    start_date: Date
    end_date: Date
    submission_count: number
    view_count: number
    prev_submission_count: number
    prev_view_count: number
    prev_conversion_rate: number
    submissions_count_delta: number
    view_count_delta: number
    conversion_rate: number
    conversion_rate_delta: number
    timespan: string
    chart: { date: string, Views: number, Submissions: number, 'Conversion Rate': number }[]
}

export class Form {
    constructor(
        public id: number,
        public objectTypeId: string,
        public viewCount: number,
        public submissionCount: number,
        public properties: CrmObjectPropertyInterface[],
        public createdAt: Date,
        public updatedAt: Date | null
    ) { }

    property(key: string): string | null {
        const property = this.properties.find(property => property.key === key)
        return property ? property.value : null
    }

    get name(): string | null {
        return this.property('name')
    }
}

export enum FormType {
    Waitlist = 'waitlist'
}

export enum FormFieldType {
    Text = 'text',
    Email = 'email',
    Phone = 'phone',
}

export interface FormField {
    name: string
    type: FormFieldType
    required: boolean
}

export interface CreateFormRequest {
    name: string
    type: FormType
    fields: FormField[]
}