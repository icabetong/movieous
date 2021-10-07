import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import Main from "./components/layout/main/Main";
import reportWebVitals from './reportWebVitals';

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const theme = extendTheme({ 
  config,
  colors: {
    primary: {
      50: "#fff7da",
      100: "#ffe7ad",
      200: "#ffd77d",
      300: "#ffc74b",
      400: "#ffb71a",
      500: "#e69e00",
      600: "#b37b00",
      700: "#815800",
      800: "#4e3500",
      900: "#1e1100"
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Main />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
