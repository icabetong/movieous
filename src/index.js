import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { initializeApp } from "firebase/app";
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from "@firebase/storage";

import './localization';
import './custom.css';
import theme from "./utils/theme";
import Main from "./layouts/main/Main";
import reportWebVitals from './reportWebVitals';

require('dotenv').config();

const config = {
  apiKey: "AIzaSyCCMTRXgsYXw5DV7mXsklEXleorRVlhcA0",
  authDomain: "movieous-clsu.firebaseapp.com",
  projectId: "movieous-clsu",
  storageBucket: "movieous-clsu.appspot.com",
  messagingSenderId: "524928142230",
  appId: "1:524928142230:web:f288fb61088c84e38cabb7",
  measurementId: "G-DP0S7LGZ0G"
};
export const app = initializeApp(config);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

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
