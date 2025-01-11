export interface Team {
    id: string
}

export interface User {
    id: string
    team: Team
    avatarUrl: string | null
    emailAddress: string
    name: string | null
}