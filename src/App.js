import React from 'react';
import { BrowserRouter, Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Measurement from './pages/Measurement';
import Header from './components/Header';

function App() {


  return (

   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/measure" element={<Measurement />} />
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;