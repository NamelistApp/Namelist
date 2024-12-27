import { useValues } from 'kea'
import { Stack, TextInput, Button, rem } from '@mantine/core'
import { Form, Field } from 'kea-forms'

import createContactLogic from './createContactLogic'
import { IconAt } from '@tabler/icons-react'

export function CreateContactForm(): JSX.Element {
    const { isCreateContactFormSubmitting } = useValues(createContactLogic)

    return (
        <>
            <Form logic={createContactLogic} formKey="createContactLogic" enableFormOnSubmit>
                <Stack>
                    <Field name="email_address">
                        {({ value, onChange }) => (
                            <TextInput
                                data-autofocus
                                leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                                label="Email Address"
                                placeholder="Email Address"
                                radius="md"
                                value={value}
                                onChange={(e) => onChange(e.currentTarget.value)}
                            />
                        )}
                    </Field>
                    <Field name="first_name">
                        {({ value, onChange }) => (
                            <TextInput
                                label="First Name"
                                placeholder="First Name"
                                radius="md"
                                value={value}
                                onChange={(e) => onChange(e.currentTarget.value)}
                            />
                        )}
                    </Field>
                    <Field name="last_name">
                        {({ value, onChange }) => (
                            <TextInput
                                label="Last Name"
                                placeholder="Last Name"
                                radius="md"
                                value={value}
                                onChange={(e) => onChange(e.currentTarget.value)}
                            />
                        )}
                    </Field>
                    <Field name="phone_number">
                        {({ value, onChange }) => (
                            <TextInput
                                label="Phone Number"
                                placeholder="Phone Number"
                                radius="md"
                                value={value}
                                onChange={(e) => onChange(e.currentTarget.value)}
                            />
                        )}
                    </Field>
                </Stack>

                <Button type="submit" mt="xl" disabled={isCreateContactFormSubmitting}>Create Person</Button>
            </Form>
        </>
    )
}