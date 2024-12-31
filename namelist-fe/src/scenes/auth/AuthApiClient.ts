import { BaseApiClientInterface } from "../../domain/api"
import { User } from "../../domain/types"
import { UserAdapter } from "./adapters/UserAdapter"

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    two_factor: string
}

export interface UserResponse {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    google_id: string | null
    apple_id: string | null
    is_staff: boolean
    current_portal_id: number
    deleted_at: string | null
    created_at: string
    updated_at: string
    avatar_url: string
}

export interface AuthApiClientInterface {
    csrfToken(): Promise<string>
    login(data: Partial<LoginRequest>): Promise<LoginResponse>
    currentUser(): Promise<User>
    logout(): Promise<void>
}

export class AuthApiClient implements AuthApiClientInterface {
    constructor(private api: BaseApiClientInterface) { }

    async csrfToken(): Promise<string> {
        return await this.api.get('/sanctum/csrf-cookie')
    }

    async login(data: Partial<LoginRequest>): Promise<LoginResponse> {
        return await this.api.post('/login', data)
    }

    async currentUser(): Promise<User> {
        const userResponse = await this.api.get('api/user')
        return UserAdapter.toUser(userResponse)
    }

    async logout(): Promise<void> {
        return await this.api.post('/logout')
    }
}