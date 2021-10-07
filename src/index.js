import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import './localization';
import theme from "./utils/theme";
import Main from "./components/layout/main/Main";
import reportWebVitals from './reportWebVitals';

const config = {
  apiKey: "AIzaSyCCMTRXgsYXw5DV7mXsklEXleorRVlhcA0",
  authDomain: "movieous-clsu.firebaseapp.com",
  projectId: "movieous-clsu",
  storageBucket: "movieous-clsu.appspot.com",
  messagingSenderId: "524928142230",
  appId: "1:524928142230:web:f288fb61088c84e38cabb7",
  measurementId: "G-DP0S7LGZ0G"
};

const app = initializeApp(config);
const analytics = getAnalytics(app);


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
