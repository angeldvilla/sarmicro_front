import React, { useState, useEffect } from "react";
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

export default function ModalEditVehicle({
  open,
  handleClose,
  handleEdit,
  rowEdit,
}) {
  const [editedRow, setEditedRow] = useState(rowEdit);
  const [editedOwnerId, setEditedOwnerId] = useState(null);
  const [editedOwnerName, setEditedOwnerName] = useState("");

  useEffect(() => {
    if (rowEdit) {
      setEditedRow(rowEdit);
      setEditedOwnerId(rowEdit.id_propietario);
      setEditedOwnerName(rowEdit.propietario);
    }
  }, [open, rowEdit]);

  const typePolicy = useSelector((state) => state?.values?.typesPolicys);
  const propietary = useSelector((state) => state?.vehicles?.propietaryData);

  const handleEditVehiculo = () => {
    const data = {
      id_movil: editedRow.id_movil,
      id_marca: editedRow.id_marca,
      propietario: editedOwnerName,
      id_propietario: editedOwnerId,
      telefono: editedRow.telefono,
      clase: editedRow.clase,
      placa: editedRow.placa,
      modelo: editedRow.modelo,
      motor: editedRow.motor,
      grupo: editedRow.grupo,
      poliza: editedRow.poliza,
      serie: editedRow.serie,
      referencia: editedRow.referencia,
      tipo: editedRow.tipo,
      tipov: editedRow.tipov,
      estado: editedRow.estado,
    };
    handleEdit(data, rowEdit.id);
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
              Editar Vehiculo
            </Typography>
            <Button
              style={{
                backgroundColor: "rgba(0, 148, 7, 0.795)",
                color: "white",
                borderRadius: "8px",
              }}
              onClick={handleEditVehiculo}
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
              value={editedRow ? editedRow?.id_movil : ""}
              placeholder="Ingrese el identificador del movil"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  id_movil: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Propietario</InputLabel>
              <Select
                label="Propietario"
                variant="outlined"
                value={editedOwnerName}
                onChange={(e) => {
                  const selectedPropietario = e.target.value;
                  const foundPropietary = propietary.find(
                    (propietary) =>
                      propietary.nombreCompleto === selectedPropietario
                  );

                  setEditedOwnerId(foundPropietary.id_propietario);
                  setEditedOwnerName(selectedPropietario);
                }}
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {propietary &&
                  propietary.map((p) => (
                    <MenuItem key={p.id_propietario} value={p.nombreCompleto}>
                      {p.nombreCompleto}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {/*    <TextField
              fullWidth
              label="Propietaro"
              margin="none"
              name="Propietario"
              value={editedRow ? editedRow?.propietario : ""}
              placeholder="Ingrese datos del propietario"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  propietario: e.target.value,
                }))
              }
            /> */}
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Telefono"
              margin="none"
              name="Telefono"
              value={editedRow ? editedRow?.telefono : ""}
              placeholder="Ingrese el telefono del propietario"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  telefono: e.target.value,
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
              value={editedRow ? editedRow?.clase : ""}
              placeholder="Ingrese la clase del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  clase: e.target.value,
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
              value={editedRow ? editedRow?.placa : ""}
              placeholder="Ingrese la placa del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  placa: e.target.value,
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
              value={editedRow ? editedRow?.modelo : ""}
              placeholder="Ingrese el modelo del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  modelo: e.target.value,
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
              value={editedRow ? editedRow?.motor : ""}
              placeholder="Ingrese el motor del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  motor: e.target.value,
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
              value={editedRow ? editedRow?.grupo : ""}
              placeholder="Ingrese el grupo del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  grupo: e.target.value,
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
              value={editedRow ? editedRow?.serie : ""}
              placeholder="Ingrese la serie del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  serie: e.target.value,
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
              value={editedRow ? editedRow?.referencia : ""}
              placeholder="Ingrese la referencia del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  referencia: e.target.value,
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
              value={editedRow ? editedRow?.tipo : ""}
              placeholder="Ingrese el tipo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  tipo: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Vehiculo</InputLabel>
              <Select
                label="Tipo de Vehiculo"
                variant="outlined"
                value={editedRow ? editedRow?.tipov : ""}
                onChange={(e) =>
                  setEditedRow((prevState) => ({
                    ...prevState,
                    tipov: e.target.value,
                  }))
                }
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {typePolicy &&
                  typePolicy.map((policy) => (
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
