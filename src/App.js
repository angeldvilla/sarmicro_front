import React from "react";
import { Routes, Route } from "react-router";

/* VIEWS */
import Login from "./views/Login/Login";
/* import Register from "./views/Register/Register"; */

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      {/* <Route path="/sign-up" element={<Register />}/> */}
    </Routes>
  );
};

export default App;
