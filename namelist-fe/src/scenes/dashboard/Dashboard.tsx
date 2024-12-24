import { BindLogic } from 'kea'
import { SceneExport } from '../sceneTypes'
import dashboardLogic from './dashboardLogic'
import { Title } from '@mantine/core'

export const scene: SceneExport = {
    component: Dashboard,
    logic: dashboardLogic,
}

function Dashboard(): JSX.Element {
    return (
        <BindLogic logic={dashboardLogic} props={{}}>
            <DashboardScene />
        </BindLogic>
    )
}

function DashboardScene() {
    return (
        <Title order={1}>Dashboard</Title>
    )
}