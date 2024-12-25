import { Button, Flex, Title } from '@mantine/core'

export default function AppLogo() {
    return (
        <Button component="a" href="/" variant="subtle" color="gray" radius="md" justify="flex-start">
            <Flex
                align="center"
                gap="xs"
            >
                <Title order={5} fw={400} c="blue">
                    Namelist
                </Title>
            </Flex>
        </Button>
    )
}