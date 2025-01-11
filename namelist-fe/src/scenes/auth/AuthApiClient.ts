import { BaseApiClientInterface } from "../../domain/api"
import { User } from "../../domain/types"
import { UserAdapter } from "./adapters/UserAdapter"

export interface LoginRequest {
    emailAddress: string
    password: string
}

export interface LoginResponse {
    two_factor: string
}

export interface TeamResponse {
    id: string
}

export interface UserResponse {
    id: string
    emailAddress: string
    name: string | null
    team: TeamResponse
    createdAt: string
    updatedAt: string
    avatarUrl: string
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