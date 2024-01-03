import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCreateVehicle({
  open,
  handleClose,
  handleCreate,
}) {
  const typeVehicle = useSelector((state) => state?.values?.typesPolicys);

  const [newVehicle, setNewVehicle] = useState({
    id_movil: "",
    id_marca: "",
    propietario: "",
    /* id_propietario: "", */
    id_tipov: "",
    telefono: "",
    marca: "",
    modelo: "",
    placa: "",
    clase: "",
    color: "",
    grupo: "",
    motor: "",
    poliza: "0",
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
              label="Movil"
              margin="none"
              name="Movil"
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
              label="Propietario"
              margin="none"
              name="Propietario"
              value={newVehicle ? newVehicle?.propietario : ""}
              placeholder="Ingrese el nombre del propietario del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  propietario: e.target.value,
                }))
              }
            />
          </Grid>
          {/* <Grid item xs={6}>
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
          </Grid> */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Telefono"
              margin="none"
              name="Telefono"
              value={newVehicle ? newVehicle?.telefono : ""}
              placeholder="Ingrese el numero de telefono del propietario"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  telefono: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Marca"
              margin="none"
              name="Marca"
              value={newVehicle ? newVehicle?.marca : ""}
              placeholder="Ingrese la marca del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  marca: e.target.value,
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
              label="Color"
              margin="none"
              name="Color"
              value={newVehicle ? newVehicle?.color : ""}
              placeholder="Ingrese el color del vehiculo"
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
          {/*   <Grid item xs={6}>
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
          </Grid> */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Vehiculo</InputLabel>
              <Select
                label="Tipo de Vehiculo"
                variant="outlined"
                value={newVehicle ? newVehicle?.tipov : ""}
                onChange={(e) => {
                  const selectedType = e.target.value;

                  const foundType = typeVehicle.find(
                    (policy) => policy.tipov === selectedType
                  );

                  const id_tipov = foundType ? foundType.id_tipov : null;

                  setNewVehicle((prevState) => ({
                    ...prevState,
                    id_tipov: id_tipov,
                    tipov: selectedType,
                  }));
                }}
              >
                <MenuItem value="">
                  <em className="uppercase">Ninguno</em>
                </MenuItem>
                {typeVehicle &&
                  typeVehicle.map((policy) => (
                    <MenuItem key={policy.id_tipov} value={policy.tipov}>
                      {policy.tipov}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
