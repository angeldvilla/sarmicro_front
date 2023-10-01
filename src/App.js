import React from "react";
import { Routes, Route } from "react-router";

/* VIEWS */
import Login from "./views/Login/Login.jsx";
import Register from "./views/Register/Register.jsx"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/sign-up" element={<Register />}/>
    </Routes>
  );
};

export default App;
