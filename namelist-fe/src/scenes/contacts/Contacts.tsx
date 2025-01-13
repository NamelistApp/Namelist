import { BindLogic, useValues } from 'kea'
import { SceneExport } from '../sceneTypes'
import contactsLogic from './contactsLogic'
import { Avatar, Box, Button, Center, Group, Loader, Paper, Stack, Table, Text, Title } from '@mantine/core'
import { IconUsers } from '@tabler/icons-react'
import { humanFriendlyDetailedTime, valueOrEmpty } from '../../lib/utils'
import AppHeader from '../app/components/AppHeader'
import { router } from 'kea-router'
import classes from './styles/Contacts.module.scss'
import { Contact } from './data/models'

export const scene: SceneExport = {
    component: Contacts,
    logic: contactsLogic
}

function Contacts(): JSX.Element {
    return (
        <BindLogic logic={contactsLogic} props={{}}>
            <AppHeader />
            <Box px="sm">
                <ContactsScene />
            </Box>
        </BindLogic>
    )
}

function didClickContact(contactId: number) {
    router.actions.push(`/contacts/${contactId}`)
}

export function ContactsScene() {
    const { contacts, contactsLoading } = useValues(contactsLogic)

    return (
        <>
            <Group mb="md">
                <IconUsers size={30} />
                <Title order={2}>People</Title>
            </Group>
            {
                contactsLoading ? (
                    <Center style={{ height: '100vh' }}><Loader color="blue" /></Center>
                ) : contacts.data.length ? (
                    <Paper radius="md" withBorder p="md">
                        <Table styles={classes} miw={800} verticalSpacing="sm">
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Email</Table.Th>
                                    <Table.Th>Source</Table.Th>
                                    <Table.Th>Created</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {contacts.data.map((contact: Contact) => {
                                    return (
                                        <Table.Tr style={{ cursor: 'pointer' }} onClick={() => { didClickContact(contact.id) }} key={contact.id}>
                                            <Table.Td>
                                                <Group gap="sm">
                                                    <Avatar size={26} radius={26} />
                                                    <Text size="sm" fw={500}>
                                                        {valueOrEmpty(contact.displayName)}
                                                    </Text>
                                                </Group>
                                            </Table.Td>
                                            <Table.Td>{valueOrEmpty(contact.property('email_address'))}</Table.Td>
                                            <Table.Td>{valueOrEmpty(contact.property('source'))}</Table.Td>
                                            <Table.Td>{humanFriendlyDetailedTime(contact.createdAt)}</Table.Td>
                                        </Table.Tr>
                                    );
                                })}
                            </Table.Tbody>
                        </Table>
                    </Paper>
                ) : (
                    <Center>
                        <Stack align="center">
                            <Title order={3}>No People Yet</Title>
                            <Button>
                                Create Person
                            </Button>
                        </Stack>
                    </Center>
                )
            }
        </>
    );
}