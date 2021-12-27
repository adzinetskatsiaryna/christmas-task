import React from 'react';
import './App.css';
import Header from './components/header';
import Routs from './components/routs';
import Footer from './components/footer';
import { HashRouter as Router } from "react-router-dom"


function App() {
  
  return (
    <div className="App">
        <Router>
          <Header/>
          <Routs />      
        </Router>
        <Footer/>
    </div>
  );
}

export default App;
