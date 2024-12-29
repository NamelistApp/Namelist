import { FieldProps as KeaFieldProps, Field as KeaField } from 'kea-forms'
import { Box, Text } from '@mantine/core'
import React from 'react'

interface FieldProps extends KeaFieldProps { }

export function Field({ children, name, ...props }: FieldProps): ReturnType<typeof KeaField> {
    const template: KeaFieldProps['template'] = ({ kids, error }) => {
        return (
            <Box>
                {React.Children.map(kids, (child) =>
                    React.cloneElement(child, { error })
                )}
            </Box>
        )
    }
    return <KeaField {...props} children={children} name={name} template={template} noStyle />
}