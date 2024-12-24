export type Organization = {
    id: number
    name: string
    created_at: Date
    updated_at: Date
}

export type User = {
    id: string
    organization: Organization
    avatar_url?: string
    email: string
    name: string
}