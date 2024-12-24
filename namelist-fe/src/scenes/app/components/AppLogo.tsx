import { Flex, Title } from '@mantine/core'

export default function AppLogo() {
    return (
        <Flex
            align="center"
            gap="xs"
        >
            <Title order={5} style={{ fontWeight: 500, color: "#0096FF" }}>
                Namelist
            </Title>
        </Flex>
    )
}