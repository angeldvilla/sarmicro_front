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
      numero_poliza: editedRow.numero_poliza,
      fecha_inicio: editedRow.fecha_inicio,
      fecha_fin: editedRow.fecha_fin,
      monto_total: editedRow.monto_total,
      numero_cuotas: editedRow.numero_cuotas,
      dias_cuota: editedRow.dias_cuota,
      cliente_id: editedRow.client_id,
    };
    handleEdit(data);
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
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, textAlign: "center" }}
              variant="h6"
              component="div"
            >
              Editar Pago de Póliza
            </Typography>
            <Button autoFocus color="inherit" onClick={handleEditPoliza}>
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
              disabled
              /*  onChange={(e) =>
                setEditedRow({
                  ...editedRow,
                  numero_poliza: e.target.value,
                })
              } */
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
              disabled
              /* onChange={(e) =>
                setEditedRow({
                  ...editedRow,
                  monto_total: e.target.value,
                })
              } */
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

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Número de Cuotas"
              margin="none"
              name="NumCuotas"
              value={editedRow ? editedRow?.numero_cuotas : ""}
              placeholder="Ingrese número de cuotas"
              disabled
              /* onChange={(e) =>
                setEditedRow({
                  ...editedRow,
                  numero_cuotas: e.target.value,
                })
              } */
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tipo de Cuotas"
              name="TipCuotas"
              variant="outlined"
              value={editedRow ? editedRow?.dias_cuota : ""}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nombre Cliente"
              name="NomCliente"
              variant="outlined"
              value={editedRow ? editedRow?.cliente_id : ""}
              disabled
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
