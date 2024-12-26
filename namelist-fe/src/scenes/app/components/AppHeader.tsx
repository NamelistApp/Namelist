import { useValues } from 'kea'
import { Box, Burger, Button, Divider, Flex, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core'
import { router } from 'kea-router'
import { sceneLogic } from '../../sceneLogic';
import { userLogic } from '../../../auth/userLogic';
import AppLogo from './AppLogo';
import { Scene } from '../../scenes';
import { urls } from '../../../domain/urls';
import { UserButton } from './UserButton';
import Breadcrumb from './breadcrumb/Breadcrumb';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';

export default function AppHeader({ opened, toggle }: { opened: boolean; toggle: () => void }) {
    const { activeScene, sceneParams } = useValues(sceneLogic)
    const { user } = useValues(userLogic)

    return (
        <>
            <Flex justify="space-between" align="center" h={60} px="sm">
                <Group h="100%">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Breadcrumb />
                </Group >

                <Group visibleFrom="sm">
                    <Button variant="default">Invite members</Button>
                </Group>
            </Flex>
        </>
    );
}