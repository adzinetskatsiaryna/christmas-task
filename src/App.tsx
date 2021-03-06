import React, { useEffect } from 'react';
import './App.css';
import Header from './components/header';
import Routs from './components/routs';
import Footer from './components/footer';
import { HashRouter as Router } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { getToys } from './redux/toysReducer';


function App() {
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getToys()) 
    
  }, []);
  
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
