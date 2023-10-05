import Button from "@mui/material/Button";
import styles from "./styleButton.module.css";
export const ButtonLogin = () => {
  return (
    <Button
      style={{ 
        marginTop: "3.5em",
        marginBottom: "0.7em", 
        backgroundColor: "gray", 
        color: "white",
        borderRadius: "8px",
        padding: "8px 20px",
        fontSize: "0.9em",
      }}
      className={styles.botonLogin}
      /* variant="contained" */
    >
      Ingresar
    </Button>
  );
};

export const ButtonRegister = () => {
  return (
    <Button
      style={{
        marginTop: "3.5em",
        marginBottom: "0.7em",
        backgroundColor: "#000000",
        color: "white",
        borderRadius: "8px",
        padding: "8px 20px",
        fontSize: "0.75em",
      }}
      className={styles.boton}
      variant="contained"
    >
      Registrarme
    </Button>
  );
};
