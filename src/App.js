import React from 'react';
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./views/Home";
import Registration from "./views/Registration";


const App = () => {

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Registration/>}/>
      </Routes>
    </BrowserRouter>
  )
};
export default App;