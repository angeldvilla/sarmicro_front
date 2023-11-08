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

export default function ModalEdit({ open, handleClose, handleEdit, rowEdit }) {
  useEffect(() => {
    if (rowEdit) {
      setEditedRow(rowEdit);
    }
  }, [open, rowEdit]);

  const [editedRow, setEditedRow] = useState(rowEdit);

  const handleEditPoliza = () => {
    const data = {
      id: editedRow.id,
      numero_poliza: editedRow.numero_poliza,
      placa: editedRow.placa,
      fecha_inicio: editedRow.fecha_inicio,
      fecha_fin: editedRow.fecha_fin,
      monto_total: editedRow.monto_total,
      numero_cuotas: editedRow.numero_cuotas,
      dias_cuota: editedRow.dias_cuota,
      cedula: editedRow.cedula,
      nombre: editedRow.nombre,
      valor_inicial: editedRow.valor_inicial,
      estado: 1,
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
              Editar Pago de Poliza
            </Typography>
            <Button
              style={{
                backgroundColor: "rgba(0, 148, 7, 0.795)",
                color: "white",
                borderRadius: "8px",
              }}
              onClick={handleEditPoliza}
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
          {/* <Grid item xs={6}>
            <TextField
              fullWidth
              label="Número de Póliza"
              margin="none"
              name="NumPoliza"
              value={editedRow ? editedRow?.numero_poliza : ""}
              placeholder="Ingrese número de póliza"
              disabled
            />
          </Grid> */}
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

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Placa"
              name="Placa"
              variant="outlined"
              value={editedRow ? editedRow?.placa : ""}
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
              label="Número de Cuotas"
              margin="none"
              name="NumCuotas"
              value={editedRow ? editedRow?.numero_cuotas : ""}
              placeholder="Ingrese número de cuotas"
              onChange={(e) =>
                setEditedRow({
                  ...editedRow,
                  numero_cuotas: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tipo de Cuotas"
              name="TipCuotas"
              variant="outlined"
              value={
                editedRow
                  ? editedRow?.dias_cuota === "" ||
                    editedRow?.dias_cuota === "0"
                    ? "Definir tipo de cuotas"
                    : editedRow?.dias_cuota === "15"
                    ? "Quincenal"
                    : editedRow?.dias_cuota === "31"
                    ? "Mensual"
                    : editedRow?.dias_cuota === "93"
                    ? "Trimestral"
                    : editedRow?.dias_cuota === "180"
                    ? "Semestral"
                    : editedRow?.dias_cuota === "365"
                    ? "Anual"
                    : "Ninguno"
                  : ""
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
                setEditedRow({
                  ...editedRow,
                  monto_total: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Valor Total a Pagar"
              margin="none"
              name="TotalPagar"
              type="number"
              value={editedRow ? editedRow?.valor_inicial : ""}
              placeholder="Valor total a pagar"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  valor_inicial: e.target.value,
                }))
              }
            />
          </Grid>
    
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Fecha de Inicio"
              name="FechaIni"
              margin="none"
              type="date"
              value={editedRow ? editedRow?.fecha_inicio : ""}
              onChange={(e) =>
                setEditedRow({
                  ...editedRow,
                  fecha_inicio: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Fecha de Fin"
              name="FechaFin"
              margin="none"
              type="date"
              value={editedRow ? editedRow?.fecha_fin : ""}
              onChange={(e) =>
                setEditedRow({
                  ...editedRow,
                  fecha_fin: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
