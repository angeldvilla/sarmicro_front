import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./login.module.css";
import { InputEmail, InputPassword } from "../../components/Inputs/inputs";
import { ButtonLogin } from "../../components/Buttons/buttons";
import sarmicroLogo from "../../assets/images/sarmicroLogo.png";
import { authLogin } from "../../redux/actions/actions";
import { Toaster, toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
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
    if (!userData.email || !userData.password) {
      toast.error("Complete los campos, por favor!");
    } else {
      const loginUser = {
        email: userData.email,
        password: userData.password,
      };
      dispatch(authLogin(loginUser, navigate));
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <div className={styles.leftColumn}>
          <img
            alt="sarmicro"
            src={sarmicroLogo}
            style={{ maxWidth: "100%", height: "15em", marginRight: 80 }}
          />
        </div>
        <div className={styles.rightColumn}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1
              style={{
                textAlign: "center",
                marginBottom: "0.6em",
                marginTop: "0.6em",
                fontSize: "1.8em",
              }}
            >
              Bienvenido a SarMicros
            </h1>

            <InputEmail
              name="email"
              value={userData.email}
              onChange={handleChange}
              inputProps={{
                autoComplete: "off",
              }}
            />

            <InputPassword
              name="password"
              value={userData.password}
              onChange={handleChange}
              inputProps={{
                autoComplete: "new-password",
              }}
            />

            <span style={{ marginTop: "3.2em" }}>¿No tienes una cuenta?</span>
            <a href="/registrarse" style={{ color: "blue" }}>
              Regístrate
            </a>

            <ButtonLogin handleLogin={handleSubmit} />
            <Toaster position="top-center" richColors />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
