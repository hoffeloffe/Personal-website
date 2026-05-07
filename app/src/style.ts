import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    background: ${({ theme }) => theme.colors.background.default};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  h1 { font-size: ${({ theme }) => theme.typography.fontSize['5xl']}; }
  h2 { font-size: ${({ theme }) => theme.typography.fontSize['4xl']}; }
  h3 { font-size: ${({ theme }) => theme.typography.fontSize['3xl']}; }
  h4 { font-size: ${({ theme }) => theme.typography.fontSize['2xl']}; }
  h5 { font-size: ${({ theme }) => theme.typography.fontSize.xl}; }
  h6 { font-size: ${({ theme }) => theme.typography.fontSize.lg}; }

  p {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  a {
    color: ${({ theme }) => theme.colors.primary[500]};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primary[700]};
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    transition: all ${({ theme }) => theme.transitions.fast};
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary[400]};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    border: 2px solid ${({ theme }) => theme.colors.gray[100]};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary[500]};
  }

  /* Focus indicators */
  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }

  /* Skip to content link */
  .skip-to-content {
    position: absolute;
    top: -40px;
    left: 0;
    background: ${({ theme }) => theme.colors.primary[500]};
    color: ${({ theme }) => theme.colors.text.inverse};
    padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
    text-decoration: none;
    z-index: ${({ theme }) => theme.zIndex[50]};
    border-radius: 0 ${({ theme }) => theme.borderRadius.base} ${({ theme }) => theme.borderRadius.base} 0;
  }

  .skip-to-content:focus {
    top: 0;
  }
`;
