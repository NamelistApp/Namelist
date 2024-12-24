import { Group, Stack, Text } from '@mantine/core'

export function DemoBanner(): JSX.Element {
    return (
        <Group justify="center" pb={10} pt={10} style={{ backgroundColor: 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-5))', }} >
            <Stack align="center" gap={0}>
                <Text size="xs" style={{ fontWeight: 'bold' }} c="blue">DEMO MODE</Text>
                <Text size='xs' c="dimmed">The database will refresh every hour</Text>
            </Stack>
        </Group>
    )
}