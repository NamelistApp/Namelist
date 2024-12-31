import { backendHost } from "./constants"
import axios, { AxiosInstance } from "axios"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import { objectClean } from "./utils"

export interface ApiMethodOptions {
    signal?: AbortSignal,
    headers?: Record<string, any>
}

export interface Paginated<T> {
    current_page: number
    data: T[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}

export interface BaseApiClientInterface {
    get(url: string, options?: ApiMethodOptions): Promise<any>,
    post(url: string, data?: any, options?: ApiMethodOptions): Promise<any>
    patch(url: string, data?: any, options?: ApiMethodOptions): Promise<any>
    delete(url: string, options?: ApiMethodOptions): Promise<any>
}

export class BaseApiClient implements BaseApiClientInterface {
    protected axiosInstance: AxiosInstance

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: backendHost,
            withCredentials: true,
            withXSRFToken: true
        })

        this.setupRefreshLogic()
    }

    private setupRefreshLogic() {
        const refreshAuthLogic = async (): Promise<any> => {
            await this.axiosInstance.get("/sanctum/csrf-cookie")
        }
        createAuthRefreshInterceptor(axios, refreshAuthLogic, { statusCodes: [419] })
    }

    async get(url: string, options?: ApiMethodOptions): Promise<any> {
        return (await this.axiosInstance.get(url, { headers: objectClean(options?.headers ?? {}) })).data
    }

    async post(url: string, data?: any, options?: ApiMethodOptions): Promise<any> {
        return (await this.axiosInstance.post(url, data, { headers: objectClean(options?.headers ?? {}) })).data
    }

    async patch(url: string, data?: any, options?: ApiMethodOptions): Promise<any> {
        return (await this.axiosInstance.patch(url, data, { headers: objectClean(options?.headers ?? {}) })).data
    }

    async delete(url: string, options?: ApiMethodOptions): Promise<any> {
        return (await this.axiosInstance.delete(url, { headers: objectClean(options?.headers ?? {}) })).data
    }
}

export class PortalApiClient extends BaseApiClient {
    constructor(portalId: number | undefined) {
        super()
        this.axiosInstance.defaults.params = {
            portalId: portalId
        }
    }
}