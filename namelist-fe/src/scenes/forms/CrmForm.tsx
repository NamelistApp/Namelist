import { BindLogic, useValues } from 'kea'
import { SceneExport } from '../sceneTypes'
import { Box, Divider, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { LineChart } from '@mantine/charts'
import '@mantine/charts/styles.css'
import { IconArrowDownRight, IconArrowUpRight, IconForms, IconHome } from '@tabler/icons-react'
import AppHeader from '../app/components/AppHeader'
import { crmFormLogic } from './crmFormLogic'

export interface CrmFormSceneProps {
    formId: string
}

export const scene: SceneExport = {
    component: CrmForm,
    logic: crmFormLogic,
    paramsToProps: ({ params: { formId } }: { params: CrmFormSceneProps }): CrmFormSceneProps => ({
        formId: formId
    }),
}

function CrmForm(): JSX.Element {
    const { formId } = useValues(crmFormLogic)

    return (
        <>
            <AppHeader />
            <BindLogic logic={crmFormLogic} props={{ formId }}>
                <CrmFormScene />
            </BindLogic>
        </>
    )
}

function CrmFormScene() {
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
            <Stack p="sm">
                <Group>
                    <IconForms size={30} />
                    <Title order={2}>TODO Form name</Title>
                </Group>

                <StatsGridIcons />

                <Paper p="md" withBorder>
                    <Title ta={'center'} order={5}>
                        Centered Title
                    </Title>

                    <Divider mt={10} mb={30} color="gray.2" />

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
                </Paper>
            </Stack>
        </>
    )
}

export function StatsGridIcons() {
    const data = [
        { title: 'Revenue', value: '$13,456', diff: 34 },
        { title: 'Profit', value: '$4,145', diff: -13 },
        { title: 'Coupons usage', value: '745', diff: 18 },
    ];
    const stats = data.map((stat) => {
        const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

        return (
            <Paper withBorder p="md" radius="md" key={stat.title}>
                <Group justify="apart">
                    <div>
                        <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
                            {stat.title}
                        </Text>
                        <Text fw={700} fz="xl">
                            {stat.value}
                        </Text>
                    </div>
                    <ThemeIcon
                        color="gray"
                        variant="light"
                        style={{
                            color: stat.diff > 0 ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-red-6)',
                        }}
                        size={38}
                        radius="md"
                    >
                        <DiffIcon size={28} stroke={1.5} />
                    </ThemeIcon>
                </Group>
                <Text c="dimmed" fz="sm" mt="md">
                    <Text component="span" c={stat.diff > 0 ? 'teal' : 'red'} fw={700}>
                        {stat.diff}%
                    </Text>{' '}
                    {stat.diff > 0 ? 'increase' : 'decrease'} compared to last month
                </Text>
            </Paper>
        );
    });

    return (
        <div>
            <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
        </div>
    );
}