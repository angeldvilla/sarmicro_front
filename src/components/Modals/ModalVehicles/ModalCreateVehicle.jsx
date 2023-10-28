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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCreateVehicle({
  open,
  handleClose,
  handleCreate,
}) {
  const [newVehicle, setNewVehicle] = useState({
    id_movil: "",
    id_marca: "",
    id_propietario: "",
    modelo: "",
    placa: "",
    clase: "",
    grupo: "",
    motor: "",
    poliza: "",
    referencia: "",
    serie: "",
    tipo: "",
    tipov: "",
  });
  const handleCreateVehicle = () => {
    const dataVehicle = {
      ...newVehicle,
      estado: 1,
    };
    handleCreate(dataVehicle);
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
              Crear Vehiculo
            </Typography>
            <Button
              style={{
                backgroundColor: "rgba(0, 148, 7, 0.795)",
                color: "white",
                borderRadius: "8px",
              }}
              onClick={handleCreateVehicle}
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
        <Grid container spacing={2} sx={{ p: 12 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="ID Movil"
              margin="none"
              name="IdMovil"
              value={newVehicle ? newVehicle?.id_movil : ""}
              placeholder="Ingrese el identificador del movil"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  id_movil: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="ID Marca"
              margin="none"
              name="IdMarca"
              value={newVehicle ? newVehicle?.id_marca : ""}
              placeholder="Ingrese el identificador de la marca"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  id_marca: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="ID Propietaro"
              margin="none"
              name="IdPropietario"
              value={newVehicle ? newVehicle?.id_propietario : ""}
              placeholder="Ingrese el identificador del propietario"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  id_propietario: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Modelo"
              margin="none"
              name="Modelo"
              value={newVehicle ? newVehicle?.modelo : ""}
              placeholder="Ingrese el modelo del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  modelo: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Placa"
              margin="none"
              name="Placa"
              value={newVehicle ? newVehicle?.placa : ""}
              placeholder="Ingrese la placa del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  placa: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Clase"
              margin="none"
              name="Clase"
              value={newVehicle ? newVehicle?.clase : ""}
              placeholder="Ingrese la clase del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  clase: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Grupo"
              margin="none"
              name="Grupo"
              value={newVehicle ? newVehicle?.grupo : ""}
              placeholder="Ingrese el grupo del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  grupo: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Motor"
              margin="none"
              name="Motor"
              value={newVehicle ? newVehicle?.motor : ""}
              placeholder="Ingrese el motor del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  motor: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Poliza"
              margin="none"
              name="Poliza"
              value={newVehicle ? newVehicle?.poliza : ""}
              placeholder="Ingrese el numero de poliza del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  poliza: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Referencia"
              margin="none"
              name="Referencia"
              value={newVehicle ? newVehicle?.referencia : ""}
              placeholder="Ingrese la referencia del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  referencia: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Serie"
              margin="none"
              name="Serie"
              value={newVehicle ? newVehicle?.serie : ""}
              placeholder="Ingrese la serie del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  serie: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tipo"
              margin="none"
              name="Tipo"
              value={newVehicle ? newVehicle?.tipo : ""}
              placeholder="Ingrese el tipo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  tipo: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tipo de Vehiculo"
              margin="none"
              name="TipoVehiculo"
              value={newVehicle ? newVehicle?.tipov : ""}
              placeholder="Ingrese el tipo de vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  tipov: e.target.value,
                }))
              }
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
