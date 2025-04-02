import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Helvetica Neue', sans-serif;
    background-color: #f4f4f4;
    color: #333;
  }

  header {
    background-color: #222;
    color: white;
    padding: 2rem;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  nav a {
    color: white;
    margin: 0 1rem;
    text-decoration: none;
    font-size: 1.2rem;
    transition: color 0.3s;
  }

  nav a:hover {
    color: #007BFF;
  }

  h1 {
    font-size: 3rem;
  }
`;
