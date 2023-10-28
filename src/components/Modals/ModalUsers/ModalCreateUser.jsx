import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCreateUser({ open, handleClose, handleCreate }) {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    cedula: "",
    telefono: "",
    /* password: "", */
  });
  const handleCreateUser = () => {
    const valuePoliza = {
      name: newUser.name,
      email: newUser.email,
      cedula: newUser.cedula,
      telefono: newUser.telefono,
      /* password: newUser.password, */
      estado: 1,
    };

    handleCreate(valuePoliza);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              style={{
                backgroundColor: "rgba(94, 94, 94, 0.144)",
                color: "white",
              }}
              onClick={handleClose}
              aria-label="close"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(187, 12, 0, 0.938)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(94, 94, 94, 0.144)")
              }
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, textAlign: "center" }}
              variant="h6"
              component="div"
            >
              Crear Datos de Usuario
            </Typography>
            <Button
              style={{
                backgroundColor: "rgba(0, 148, 7, 0.795)",
                color: "white",
                borderRadius: "8px",
              }}
              /* autoFocus */
              onClick={handleCreateUser}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(0, 173, 9, 0.753)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(0, 148, 7, 0.795)")
              }
            >
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} sx={{ p: 20 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nombre Completo"
              margin="none"
              name="NomCompleto"
              value={newUser ? newUser?.name : ""}
              placeholder="Ingrese el nombre completo"
              onChange={(e) =>
                setNewUser((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Correo Electronico"
              margin="none"
              name="CorreoElectronico"
              value={newUser ? newUser?.email : ""}
              placeholder="Ingrese el numero de cuotas"
              onChange={(e) =>
                setNewUser((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cedula"
              margin="none"
              name="Cedula"
              type="number"
              value={newUser ? newUser?.cedula : ""}
              onChange={(e) =>
                setNewUser((prevState) => ({
                  ...prevState,
                  cedula: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Telefono"
              margin="none"
              name="Telefono"
              type="number"
              value={newUser ? newUser?.telefono : ""}
              placeholder="Valor inicial"
              onChange={(e) =>
                setNewUser((prevState) => ({
                  ...prevState,
                  telefono: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <TextField
              fullWidth
              label="Contraseña"
              margin="none"
              name="Contraseña"
              type={showPassword ? "text" : "password"}
              value={newUser ? newUser?.password : ""}
              placeholder="Digite la contraseña"
              inputProps={{
                autoComplete: "new-password",
              }}
              onChange={(e) =>
                setNewUser((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                cursor: "pointer",
                position: "absolute",
                alignItems: "center",
                right: "10px",
              }}
            >
              {showPassword ? (
                <VisibilityIcon
                  sx={{ color: "action.active", ml: 1, my: 0.5 }}
                />
              ) : (
                <VisibilityOffIcon
                  sx={{ color: "action.active", ml: 1, my: 0.5 }}
                />
              )}
            </span>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              alignItems: "center",

              position: "relative",
            }}
          >
            <TextField
              fullWidth
              label="Confirmar Contraseña"
              margin="none"
              name="Contraseña"
              type={showConfirmPassword ? "text" : "password"}
              value={newUser ? newUser?.password_confirmation : ""}
              placeholder="Confirmar la contraseña"
              inputProps={{
                autoComplete: "new-password",
              }}
              onChange={(e) =>
                setNewUser((prevState) => ({
                  ...prevState,
                  password_confirmation: e.target.value,
                }))
              }
            />
            <span
              onClick={togglePasswordConfirmVisibility}
              style={{
                cursor: "pointer",
                position: "absolute",
                alignItems: "center",
                right: "10px",
              }}
            >
              {showConfirmPassword ? (
                <VisibilityIcon
                  sx={{ color: "action.active", ml: 1, my: 0.5 }}
                />
              ) : (
                <VisibilityOffIcon
                  sx={{ color: "action.active", ml: 1, my: 0.5 }}
                />
              )}
            </span>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
