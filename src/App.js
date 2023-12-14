import logo from './logo.svg';
import LoginPage from './Components/Containers/Login';
import React, { useState, useEffect, useContext} from 'react';
import './App.css';
import Welcome from './Components/Containers/Welcom';
import SigninPage from './Components/Containers/Singin';
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import { AppProvider, AppContext} from './Components/Containers/AppContext';
import RoutePage from './Components/Containers/Routes';

function App() {


  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(()=>{
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches(e.matches));
  }, [])

  return (

    
    <AppProvider>
      <div className="App">
          <RoutePage/>
      </div>
    </AppProvider>
  );
}

export default App;
