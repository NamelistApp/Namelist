import { Title, Text } from '@mantine/core'

export function NetworkError(): JSX.Element {
    return (
        <>
            <Title order={1}>4xx</Title>
            <Text>Network Error. Please try again.</Text>
        </>
    )
}
