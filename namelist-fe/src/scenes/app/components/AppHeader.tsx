import { Drawer, Burger, Button, Combobox, Flex, Group, Text, useCombobox } from '@mantine/core'
import Breadcrumb from './breadcrumb/Breadcrumb';
import { IconPlus, IconUser } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { CreateContactForm } from '../../contacts/create/CreateContactForm';
import { useActions, useValues } from 'kea';
import navigationLogic from './navigationLogic';

export default function AppHeader() {
    const [contactOpened, contactHandler] = useDisclosure(false);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const { setOpened } = useActions(navigationLogic)
    const { opened } = useValues(navigationLogic);

    return (
        <>
            <Flex justify="space-between" align="center" h={60} px="sm">
                <Group h="100%">
                    <Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom="sm" size="sm" />
                    <Breadcrumb />
                </Group >

                <Group visibleFrom="sm">
                    <Button variant="subtle" color="dimmed">Invite members</Button>

                    <Combobox
                        store={combobox}
                        width={250}
                        withArrow
                        withinPortal={false}
                        onOptionSubmit={(val) => {
                            switch (val) {
                                case 'contact':
                                    contactHandler.open();
                                    break;
                            }
                            combobox.closeDropdown();
                        }}
                    >
                        <Combobox.Target>
                            <Button onClick={() => combobox.toggleDropdown()} leftSection={<IconPlus />}>Create</Button>
                        </Combobox.Target>

                        <Combobox.Dropdown>
                            <Combobox.Options>
                                <Combobox.Option value={'contact'} key={'contact'}>
                                    <Group>
                                        <IconUser />
                                        <Text fw={700} size={"sm"}>Person</Text>
                                    </Group>
                                </Combobox.Option>
                            </Combobox.Options>
                        </Combobox.Dropdown>
                    </Combobox>
                </Group>
            </Flex>
            <Drawer overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} opened={contactOpened} onClose={contactHandler.close} title="Create Person" position="right">
                <CreateContactForm onSuccess={contactHandler.close} />
            </Drawer>
        </>
    );
}