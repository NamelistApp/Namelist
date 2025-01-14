import { BindLogic, useValues } from 'kea'
import { SceneExport } from '../sceneTypes'
import { Anchor, Badge, Box, Button, Card, Center, Flex, Grid, Group, Loader, Stack, Title, Text } from '@mantine/core'
import '@mantine/charts/styles.css'
import { IconBolt, IconChevronRight, IconForms } from '@tabler/icons-react'
import AppHeader from '../app/components/AppHeader'
import { formsLogic } from './formsLogic'

export const scene: SceneExport = {
    component: Forms,
    logic: formsLogic,
}

function Forms(): JSX.Element {
    return (
        <>
            <BindLogic logic={formsLogic} props={{}}>
                <AppHeader />
                <Box px="sm">
                    <FormsScene />
                </Box>
            </BindLogic>
        </>
    )
}

function FormsScene() {
    const { forms, formsLoading } = useValues(formsLogic)

    return (
        <>
            <Group mb="md">
                <IconForms size={30} />
                <Title order={2}>Forms</Title>
            </Group>
            {
                formsLoading ? (
                    <Center style={{ height: '100vh' }}><Loader color="blue" /></Center>
                ) : forms.data.length ? (
                    <Grid>
                        {forms.data.map((form) => (
                            <Grid.Col span={{ base: 12, md: 6 }} key={form.id}>
                                <Anchor underline="never" onClick={() => { }}>
                                    <Card shadow="sm" padding="md" radius="md" withBorder>
                                        <Flex align={"center"}>
                                            <Stack w={"100%"} gap={10}>
                                                <Text c={"primary"} fw={600}>{form.name}</Text>

                                            </Stack>
                                            <IconChevronRight color="var(--mantine-color-dimmed)" />
                                        </Flex>
                                    </Card>
                                </Anchor>
                            </Grid.Col>
                        ))}
                    </Grid>
                ) : (
                    <Center>
                        <Stack align="center">
                            <Title order={3}>No Forms Yet</Title>
                        </Stack>
                    </Center>
                )
            }
        </>
    )
}