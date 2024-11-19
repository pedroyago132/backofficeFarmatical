import React from 'react';
import { BrowserRouter, Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Measurement from './pages/Measurement';
import Register from './pages/Register';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { getDatabase } from 'firebase/database';
import { initMercadoPago } from '@mercadopago/sdk-react';


const firebaseConfig = {
  apiKey: "AIzaSyBfjrD4DDMz2ucwLvdxf3-6K98514ZaSdw",
  authDomain: "app-project-farmatical.firebaseapp.com",
  projectId: "app-project-farmatical",
  storageBucket: "app-project-farmatical.firebasestorage.app",
  messagingSenderId: "264403208467",
  appId: "1:264403208467:web:a7fb74ed3c6c7998eff2e6",
  measurementId: "G-XR9NWN60G6",
  databaseURL: "https://app-project-farmatical-default-rtdb.firebaseio.com/",
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

initMercadoPago('APP_USR-63d6daa1-b82e-40fa-a266-a62599669d04');

export { database }


const theme = createTheme({
  colorSchemes: {
    
    light: {
      palette: {
        primary: {
          main: '#FF5733',
          light:'#7F00FF',
          dark:"#7F00FF"
        },

        secondary:{
          main: '#FF5733',
          light:'#7F00FF',
          dark:"#7F00FF"
        },
        
      
        // ...other tokens
      },
      
    },
    dark: {
      palette: {
        primary: {
          main: '#FF5733',
          light:'#7F00FF',
          dark:"#7F00FF"
        },

        secondary:{
          main: '#FF5733',
          light:'#7F00FF',
          dark:"#7F00FF"
        },
       
      },
    },

  },
});

function App() {


  return (

    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/measure" element={<Measurement />} />
          <Route path="/registro" element={<Register />} />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
   
  );
}

export default App;