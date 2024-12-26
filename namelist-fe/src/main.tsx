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
      'midnight-sand': ['#2B2A29', '#383736', '#454544', '#525251', '#5E5E5D', '#6B6A69', '#787775', '#858481', '#92918E', '#9F9E9A'],
      'sand': virtualColor({ name: 'sand', light: 'soft-sand', dark: 'primary' }),
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