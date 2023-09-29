import React from "react";
import {InputUserName, InputPassword} from "../../components/Inputs/inputs";
import ButtonLogin from "../../components/Buttons/buttons";

const Login = () => {
/*   const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }; */

  return (
    <form
      style={{
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Bienvenido a SarMicros!</h1>

      <InputUserName />
      
      <InputPassword /> 

      <ButtonLogin />
    </form>
  );
};

export default Login;





/* -------------------- */
 /* <label htmlFor="username" style={{ marginTop: "0.7em" }}>
        USERNAME:
      </label>

      <input
        style={{ marginTop: "0.7em" }}
        autoComplete="off"
        type="text"
        name="username"
        value={userData.username}
        onChange={handleChange}
        placeholder="example"
      />

      <label htmlFor="password" style={{ marginTop: "1em" }}>
        PASSWORD:
      </label>

      <input
        style={{ marginTop: "0.7em" }}
        autoComplete="off"
        type="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        placeholder="********"
      /> */