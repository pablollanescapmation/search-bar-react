import type { Preview } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from '../src/design-system/theme'

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div
          style={{
            minHeight: '100vh',
            padding: '2rem 1rem',
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    docs: {
      toc: true,
    },
  },
}

export default preview
