import Button from "@mui/material/Button";

export const ButtonLogin = () => {
  return (
    <Button
      style={{ marginTop: "3em", backgroundColor: "green", color: "white" }}
      variant="contained"
    >
      Ingresar
    </Button>
  );
}

export const ButtonRegister = () => {
  return (
    <Button
      style={{ marginTop: "3em", backgroundColor: "#0089bef8", color: "white" }}
      variant="contained"
    >
      Registrarme
    </Button>
  );
}
