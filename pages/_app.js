import { ThemeProvider, createGlobalStyle } from "styled-components"

const theme = {
  colors: {
    primary: "#45ffb3",
    secondary: "#eee",
    background: "#242424",
    //  {
      // primary: "#242424",
      // secondary: "#343434",
    // },
  }
}

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}


html body {
  margin: 0;
  padding: 0;

  background: ${({ theme }) => theme.colors.background};
  color: #eaeaea;
  color: ${({ theme }) => theme.colors.primary};

  font-family: "Roboto Mono", monospace;
}

a {
  color: ${({ theme }) => theme.colors.primary};
}

input[type='number'] {
  -moz-appearance:textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
`

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp