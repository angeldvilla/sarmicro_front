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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCreate({
  open,
  handleClose,
  handleCreate,
  rowEdit,
}) {
  useEffect(() => {
    if (rowEdit) {
      setEditedRow(rowEdit);
    }
  }, [open, rowEdit]);

  const [editedRow, setEditedRow] = useState(rowEdit);

  const handleCreatePoliza = () => {
    const today = new Date().toISOString().split("T")[0];
    const dataPoliza = {
      id: editedRow.id,
      numero_poliza: editedRow.numero_poliza,
      fecha_inicio: today,
      fecha_fin: editedRow.fecha_fin,
      monto_total: editedRow.monto_total,
      numero_cuotas: editedRow.numero_cuotas,
      dias_cuota: editedRow.dias_cuota,
      /* porcentaje: editedRow.porcentaje, */
      valor_inicial: editedRow.valor_inicial,
      estado: 1,
    };
    handleCreate(dataPoliza);
  };

  /* const valueTotal = (event) => {
    const porcentaje = event.target.value;

    const total_pagar = parseFloat(editedRow.monto_total * porcentaje) / 100;
    if (!isNaN(porcentaje)) {
      setEditedRow((prevState) => {
        return {
          ...prevState,
          porcentaje,
          total_pagar,
        };
      });
    }
  }; */

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
              Crear Pago de Póliza
            </Typography>
            <Button
              style={{
                backgroundColor: "rgba(0, 148, 7, 0.795)",
                color: "white",
                borderRadius: "8px",
              }}
              /* autoFocus */
              onClick={handleCreatePoliza}
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
              label="Número de Póliza"
              margin="none"
              name="NumPoliza"
              value={editedRow ? editedRow?.numero_poliza : ""}
              placeholder="Ingrese número de póliza"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  numero_poliza: e.target.value,
                }))
              }
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Monto Total"
              margin="none"
              name="MontoTotal"
              value={editedRow ? editedRow?.monto_total : ""}
              placeholder="Ingrese Monto Total de la póliza"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  monto_total: e.target.value,
                }))
              }
              disabled
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Número de Cuotas"
              margin="none"
              name="NumCuotas"
              type="number"
              value={editedRow ? editedRow?.numero_cuotas : ""}
              InputLabelProps={{ shrink: true }}
              placeholder="Ingrese número de cuotas"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  numero_cuotas: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Cuotas</InputLabel>
              <Select
                label="Tipo de Cuotas"
                variant="outlined"
                value={editedRow ? editedRow?.dias_cuota : ""}
                onChange={(e) =>
                  setEditedRow((prevState) => ({
                    ...prevState,
                    dias_cuota: e.target.value,
                  }))
                }
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value={7}>Semanal</MenuItem>
                <MenuItem value={15}>Quincenal</MenuItem>
                <MenuItem value={31}>Mensual</MenuItem>
                <MenuItem value={93}>Trimestral</MenuItem>
                <MenuItem value={180}>Semestral</MenuItem>
                <MenuItem value={365}>Anual</MenuItem>
              </Select>
            </FormControl>
          </Grid>

        {/*   <Grid item xs={6}>
            <TextField
              fullWidth
              label="Porcentaje de Cuota"
              margin="none"
              name="PorcentajeCuota"
              type="number"
              value={editedRow ? editedRow?.porcentaje : ""}
              placeholder="Ingrese el porcentaje de la primera cuota"
              onChange={valueTotal}
              disabled
            />
          </Grid> */}

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Valor de la cuota"
              margin="none"
              name="TotalPagar"
              /* type="number" */
              InputLabelProps={{ shrink: true }}
              value={editedRow ? editedRow?.valor_inicial : ""}
              placeholder="Valor de la cuota"
              disabled
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Fecha de Inicio"
              name={"FechaIni"}
              margin="none"
              type="date"
              InputLabelProps={{ shrink: true }}
              disabled
              value={editedRow ? editedRow?.fecha_inicio : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Fecha de Fin"
              name={"FechaFin"}
              margin="none"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={editedRow ? editedRow?.fecha_fin : ""}
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  fecha_fin: e.target.value,
                }))
              }
              disabled
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cedula Propietario"
              name="CedulaPropietario"
              variant="outlined"
              value={editedRow ? editedRow?.cedula : ""}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nombre Cliente"
              name="NomCliente"
              variant="outlined"
              value={editedRow ? editedRow?.nombre : ""}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="ID Vehiculo"
              name="IdVehiculo"
              variant="outlined"
              value={editedRow ? editedRow?.id_vehiculo : ""}
              disabled
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
