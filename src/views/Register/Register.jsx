import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import {
  InputPassword,
  InputConfirmPassword,
  InputCellPhone,
  InputEmail,
  InputName,
  InputDocument,
} from "../../components/Inputs/inputs";
import { ButtonRegister } from "../../components/Buttons/buttons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
    document: "",
    cellphone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const backFunction = () => {
    navigate("/");
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <div className={styles.backButton}>
            <ArrowBackIcon
              onClick={backFunction}
              style={{ cursor: "pointer" }}
            />
          </div>
          <h1 style={{textAlign: "center", marginBottom: "0.6em", marginTop: "0.4em", fontSize: "1.5em"}}>Registra tus datos!</h1>

          <InputName
            name="name"
            value={userData.name}
            onChange={handleChange}
          />

          <InputDocument
            name="document"
            value={userData.document}
            onChange={handleChange}
          />

          <InputCellPhone
            name="cellphone"
            value={userData.cellphone}
            onChange={handleChange}
          />

          <InputEmail
            name="email"
            value={userData.email}
            onChange={handleChange}
          />

          <InputPassword
            name="password"
            value={userData.password}
            onChange={handleChange}
          />

          <InputConfirmPassword
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
          />

          <ButtonRegister />
        </form>
      </div>
    </div>
  );
};

export default Register;
