import { BindLogic, useValues } from 'kea'
import { SceneExport } from '../sceneTypes'
import { Anchor, Badge, Box, Button, Card, Center, Flex, Grid, Group, Loader, Stack, Title, Text, ThemeIcon } from '@mantine/core'
import '@mantine/charts/styles.css'
import { IconArrowUpRight, IconBolt, IconChevronRight, IconForms } from '@tabler/icons-react'
import AppHeader from '../app/components/AppHeader'
import { formsLogic } from './formsLogic'
import { router } from 'kea-router'

export const scene: SceneExport = {
    component: Forms,
    logic: formsLogic,
}

function didClickForm(formId: number) {
    router.actions.push(`/forms/${formId}`)
}

function Forms(): JSX.Element {
    return (
        <>
            <BindLogic logic={formsLogic} props={{}}>
                <AppHeader />
                <Box p="sm">
                    <FormsScene />
                </Box>
            </BindLogic >
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
                                <Anchor underline="never" onClick={() => { didClickForm(form.id) }}>
                                    <Card shadow="sm" padding="md" radius="md" withBorder>
                                        <Flex align={"center"}>
                                            <Stack gap={3} w={"100%"}>
                                                <Text c={"primary"} fw={600}>{form.property('name')}</Text>

                                                <Group gap={25}>
                                                    <Stack gap={0}>
                                                        <Text c="dimmed" tt="uppercase" fw={600} fz={10}>
                                                            TODO
                                                        </Text>
                                                        <Group gap={5}>
                                                            <Text fw={500} fz={15}>
                                                                150
                                                            </Text>
                                                            <ThemeIcon
                                                                color="green"
                                                                variant="light"
                                                                radius="md"
                                                                size={20}
                                                            >
                                                                <IconArrowUpRight stroke={1.5} />
                                                            </ThemeIcon>
                                                        </Group>
                                                        <Text c="dimmed" fz={11}>
                                                            <b>15</b> last week
                                                        </Text>
                                                    </Stack>
                                                    <Stack gap={0}>
                                                        <Text c="dimmed" tt="uppercase" fw={600} fz={10}>
                                                            Submissions
                                                        </Text>
                                                        <Group gap={5}>
                                                            <Text fw={500} fz={15}>
                                                                150
                                                            </Text>
                                                            <ThemeIcon
                                                                color="green"
                                                                variant="light"
                                                                radius="md"
                                                                size={20}
                                                            >
                                                                <IconArrowUpRight stroke={1.5} />
                                                            </ThemeIcon>
                                                        </Group>
                                                        <Text c="dimmed" fz={11}>
                                                            <b>15</b> last week
                                                        </Text>
                                                    </Stack>
                                                </Group>
                                            </Stack>

                                            <IconChevronRight color="var(--mantine-color-dimmed)" />
                                        </Flex>
                                    </Card>
                                </Anchor>
                            </Grid.Col>
                        ))}
                    </Grid >
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