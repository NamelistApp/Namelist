import { AppShell, Container, Divider } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { createContext, useContext } from 'react';

import { Notifications } from '@mantine/notifications'
import { DemoBanner } from './shared/DemoBanner'
import { isDemo } from '../../../domain/constants'
import AppHeader from '../components/AppHeader'
import AppNavigation from '../components/AppNavigation'

interface AppLayoutProps {
    children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
    const [opened, { toggle }] = useDisclosure()

    return (
        <Container size="responsive" p={0}>
            {isDemo && <DemoBanner />}
            <Notifications position="top-center" zIndex={1000} />
            <AppShell
                navbar={{
                    width: 230,
                    breakpoint: 'sm',
                    collapsed: { mobile: !opened },
                }}
            >
                <AppShell.Navbar>
                    <AppNavigation />
                </AppShell.Navbar>

                <AppShell.Main>
                    <AppHeader opened={opened} toggle={toggle} />
                    {children}
                </AppShell.Main>
            </AppShell>
        </Container >
    );
};

export default AppLayout;