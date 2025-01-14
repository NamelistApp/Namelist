import { useValues } from 'kea'
import { Stack, TextInput, Button, Select, Title, Paper } from '@mantine/core'
import { Form, Group } from 'kea-forms'
import { Field } from '../../app/components/Field'

import { createFormLogic, CreateFormProps } from './createFormLogic'
import { FormFieldType, FormType } from '../data/form-models'

export function CreateForm({ onSuccess }: CreateFormProps): JSX.Element {
    const logicProps = { onSuccess } as CreateFormProps
    const formLogic = createFormLogic(logicProps)
    const { isCrmFormSubmitting } = useValues(formLogic)
    const { crmForm } = useValues(formLogic)

    return (
        <>
            <Form logic={createFormLogic} props={logicProps} formKey="createCrmForm" enableFormOnSubmit>
                <Stack>
                    <Field name="name">
                        {({ value, onChange }) => (
                            <TextInput
                                data-autofocus
                                label="Name"
                                placeholder="Form name"
                                radius="md"
                                value={value || ''}
                                onChange={(e) => onChange(e.currentTarget.value)}
                            />
                        )}
                    </Field>
                    <Field name="type">
                        {({ value, onChange }) => (
                            <Select
                                label="Form type"
                                placeholder="Form type"
                                value={value}
                                onChange={(_value, option) => onChange(option)}
                                data={Object.values(FormType)}
                                defaultValue={FormType.Waitlist}
                                allowDeselect={false}
                            />
                        )}
                    </Field>
                    <Title order={4}>Fields</Title>
                    {crmForm.fields.map((field, index) => (
                        <Paper radius="md" pt="xs" px="md" pb="md" withBorder bg="gray.0">
                            <Group key={index} name={['fields', index]}>
                                <Stack gap="xs">

                                    <Field name="name">
                                        {({ value, onChange }) => (
                                            <TextInput
                                                data-autofocus
                                                label="Field name"
                                                placeholder="Field name"
                                                radius="md"
                                                value={value}
                                                onChange={(e) => onChange(e.currentTarget.value)}
                                            />
                                        )}
                                    </Field>
                                    <Field name="type">
                                        <Select
                                            label="Field type"
                                            placeholder="Field type"
                                            data={Object.values(FormFieldType)}
                                            defaultValue={FormFieldType.Text}
                                            allowDeselect={false}
                                        />
                                    </Field>
                                </Stack>
                            </Group>
                        </Paper>
                    ))}
                </Stack>

                <Button type="submit" mt="xl" disabled={isCrmFormSubmitting}>Create Form</Button>
            </Form>
        </>
    )
}