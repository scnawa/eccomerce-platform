import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PageList from './components/PageList';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <PageList />
        <Footer />
      </BrowserRouter>
  );
}

export default App;
