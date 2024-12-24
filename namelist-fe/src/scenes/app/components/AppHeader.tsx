import { useValues } from 'kea'
import { Burger, Button, Flex, Group, Text } from '@mantine/core'
import { router } from 'kea-router'
import { sceneLogic } from '../../sceneLogic';
import { userLogic } from '../../../auth/userLogic';
import AppLogo from './AppLogo';
import { Scene } from '../../scenes';
import { urls } from '../../../domain/urls';
import { UserButton } from './UserButton';

export default function AppHeader({ opened, toggle }: { opened: boolean; toggle: () => void }) {
    const { activeScene, sceneParams } = useValues(sceneLogic)
    const { user } = useValues(userLogic)

    return (
        <>
            <Flex justify="space-between" align="center" h="100%" pr="md">
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <AppLogo />
                </Group >

                <Group gap={5} visibleFrom="sm">
                    <Button
                        key={'dashboard'}
                        onClick={() => router.actions.push(urls.default())}
                        {...(activeScene === Scene.Dashboard ? { variant: 'light' } : { variant: 'transparent' })}
                    >
                        <Text>Dashboard</Text>
                    </Button>
                    <Button
                        key={'customers'}
                        onClick={() => router.actions.push(urls.default())}
                        {...(false ? { variant: 'light' } : { variant: 'transparent' })}
                    >
                        <Text>Customers</Text>
                    </Button>
                </Group>

                <Group visibleFrom="sm">
                    <UserButton
                        imageUrl={user?.avatar_url || null}
                        name={user?.name || ""}
                        detail={user?.portal?.name || ""}
                    />
                </Group>
            </Flex >
        </>
    );
}