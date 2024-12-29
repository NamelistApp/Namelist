import { BaseApiClientInterface } from "../../domain/api"
import { UserType } from "../../domain/types"

export type LoginRequest = {
    email: string
    password: string
}

export type LoginResponse = {
    two_factor: string
}

export interface AuthApiClientInterface {
    csrfToken(): Promise<string>
    login(data: Partial<LoginRequest>): Promise<LoginResponse>
    currentUser(): Promise<UserType>
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

    async currentUser(): Promise<UserType> {
        return await this.api.get('api/user')
    }

    async logout(): Promise<void> {
        return await this.api.post('/logout')
    }
}