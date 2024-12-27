import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { createTheme, MantineProvider, virtualColor } from '@mantine/core'
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
    colors: {
      'soft-sand': ['#fcfaf8', '#f4f1ed', '#e9e4e0', '#dcd7d3', '#cfc9c4', '#c3bcb6', '#b7b0aa', '#aba29b', '#9e9792', '#928d8a'],
      'soft-sand-accent': ["#f4f1ed", "#eae9e7", "#d5d0c9", "#bfb5a8", "#ad9f8c", "#a2907a", "#9e896f", "#89765d", "#7b6951", "#6c5a42"],
      'accent': virtualColor({ name: 'sand', light: 'soft-sand-accent-1', dark: 'dark-7' }),
      'bg': virtualColor({ name: 'bg', light: 'soft-sand-1', dark: 'dark-8' }),
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