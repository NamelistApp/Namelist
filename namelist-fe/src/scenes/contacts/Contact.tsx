import { BindLogic, useValues } from 'kea'
import { SceneExport } from '../sceneTypes'
import { Avatar, Box, Button, Card, Center, Group, Loader, Paper, Text, SimpleGrid, Title, Grid, Timeline, Stack } from '@mantine/core'
import { IconGitBranch, IconGitCommit, IconGitPullRequest, IconMail, IconMessageDots, IconPhone, IconUsers } from '@tabler/icons-react';
import AppHeader from '../app/components/AppHeader'
import contactLogic, { ContactLogicProps } from './contactLogic'
import classes from './styles/Contact.module.scss'

export const scene: SceneExport = {
    component: Contact,
    logic: contactLogic,
    paramsToProps: ({ params: { contactId } }): ContactLogicProps => ({
        contactId: contactId
    }),
}

function Contact(): JSX.Element {
    const { contactId } = useValues(contactLogic)
    return (
        <BindLogic logic={contactLogic} props={{ contactId }}>
            <AppHeader />
            <Box px="sm">
                <ContactScene />
            </Box>
        </BindLogic>
    )
}

export function ContactScene() {
    const { contact, contactLoading } = useValues(contactLogic)

    return (
        <>
            {
                contactLoading ? (
                    <Center style={{ height: '100vh' }}><Loader color="blue" /></Center>
                ) : (
                    <>
                        <Group mb="md">
                            <IconUsers size={30} />
                            <Title order={2}>{contact.property('first_name')}</Title>
                        </Group>
                        <Grid>
                            <Grid.Col span={3}>
                                <Card withBorder padding="md" radius="md" className={classes.card}>
                                    <Text ta="center" fz="lg" fw={500} mt="sm">
                                        {contact.displayName}
                                    </Text>
                                    {contact.property('company_name') && (
                                        <Text ta="center" fz="sm" c="dimmed">
                                            {contact.property('company_name')}
                                        </Text>
                                    )}
                                    <Group mt="md" justify="center" gap={30}>
                                        <Stack align="center" gap={5}>
                                            <Button radius={'xl'} p={0} w={40} h={40} variant='light' disabled={contact.property('phone_nuber') ? false : true}>
                                                <IconPhone size={18} stroke={1.5} />
                                            </Button>
                                            <Text size="xs" c="dimmed">Call</Text>
                                        </Stack>

                                        <Stack align="center" gap={5}>
                                            <Button radius={'xl'} p={0} w={40} h={40} variant='light' disabled={contact.property('email_address') ? false : true}>
                                                <IconMail size={18} stroke={1.5} />
                                            </Button>
                                            <Text size="xs" c="dimmed">Email</Text>
                                        </Stack>
                                    </Group>

                                    <Stack mt="md" gap="xs">
                                        {Object.entries(contact.displayProperties).map(([key, value]) => {
                                            return (
                                                <Stack key={key} gap={0}>
                                                    <Text c="dimmed" tt="uppercase" fw={600} fz={10}>
                                                        {key}
                                                    </Text>
                                                    <Text fw={500} fz={15}>
                                                        {value}
                                                    </Text>
                                                </Stack>
                                            )
                                        })}
                                    </Stack>
                                </Card>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Title pb={20} order={3} fw={500}>Upcoming</Title>
                                <Timeline bulletSize={30} lineWidth={2}>
                                    <Timeline.Item lineVariant="dashed" bullet={<Stack gap={0}><Text fw={500} size="xs">Tue</Text></Stack>} title="Meeting with David">
                                        <Text c="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
                                        <Text size="xs" mt={4}>2 hours ago</Text>
                                    </Timeline.Item>

                                    <Timeline.Item bullet={<Text fw={500} size="xs">12</Text>} title="Commits" lineVariant="dashed">
                                        <Text c="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
                                        <Text size="xs" mt={4}>52 minutes ago</Text>
                                    </Timeline.Item>

                                    <Timeline.Item title="Pull request" bullet={<IconGitPullRequest size={12} />} lineVariant="dashed">
                                        <Text c="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
                                        <Text size="xs" mt={4}>34 minutes ago</Text>
                                    </Timeline.Item>

                                    <Timeline.Item title="Code review" bullet={<IconMessageDots size={12} />} lineVariant="dashed">
                                        <Text c="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
                                        <Text size="xs" mt={4}>12 minutes ago</Text>
                                    </Timeline.Item>
                                </Timeline>
                                <Title mt={40} pb={20} order={3} fw={500}>Recent Activity</Title>
                                <Timeline active={100} bulletSize={30} lineWidth={2}>
                                    <Timeline.Item bullet={<IconGitBranch size={12} />} title="New branch">
                                        <Text c="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
                                        <Text size="xs" mt={4}>2 hours ago</Text>
                                    </Timeline.Item>

                                    <Timeline.Item bullet={<IconGitCommit size={12} />} title="Commits">
                                        <Text c="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
                                        <Text size="xs" mt={4}>52 minutes ago</Text>
                                    </Timeline.Item>

                                    <Timeline.Item title="Pull request" bullet={<IconGitPullRequest size={12} />} lineVariant="dashed">
                                        <Text c="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
                                        <Text size="xs" mt={4}>34 minutes ago</Text>
                                    </Timeline.Item>

                                    <Timeline.Item title="Code review" bullet={<IconMessageDots size={12} />}>
                                        <Text c="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
                                        <Text size="xs" mt={4}>12 minutes ago</Text>
                                    </Timeline.Item>
                                </Timeline>
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <Paper withBorder p="sm" radius="md">
                                    Associations
                                </Paper>
                            </Grid.Col>
                        </Grid>
                    </>
                )
            }
        </>
    );
}