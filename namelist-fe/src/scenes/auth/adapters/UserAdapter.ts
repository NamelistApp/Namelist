import { User } from "../../../core/types";
import { UserResponse } from "../AuthApiClient";

export class UserAdapter {
    static toUser(response: UserResponse): User {
        return {
            id: response.id,
            portal: {
                id: response.current_portal_id
            },
            avatar_url: response.avatar_url,
            email: response.email,
            name: response.name
        }
    }
}