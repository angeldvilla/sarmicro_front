import React, { useState, useEffect } from "react";
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

export default function ModalEditVehicle({
  open,
  handleClose,
  handleEdit,
  rowEdit,
}) {
  useEffect(() => {
    if (rowEdit) {
      setEditedRow(rowEdit);
    }
  }, [open, rowEdit]);

  const [editedRow, setEditedRow] = useState(rowEdit);

  const handleEditVehiculo = () => {
    const data = {
      id_movil: editedRow.id_movil,
      id_marca: editedRow.id_marca,
      id_propietario: editedRow.id_propietario,
      modelo: editedRow.modelo,
      placa: editedRow.placa,
      clase: editedRow.clase,
      color: editedRow.color,
      pago_hasta: editedRow.pago_hasta,
      grupo: editedRow.grupo,
      motor: editedRow.motor,
      poliza: editedRow.poliza,
      poliza_paz: editedRow.poliza_paz,
      propio: editedRow.propio,
      referencia: editedRow.referencia,
      rtu_paz: editedRow.rtu_paz,
      segurida_social_paz: editedRow.segurida_social_paz,
      serie: editedRow.serie,
      tipo: editedRow.tipo,
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
              /* autoFocus */
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
              label="ID Movil"
              margin="none"
              name="IdMovil"
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
            <TextField
              fullWidth
              label="ID Marca"
              margin="none"
              name="IdMarca"
              value={editedRow ? editedRow?.id_marca : ""}
              placeholder="Ingrese el identificador de la marca"
              onChange={(e) =>
                setEditedRow((prevState) => ({
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
              value={editedRow ? editedRow?.id_propietario : ""}
              placeholder="Ingrese el identificador del propietario"
              onChange={(e) =>
                setEditedRow((prevState) => ({
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
              label="Clase"
              margin="none"
              name="Clase"
              value={editedRow ? editedRow?.clase : ""}
              placeholder="Ingrese la clase del vehiculo"
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
              label="Color"
              margin="none"
              name="Color"
              value={editedRow ? editedRow?.color : ""}
              placeholder="Ingrese el color del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  color: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Pago Hasta"
              type="date"
              InputLabelProps={{ shrink: true }}
              margin="none"
              name="PagoHasta"
              value={editedRow ? editedRow?.pago_hasta : ""}
              placeholder="Ingrese la fecha de pago del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  pago_hasta: e.target.value,
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
              label="Poliza"
              margin="none"
              name="Poliza"
              value={editedRow ? editedRow?.poliza : ""}
              placeholder="Ingrese el numero de poliza del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  poliza: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Poliza Paz"
              margin="none"
              name="PolizaPaz"
              value={editedRow ? editedRow?.poliza_paz : ""}
              placeholder="Ingrese el paz y salvo del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  poliza_paz: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Propio"
              margin="none"
              name="Propio"
              value={editedRow ? editedRow?.propio : ""}
              placeholder="Indique si el vehiculo es propio (SI O NO)"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  propio: e.target.value,
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
              label="RTU Paz"
              margin="none"
              name="RtuPaz"
              value={editedRow ? editedRow?.rtu_paz : ""}
              placeholder="Indique si el RTU esta a paz y salvo (SI O NO)"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  rtu_paz: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Seguridad Social"
              margin="none"
              name="SeguridadSocial"
              value={editedRow ? editedRow?.segurida_social_paz : ""}
              placeholder="Indique si la seguridad social esta a paz y salvo (SI O NO)"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  segurida_social_paz: e.target.value,
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
              label="Tipo"
              margin="none"
              name="Tipo"
              value={editedRow ? editedRow?.tipo : ""}
              placeholder="Ingrese el tipo de vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  tipo: e.target.value,
                }))
              }
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
