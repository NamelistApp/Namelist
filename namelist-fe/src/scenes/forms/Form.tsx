import { BindLogic, useActions, useValues } from 'kea'
import { SceneExport } from '../sceneTypes'
import { Box, Divider, Group, Loader, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { LineChart } from '@mantine/charts'
import '@mantine/charts/styles.css'
import '@mantine/dates/styles.css';
import { DatePickerInput } from '@mantine/dates'
import { IconArrowDownRight, IconArrowUpRight, IconCalendarFilled, IconForms } from '@tabler/icons-react'
import AppHeader from '../app/components/AppHeader'
import { formLogic } from './formLogic'
import { humanFriendlyDate } from '../../lib/utils'

export interface CrmFormSceneProps {
    formId: string
}

export const scene: SceneExport = {
    component: CrmForm,
    logic: formLogic,
    paramsToProps: ({ params: { formId } }): CrmFormSceneProps => ({
        formId: formId
    }),
}

function CrmForm(): JSX.Element {
    const { formId } = useValues(formLogic)

    return (
        <>
            <AppHeader />
            <BindLogic logic={formLogic} props={{ formId }}>
                <CrmFormScene />
            </BindLogic>
        </>
    )
}

function CrmFormScene() {
    const { form, formStats, formStatsLoading, dateRange } = useValues(formLogic)
    const { setDateRange } = useActions(formLogic)

    return (
        <>
            <Stack p="sm">
                <Group>
                    <IconForms size={30} />
                    <Title order={2}>{form.name}</Title>
                </Group>

                <Box w={{ base: 350, sm: "100%", lg: 350 }}>
                    <DatePickerInput
                        type="range"
                        label="Date Range"
                        placeholder="Pick a range"
                        highlightToday={true}
                        leftSection={<IconCalendarFilled stroke={1} />}
                        firstDayOfWeek={0}
                        defaultValue={dateRange}
                        onChange={(value) => setDateRange(value)}
                    />
                </Box>

                <StatsGridIcons />

                <Paper p="md" withBorder>
                    {formStatsLoading ? (
                        <Loader color="blue" />
                    ) : (
                        <>
                            <Title ta={'center'} order={5}>
                                {humanFriendlyDate(formStats.start_date)} &mdash; {humanFriendlyDate(formStats.end_date)}
                            </Title>

                            <Divider mt={10} mb={30} color="gray.2" />

                            <LineChart
                                h={300}
                                data={formStats.chart}
                                dataKey="date"
                                series={[
                                    { name: 'Views', color: 'blue.9' },
                                    { name: 'Submissions', color: 'green.9' },
                                    { name: 'Conversion Rate', color: 'yellow.9' },
                                ]}
                                curveType="linear"
                            />
                        </>
                    )}
                </Paper>
            </Stack>
        </>
    )
}

export function StatsGridIcons() {
    const data = [
        { title: 'Views', value: '$4,145', diff: -13 },
        { title: 'Submissions', value: '745', diff: 18 },
        { title: 'Conversion Rate', value: '745%', diff: 18 }
    ];
    const stats = data.map((stat) => {
        const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight

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