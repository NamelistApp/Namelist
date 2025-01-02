import { BindLogic, useValues } from 'kea'
import { SceneExport } from '../sceneTypes'
import cx from 'clsx';
import contactsLogic from './contactsLogic'
import { Avatar, Box, Button, Center, Group, Loader, Paper, Stack, Table, Text, Title } from '@mantine/core'
import { IconUsers } from '@tabler/icons-react';
import { Contact } from './data/models';
import { humanFriendlyDetailedTime, valueOrEmpty } from '../../lib/utils';

export const scene: SceneExport = {
    component: Contacts,
    logic: contactsLogic
}

function Contacts(): JSX.Element {
    return (
        <BindLogic logic={contactsLogic} props={{}}>
            <Box p="sm">
                <ContactsScene />
            </Box>
        </BindLogic>
    )
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
                        <Table miw={800} verticalSpacing="sm">
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
                                        <Table.Tr key={contact.id}>
                                            <Table.Td>
                                                <Group gap="sm">
                                                    <Avatar size={26} radius={26} />
                                                    <Text size="sm" fw={500}>
                                                        {valueOrEmpty(contact.displayName)}
                                                    </Text>
                                                </Group>
                                            </Table.Td>
                                            <Table.Td>{valueOrEmpty(contact.emailAddress)}</Table.Td>
                                            <Table.Td>{valueOrEmpty(contact.source)}</Table.Td>
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