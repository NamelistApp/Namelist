import { BindLogic, useValues } from "kea"
import { SceneExport } from "../sceneTypes"
import loginLogic from "./loginLogic"
import { Text, Group, Box, Button, Paper, PaperProps, PasswordInput, Stack, TextInput, Title, Divider, Anchor, Alert } from "@mantine/core"
import { Field, Form } from "kea-forms"
import { GoogleButton } from "./components/GoogleButton"
import AppLogo from "../app/components/AppLogo"

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
                    <AppLogo />
                    <LoginForm />
                </Stack>
            </Box>
        </>
    )
}

function LoginForm(props: PaperProps): JSX.Element {
    const { isLoginFormSubmitting, serverLoginError } = useValues(loginLogic)

    return (
        <>
            <Paper radius="md" maw={400} p="xl" withBorder {...props}>
                <Text size="lg" fw={1000}>
                    Login
                </Text>

                {serverLoginError && (
                    <Alert variant="light" mt={"md"} color="yellow" radius="md" title="Account Found">
                        An account with this email already exists. Please login with your email and password.
                    </Alert>
                )}

                <Group grow mb="md" mt="md">
                    <GoogleButton radius="xl" onClick={() => loginLogic.actions.loginWithGoogle()}>Sign in with Google</GoogleButton>
                </Group>

                <Divider label="Or continue with email" labelPosition="center" my="lg" />

                <Form logic={loginLogic} formKey="loginForm" enableFormOnSubmit>
                    <Stack>
                        <Field name="emailAddress">
                            {({ value, onChange }) => (
                                <TextInput
                                    required
                                    label="Email"
                                    placeholder="hello@namelist.app"
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

                    <Group justify="space-between" mt="xl">
                        <Anchor component="button" type="button" c="dimmed" size="xs">
                            Don't have an account? Register
                        </Anchor>
                        <Button type="submit" radius="xl" disabled={isLoginFormSubmitting}>
                            Login
                        </Button>
                    </Group>
                </Form>
            </Paper>
        </>
    )
}