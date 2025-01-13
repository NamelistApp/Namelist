import { notifications } from "@mantine/notifications"
import { sha256 } from "js-sha256"

export function toastError(message: string = 'Something went wrong. Please try again.') {
    notifications.show({
        color: 'red',
        title: 'Error',
        message: message,
        radius: 'md',
    })
}

export function getGravatarUrl(email: string | null) {
    const address = String(email).trim().toLowerCase();

    const hash = sha256(address);

    return `https://www.gravatar.com/avatar/${hash}`;
}