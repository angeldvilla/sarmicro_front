import React, { useState } from "react";
import styles from "./login.module.css";
import { InputUserName, InputPassword } from "../../components/Inputs/inputs";
import { ButtonLogin } from "../../components/Buttons/buttons";
import sarmicroLogo from "../../assets/images/sarmicroLogo.png";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <div className={styles.leftColumn}>
          <img
            alt="sarmicro"
            src={sarmicroLogo}
            style={{ maxWidth: "100%", height: "15em", marginRight: 80 }}
          ></img>
        </div>
        <div className={styles.rightColumn}>
          <form className={styles.form}>
            <h1>Bienvenido a SarMicros!</h1>

            <InputUserName
              name="username"
              value={userData.username}
              onChange={handleChange}
            />

            <InputPassword
              name="password"
              value={userData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />

            <span style={{ marginTop: "3.2em" }}>¿No tienes una cuenta?</span>
            <a href="/registrarse" style={{ color: "blue" }}>
              Regístrate
            </a>

            <ButtonLogin />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
