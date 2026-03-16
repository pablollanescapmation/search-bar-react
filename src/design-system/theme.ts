import { createGlobalStyle } from 'styled-components'

export const theme = {
  colors: {
    pageBg: '#fcfaff',
    panelBg: 'rgba(255, 255, 255, 0.84)',
    borderSoft: 'rgba(114, 83, 190, 0.15)',
    accent: '#7c5ad6',
    accentStrong: '#5e37c8',
    textStrong: '#24193f',
    textMuted: '#6f6585',
  },
  shadows: {
    panel: '0 28px 90px rgba(96, 63, 163, 0.14)',
    panelSoft: '0 20px 55px rgba(96, 63, 163, 0.1)',
    field: '0 18px 45px rgba(102, 71, 180, 0.12)',
    fieldActive: '0 22px 55px rgba(102, 71, 180, 0.18)',
    button: '0 16px 34px rgba(102, 71, 180, 0.25)',
    buttonActive: '0 22px 40px rgba(102, 71, 180, 0.3)',
    popover: '0 28px 60px rgba(77, 47, 145, 0.12)',
  },
  radii: {
    xl: '2rem',
    lg: '1.5rem',
    md: '1.25rem',
    pill: '999px',
  },
  breakpoints: {
    md: '900px',
    sm: '680px',
  },
} as const

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 100%;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  body {
    min-height: 100vh;
    line-height: 1.5;
    font-family: 'Manrope', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background:
      radial-gradient(circle at top left, rgba(196, 180, 255, 0.45), transparent 26%),
      radial-gradient(circle at right 10%, rgba(137, 110, 238, 0.2), transparent 24%),
      linear-gradient(180deg, #ffffff 0%, #faf7ff 100%);
    color: ${({ theme: currentTheme }) => currentTheme.colors.textStrong};
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  #root {
    min-height: 100vh;
    isolation: isolate;
  }
`