import { forwardRef } from 'react'
import { UnstyledButton, Group, Avatar, Text } from '@mantine/core'

export interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    imageUrl: string | null
    name: string
    detail: string
    icon?: React.ReactNode
}

export const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
    ({ imageUrl, name, detail, icon, ...others }: UserButtonProps, ref) => (
        <UnstyledButton
            ref={ref}
            style={{
                padding: 'var(--mantine-spacing-md)',
                color: 'var(--mantine-color-text)',
                borderRadius: 'var(--mantine-radius-sm)',
            }}
            {...others}
        >
            <Group>
                {imageUrl ? <Avatar src={imageUrl} radius="xl" size="sm" /> : <Avatar color="blue" radius="xl" size="sm">{name.charAt(0)}</Avatar>}

                <div style={{ flex: 1 }}>
                    <Text size="sm" mb={0}>
                        {name}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {detail}
                    </Text>
                </div>

            </Group>
        </UnstyledButton>
    )
);