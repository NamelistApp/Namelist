export interface Portal {
    id: number
}

export interface User {
    id: number
    portal: Portal
    avatar_url: string | null
    email: string
    name: string
}