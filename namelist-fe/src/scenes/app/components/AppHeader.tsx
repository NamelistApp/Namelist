import { Drawer, Burger, Button, Combobox, Flex, Group, Text, useCombobox } from '@mantine/core'
import Breadcrumb from './breadcrumb/Breadcrumb';
import { IconPlus, IconUser } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { CreateContactForm } from '../../contacts/create/CreateContactForm';

export default function AppHeader({ opened, toggle }: { opened: boolean; toggle: () => void }) {
    const [contactOpened, contactHandler] = useDisclosure(false);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    return (
        <>
            <Flex justify="space-between" align="center" h={60} px="sm">
                <Group h="100%">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
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
                                        <Text fw={700} size={"sm"}>Contact</Text>
                                    </Group>
                                </Combobox.Option>
                            </Combobox.Options>
                        </Combobox.Dropdown>
                    </Combobox>
                </Group>
            </Flex>
            <Drawer opened={contactOpened} onClose={contactHandler.close} title="Create Person" position="right">
                <CreateContactForm />
            </Drawer>
        </>
    );
}