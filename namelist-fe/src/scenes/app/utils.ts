import { notifications } from "@mantine/notifications";

export function toastError(message: string = 'Something went wrong. Please try again.') {
    notifications.show({
        color: 'red',
        title: 'Error',
        message: message,
        radius: 'md',
    })
}