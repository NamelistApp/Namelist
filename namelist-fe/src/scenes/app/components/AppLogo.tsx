import { Button, Flex, Title } from '@mantine/core'
import { rem } from '@mantine/core'
import { IconInnerShadowBottom } from '@tabler/icons-react'

export default function AppLogo() {
    return (
        <Button component="a" href="/" variant="subtle" color="gray" radius="md" justify="flex-start" px="0">
            <Flex
                align="center"
                gap="xs"
                c="red"
            >
                <IconInnerShadowBottom style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
                <Title order={5} style={{ fontWeight: 500 }}>
                    Namelist
                </Title>
            </Flex>
        </Button>
    )
}