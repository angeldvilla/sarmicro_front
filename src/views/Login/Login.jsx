import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./login.module.css";
import { InputEmail, InputPassword } from "../../components/Inputs/inputs";
import { ButtonLogin } from "../../components/Buttons/buttons";
import sarmicroLogo from "../../assets/images/sarmicroLogo.png";
import { authLogin } from "../../redux/actions/actionsAuth";
import { Toaster, toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Usamos un estado local para almacenar los datos del usuario
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Función que maneja el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userData.email && !userData.password) {
      // Muestra una notificación de error si faltan campos
      toast.error("Complete los campos, por favor");
    } else if (!userData.email) {
      // Muestra una notificación de error si no ingresa email
      toast.error("Ingrese su correo, por favor");
    } else if (!userData.password) {
      // Muestra una notificación de error si no ingresa password
      toast.error("Ingrese su contraseña, por favor");
    } else {
      // Prepara los datos de inicio de sesión y los envía al servidor a través de Redux
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

            {/* Componente ButtonLogin para el botón de inicio de sesión */}
            <ButtonLogin handleLogin={handleSubmit} />

            {/* Componente Toaster para mostrar notificaciones en la parte superior */}
            <Toaster position="top-center" richColors />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
