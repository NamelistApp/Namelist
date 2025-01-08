import { BindLogic, useValues } from 'kea'
import { SceneExport } from '../sceneTypes'
import { Avatar, Box, Button, Card, Center, Group, Loader, Paper, Text, SimpleGrid, Title, Grid, Timeline } from '@mantine/core'
import { IconGitBranch, IconGitCommit, IconGitPullRequest, IconMessageDots, IconUsers } from '@tabler/icons-react';
import AppHeader from '../app/components/AppHeader';
import contactLogic, { ContactLogicProps } from './contactLogic';
import classes from './styles/Contact.module.scss'

interface ContactSceneProps {
    contactId: number
}

export const scene: SceneExport = {
    component: Contact,
    logic: contactLogic,
    paramsToProps: ({ params: { contactId } }: { params: ContactSceneProps }): ContactLogicProps => ({
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
                            <Title order={2}>{contact.firstName}</Title>
                        </Group>
                        <Grid>
                            <Grid.Col span={3}>
                                <Card withBorder padding="xl" radius="md" className={classes.card}>
                                    <Card.Section
                                        h={140}
                                        style={{
                                            backgroundImage:
                                                'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
                                        }}
                                    />
                                    <Avatar
                                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
                                        size={80}
                                        radius={80}
                                        mx="auto"
                                        mt={-30}
                                        className={classes.avatar}
                                    />
                                    <Text ta="center" fz="lg" fw={500} mt="sm">
                                        {contact.displayName}
                                    </Text>
                                    <Text ta="center" fz="sm" c="dimmed">
                                        Fullstack engineer
                                    </Text>
                                    <Group mt="md" justify="center" gap={30}>
                                        <Box>
                                            <Text ta="center" fz="lg" fw={500}>
                                                100
                                            </Text>
                                            <Text ta="center" fz="sm" c="dimmed" lh={1}>
                                                label
                                            </Text>
                                        </Box>
                                    </Group>
                                    <Button fullWidth radius="md" mt="xl" size="md" variant="default">
                                        Follow
                                    </Button>
                                </Card>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Title pb={20} order={3} fw={500}>Recent Activity</Title>
                                <Timeline active={1} bulletSize={24} lineWidth={2}>
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
                                <Paper>
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