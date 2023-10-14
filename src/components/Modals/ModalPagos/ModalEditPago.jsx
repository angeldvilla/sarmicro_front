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
export default function ModalEditPago({
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

  const handleEditPago = () => {
    const today = new Date().toISOString().split("T")[0];
    const data = {
      cuota_id: editedRow.cuota_id,
      monto: editedRow.monto,
      fecha_pago: editedRow.fecha_pago,
      created_at: today,
      updated_at: null,
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
              Editar Pago
            </Typography>
            <Button autoFocus color="inherit" onClick={handleEditPago}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} sx={{ p: 20 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cuota ID"
              margin="none"
              name="CuotaId"
              value={editedRow ? editedRow?.cuota_id : ""}
              placeholder="Ingrese el ID de la cuota para el pago"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  cuota_id: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Monto"
              margin="none"
              name="Monto"
              type="number"
              value={editedRow ? editedRow?.monto : ""}
              placeholder="Ingrese el monto del pago"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  monto: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Fecha de Pago"
              margin="none"
              name="FechaPago"
              type="date"
              value={editedRow ? editedRow?.fecha_pago : ""}
              InputLabelProps={{ shrink: true }}
              placeholder="Ingrese la fecha de pago"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  fecha_pago: e.target.value,
                }))
              }
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
