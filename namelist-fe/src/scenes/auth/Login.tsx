import { BindLogic, useValues } from "kea"
import { SceneExport } from "../sceneTypes"
import loginLogic from "./loginLogic"
import { Box, Button, Paper, PaperProps, PasswordInput, Stack, TextInput, Title } from "@mantine/core"
import { Field, Form } from "kea-forms"

export const scene: SceneExport = {
    component: Login,
    logic: loginLogic
}

function Login(): JSX.Element {
    return (
        <BindLogic logic={loginLogic} props={{}}>
            <LoginScene />
        </BindLogic>
    )
}

function LoginScene() {
    return (
        <>
            <Box style={{ marginTop: 100 }}>
                <Stack align="center">
                    Namelist
                    <LoginForm />
                </Stack>
            </Box>
        </>
    )
}

function LoginForm(props: PaperProps): JSX.Element {
    const { isLoginFormSubmitting } = useValues(loginLogic)

    return (
        <>
            <Paper shadow="sm" mt="xl" radius="md" p="xl" miw={400} withBorder {...props}>
                <Title order={2}>
                    Login
                </Title>

                <Form logic={loginLogic} formKey="loginForm" enableFormOnSubmit>
                    <Stack>
                        <Field name="email">
                            {({ value, onChange }) => (
                                <TextInput
                                    required
                                    label="Email"
                                    placeholder="hello@paywalls.io"
                                    radius="md"
                                    value={value}
                                    onChange={(e) => onChange(e.currentTarget.value)}
                                />
                            )}
                        </Field>

                        <Field name="password">
                            {({ value, onChange }) => (
                                <PasswordInput
                                    required
                                    label="Password"
                                    placeholder="Your password"
                                    radius="md"
                                    value={value}
                                    onChange={(e) => onChange(e.currentTarget.value)}
                                />
                            )}
                        </Field>
                    </Stack>

                    <Button type="submit" mt="xl" disabled={isLoginFormSubmitting}>Login</Button>
                </Form>
            </Paper>
        </>
    )
}