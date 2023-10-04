import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./login.module.css";
import { InputUserName, InputPassword } from "../../components/Inputs/inputs";
import { ButtonLogin } from "../../components/Buttons/buttons";
import sarmicroLogo from "../../assets/images/sarmicroLogo.png";
import { authLogin } from "../../redux/actions/actions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginUser = {
      username: userData.username,
      password: userData.password,
    };
    dispatch(authLogin(loginUser));
    navigate("/home");
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
          <form className={styles.form} onSubmit={handleSubmit}>
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
