import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { registerUser } from "../../redux/actions/actions";
import { Toaster, toast } from "sonner";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    document: "",
    cellphone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch;

  const handleRegister = (event) => {
    event.preventDefault();

    if (
      !userData.name ||
      !userData.password ||
      !userData.confirmPassword ||
      !userData.email ||
      !userData.document ||
      !userData.cellphone
    ) {
      toast.error("Complete todos los campos para crear su cuenta");
    } else {
      const userRegistered = {
        name: userData.name,
        document: userData.document,
        cellphone: userData.cellphone,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      };
      dispatch(registerUser(userRegistered, navigate));
    }
  };

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
          <h1
            style={{
              textAlign: "center",
              marginBottom: "0.6em",
              marginTop: "0.4em",
              fontSize: "1.5em",
            }}
          >
            Registra tus datos
          </h1>

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

          <ButtonRegister handleRegister={handleRegister} />
          <Toaster position="top-right" richColors />
        </form>
      </div>
    </div>
  );
};

export default Register;
