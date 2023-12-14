import LoginPage from './Login';
import React, { useState, useEffect, useContext} from 'react';
import Welcome from './Welcom';
import SigninPage from './Singin';
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import { AppProvider, AppContext} from './AppContext';
import Home from './Home';

export default function RoutePage(){

    const {online} = useContext(AppContext)
    return(
        <Router>
              <Routes>
                    
                    {online && <Route path="/" element={<Home/>}></Route>}
                    {!online && <Route path="/" element={<Welcome/>}></Route>}

                    {online && <Route path="/login" element={<Home/>}></Route>}
                    {!online && <Route path="/login" element={<LoginPage/>}></Route>}

                    {online && <Route path="/signin" element={<Home/>}></Route>}
                    {!online && <Route path="/signin" element={<SigninPage/>}></Route>}

                    <Route path="/home" element={<Home/>}></Route>
              </Routes>
        </Router>  
    )
}