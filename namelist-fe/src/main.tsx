import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { createTheme, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { appContainer } from './container'
import { App } from './scenes/app/App';

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
        <App />
      </ModalsProvider>
    </MantineProvider >
  )
}