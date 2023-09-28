import React from "react";
import { Routes, Route } from "react-router";

/* VIEWS */
import Login from "./views/Login/Login";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
    </Routes>
  );
};

export default App;
