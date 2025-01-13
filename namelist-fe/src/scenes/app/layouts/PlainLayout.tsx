import { Notifications } from '@mantine/notifications'
import { isDemo } from '../../../core/constants'
import { DemoBanner } from './shared/DemoBanner'

interface AppLayoutProps {
    children: React.ReactNode
}

export const PlainLayout = ({ children }: AppLayoutProps): JSX.Element => {
    return (
        <>
            {isDemo && <DemoBanner />}
            <Notifications position="bottom-right" zIndex={1000} />
            {children}
        </>
    )
}