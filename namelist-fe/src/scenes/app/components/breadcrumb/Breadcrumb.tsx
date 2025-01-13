import { Anchor, Avatar, Breadcrumbs, Button, Flex, Text } from '@mantine/core';
import OrganizationCombobox from './OrganizationCombobox';
import { IconCheck, IconChevronDown } from '@tabler/icons-react';

export default function Breadcrumb() {
    return (
        <>
            <Breadcrumbs>
                <OrganizationCombobox>
                    <Button variant="transparent" size="compact-sm" p="0" c="gray.7" rightSection={<IconChevronDown size={14} />}>
                        <Avatar variant="filled" radius="sm" size="sm" color="yellow" mr={5}>NL</Avatar>
                        Namelist
                    </Button>
                </OrganizationCombobox>
            </Breadcrumbs>
        </>
    );
}