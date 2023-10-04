import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import {
  InputUserName,
  InputPassword,
  InputConfirmPassword,
  InputCellPhone,
  InputEmail,
  InputName,
  InputLastName,
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
    lastName: "",
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
    navigate(-1);
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <div className={styles.backButton}>
            <ArrowBackIcon onClick={backFunction}/>
          </div>
          <h1>Registra tus datos!</h1>

          <InputName
            name="name"
            value={userData.name}
            onChange={handleChange}
          />

          <InputLastName
            name="lastName"
            value={userData.lastName}
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
