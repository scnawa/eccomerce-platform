import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from "./context/AuthContext";

import PageList from './components/PageList';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Navbar />
          <PageList />
          <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
