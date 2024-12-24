import { AppShell, Container } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

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
        <Container size="responsive">
            {isDemo && <DemoBanner />}
            <Notifications position="bottom-right" zIndex={1000} />
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: 'sm',
                    collapsed: { mobile: !opened },
                }}
                padding="md"
            >
                <AppShell.Header>
                    <AppHeader opened={opened} toggle={toggle} />
                </AppShell.Header>

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