import React from "react";

const Login = () => {
  return (
    <form
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Bienvenido!</h1>
      <label htmlFor="username">
        <div>USERNAME:</div>
      </label>

      <input
        autoComplete="off"
        type="text"
        name="username"
        placeholder="example"
      />

      <label htmlFor="username">
        <div>PASSWORD:</div>
      </label>

      <input
        autoComplete="off"
        type="password"
        name="username"
        placeholder="example"
      />
    </form>
  );
};

export default Login;
