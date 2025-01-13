import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { colorsTuple, createTheme, MantineProvider, virtualColor } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './scenes/app/App'
import { appContainer } from './core/app-container'

appContainer.init()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Initial />
  </StrictMode>,
)

function Initial(): JSX.Element {
  const theme = createTheme({
    fontFamily: '"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
    colors: {
      'soft-sand': colorsTuple(
        Array.from({ length: 10 }, (_, index) => '#fcfaf8')
      ),
      'soft-sand-accent': colorsTuple(
        Array.from({ length: 10 }, (_, index) => '#f4f1ed')
      ),
      'accent': virtualColor({ name: 'accent', light: 'soft-sand-accent', dark: 'dark-7' }),
      'bg': virtualColor({ name: 'bg', light: 'soft-sand', dark: 'dark-8' }),
    },
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