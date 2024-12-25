import { BindLogic } from 'kea'
import { SceneExport } from '../sceneTypes'
import dashboardLogic from './dashboardLogic'
import { Box, Card, Divider, Group, Paper, SimpleGrid, Stack, Title } from '@mantine/core'
import { LineChart } from '@mantine/charts'
import '@mantine/charts/styles.css'

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
    const data = [
        {
            date: 'Mar 22',
            Apples: 2890,
            Oranges: 2338,
            Tomatoes: 2452,
        },
        {
            date: 'Mar 23',
            Apples: 2756,
            Oranges: 2103,
            Tomatoes: 2402,
        },
        {
            date: 'Mar 24',
            Apples: 3322,
            Oranges: 986,
            Tomatoes: 1821,
        },
        {
            date: 'Mar 25',
            Apples: 3470,
            Oranges: 2108,
            Tomatoes: 2809,
        },
        {
            date: 'Mar 26',
            Apples: 3129,
            Oranges: 1726,
            Tomatoes: 2290,
        },
    ];
    return (
        <>
            <Box p="sm">
                <Group>
                    <Title order={1}>Dashboard</Title>
                </Group>

                <Paper p="xl" withBorder>
                    <Stack>
                        <Title align="center" order={5}>
                            Centered Title
                        </Title>

                        <LineChart
                            h={300}
                            data={data}
                            dataKey="date"
                            series={[
                                { name: 'Apples', color: 'indigo.6' },
                                { name: 'Oranges', color: 'blue.6' },
                                { name: 'Tomatoes', color: 'teal.6' },
                            ]}
                            curveType="linear"
                        />
                    </Stack>
                </Paper>

                <SimpleGrid>

                </SimpleGrid>
            </Box>
        </>
    )
}