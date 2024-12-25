import { useValues } from 'kea'
import { Burger, Button, Divider, Flex, Group, Stack, Text } from '@mantine/core'
import { router } from 'kea-router'
import { sceneLogic } from '../../sceneLogic';
import { userLogic } from '../../../auth/userLogic';
import AppLogo from './AppLogo';
import { Scene } from '../../scenes';
import { urls } from '../../../domain/urls';
import { UserButton } from './UserButton';
import Breadcrumb from './breadcrumb/Breadcrumb';

export default function AppHeader({ opened, toggle }: { opened: boolean; toggle: () => void }) {
    const { activeScene, sceneParams } = useValues(sceneLogic)
    const { user } = useValues(userLogic)

    return (
        <>
            <Flex justify="space-between" align="center" h={60} px={20}>
                <Group h="100%">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Breadcrumb />
                </Group >
            </Flex>
            <Divider />
        </>
    );
}