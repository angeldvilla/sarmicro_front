/* import Button from "@mui/material/Button"; */
import styles from "./styleButton.module.css";
export const ButtonLogin = ({ handleLogin }) => {
  return (
    <button
      style={{
        position: "relative",
        marginTop: "3.5em",
        marginBottom: "0.7em",
        backgroundColor: "gray",
        color: "white",
        borderRadius: "8px",
        padding: "10px 20px",
        fontSize: "0.9em",
      }}
      className={styles.botonLogin}
      onClick={handleLogin}
      variant="contained"
    >
      INGRESAR
    </button>
  );
};

export const ButtonRegister = ({ handleRegister }) => {
  return (
    <button
      style={{
        position: "relative",
        marginTop: "3.5em",
        marginBottom: "0.7em",
        backgroundColor: "#000000",
        color: "white",
        borderRadius: "8px",
        padding: "10px 20px",
        fontSize: "0.75em",
      }}
      className={styles.boton}
      onClick={handleRegister}
      variant="contained"
    >
      REGISTRARME
    </button>
  );
};
