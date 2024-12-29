import { notifications } from "@mantine/notifications";

export function toastError() {
    notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Something went wrong. Please try again.',
        radius: 'md',
    })
}