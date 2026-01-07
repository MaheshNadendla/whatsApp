import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { GoogleOAuthProvider } from "@react-oauth/google";

import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducer";

import ContextProvider from './components/HomePage/contextDef';


import { GoogleLoginProvider } from './Context/GoogleLoginProvider.jsx'

import { Provider } from "react-redux";





const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;



const store = configureStore({
  reducer: rootReducer,
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // <React.StrictMode>

  <GoogleOAuthProvider clientId={googleClientId}>


      <Provider store={store}>
      <ContextProvider>
      <GoogleLoginProvider>
        
        <App />

      </GoogleLoginProvider>
      </ContextProvider>

      </Provider>

  </GoogleOAuthProvider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
