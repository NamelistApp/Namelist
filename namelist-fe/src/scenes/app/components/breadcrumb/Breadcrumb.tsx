import { Anchor, Button, Flex, Text } from '@mantine/core';
import OrganizationCombobox from './OrganizationCombobox';
import { IconCheck, IconChevronDown } from '@tabler/icons-react';

export default function Breadcrumb() {
    return (
        <>
            <OrganizationCombobox>
                <Anchor underline="never">
                    <Flex align="center" gap="sm">
                        <Text>Organization</Text>
                        <IconChevronDown size={14} />
                    </Flex>
                </Anchor>
            </OrganizationCombobox>
        </>
    );
}