import { AppShell, Container, Divider } from '@mantine/core'
import React from 'react';

import { Notifications } from '@mantine/notifications'
import { DemoBanner } from './shared/DemoBanner'
import { isDemo } from '../../../core/constants'
import AppNavigation from '../components/AppNavigation'
import { useValues } from 'kea';
import navigationLogic from '../components/navigationLogic';

interface AppLayoutProps {
    children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
    const { opened } = useValues(navigationLogic);
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
                    {children}
                </AppShell.Main>
            </AppShell>
        </Container >
    );
};

export default AppLayout;