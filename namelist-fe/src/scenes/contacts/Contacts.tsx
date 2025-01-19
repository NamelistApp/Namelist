import { BindLogic, useActions, useValues } from 'kea'
import { SceneExport } from '../sceneTypes'
import contactsLogic, { ContactsLogicProps } from './contactsLogic'
import { Avatar, Box, Skeleton, Center, Group, Loader, Pagination, Paper, Stack, Table, Text, Title, Flex } from '@mantine/core'
import { IconArrowDown, IconUsers } from '@tabler/icons-react'
import { humanFriendlyDetailedTime, valueOrEmpty } from '../../lib/utils'
import AppHeader from '../app/components/AppHeader'
import { router } from 'kea-router'
import classes from './styles/Contacts.module.scss'
import { Contact } from './data/models'
import { urls } from '../../core/urls'

export const scene: SceneExport = {
    component: Contacts,
    logic: contactsLogic,
    paramsToProps: ({ params: { page } }): ContactsLogicProps => ({
        page: page
    }),
}

function Contacts(): JSX.Element {
    const { page } = useValues(contactsLogic)
    return (
        <BindLogic logic={contactsLogic} props={{ page }}>
            <AppHeader />
            <Box p="sm">
                <ContactsScene />
            </Box>
        </BindLogic>
    )
}

function didClickContact(contactId: number) {
    router.actions.push(`/contacts/${contactId}`)
}

export function ContactsScene() {
    const { contacts, contactsLoading, page } = useValues(contactsLogic)
    const { setPage } = useActions(contactsLogic)

    return (
        <>
            <Group mb="md">
                <IconUsers size={30} />
                <Title order={2}>{contacts?.total ? `${contacts.total} ${contacts.total === 1 ? 'Person' : 'People'}` : <Skeleton height={30} width={100} visible />}</Title>
            </Group>
            {
                contactsLoading ? (
                    <Center style={{ height: '100vh' }}><Loader color="blue" /></Center>
                ) : contacts.data.length ? (
                    <>
                        <Paper radius="md" withBorder p="md">
                            <Table styles={classes} miw={800} verticalSpacing="sm">
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Name</Table.Th>
                                        <Table.Th>Phone</Table.Th>
                                        <Table.Th>Email</Table.Th>
                                        <Table.Th>Source</Table.Th>
                                        <Table.Th><Flex gap="2" align="center">Created <IconArrowDown size={12} /></Flex></Table.Th>
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
                                                <Table.Td>{valueOrEmpty(contact.property('phone_number'))}</Table.Td>
                                                <Table.Td>{valueOrEmpty(contact.property('email_address'))}</Table.Td>
                                                <Table.Td>{valueOrEmpty(contact.property('source'))}</Table.Td>
                                                <Table.Td>{humanFriendlyDetailedTime(contact.createdAt)}</Table.Td>
                                            </Table.Tr>
                                        );
                                    })}
                                </Table.Tbody>
                            </Table>
                        </Paper>
                        <Center mt="md">
                            <Pagination
                                total={contacts.total / contacts.per_page}
                                value={page}
                                onChange={(page) => {
                                    setPage(page)
                                }}
                            />
                        </Center>
                    </>
                ) : (
                    <Center>
                        <Stack align="center">
                            <Title order={3}>No People Yet</Title>
                        </Stack>
                    </Center>
                )
            }
        </>
    );
}