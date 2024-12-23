import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { createTheme, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { posthogKey, sentryDsn } from './lib/constants'
import { formsPlugin } from 'kea-forms'
import { loadersPlugin } from 'kea-loaders'
import { routerPlugin } from 'kea-router'
import { resetContext } from 'kea'
import posthog from 'posthog-js'
import * as Sentry from "@sentry/react"
import { notifications } from '@mantine/notifications';

initMonitoring()
initKea()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Initial />
  </StrictMode>,
)

function Initial(): JSX.Element {
  const theme = createTheme({
    fontFamily: '"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
    components: {
      Modal: {
        defaultProps: {
          radius: 'lg',
        }
      }
    }
  })

  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <ModalsProvider>
        Hello world
      </ModalsProvider>
    </MantineProvider >
  )
}

function initMonitoring() {
  sentryDsn && Sentry.init({
    dsn: sentryDsn,
    integrations: [
      Sentry.replayIntegration(),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for tracing.
    tracesSampleRate: 1.0,

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });

  posthogKey && posthog.init(posthogKey,
    {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'identified_only'
    }
  )
}

function initKea() {
  resetContext({
    plugins: [
      routerPlugin,
      formsPlugin,
      loadersPlugin({
        onFailure() {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: 'Something went wrong',
            radius: 'md'
          })
        }
      })
    ]
  })
}