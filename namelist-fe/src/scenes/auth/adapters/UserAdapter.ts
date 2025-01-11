import { User } from "../../../domain/types";
import { UserResponse } from "../AuthApiClient";

export class UserAdapter {
    static toUser(response: UserResponse): User {
        return {
            id: response.id,
            team: response.team,
            avatar_url: response.avatar_url,
            email: response.email,
            name: response.name
        }
    }
}