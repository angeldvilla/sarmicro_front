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

export default function ModalCreatePago({ open, handleClose, handleCreate }) {
  const [newValorPago, setNewValorPago] = useState({
    cuota_id: "",
    monto: "",
    fecha_pago: "",
  });
  const handleCreatePago = () => {
    const today = new Date().toISOString().split("T")[0];
    const valueCuota = {
      cuota_id: newValorPago.cuota_id,
      monto: newValorPago.monto,
      fecha_pago: newValorPago.fecha_pago,
      created_at: today,
      updated_at: null,
    };
    handleCreate(valueCuota);
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
              Crear Pago
            </Typography>
            <Button
              style={{
                backgroundColor: "rgba(0, 148, 7, 0.795)",
                color: "white",
              }}
              /* autoFocus */
              onClick={handleCreatePago}
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
              label="Cuota ID"
              margin="none"
              name="CuotaId"
              value={newValorPago ? newValorPago?.cuota_id : ""}
              placeholder="Ingrese el ID de la cuota para el pago"
              onChange={(e) =>
                setNewValorPago((prevState) => ({
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
              value={newValorPago ? newValorPago?.monto : ""}
              placeholder="Ingrese el monto del pago"
              onChange={(e) =>
                setNewValorPago((prevState) => ({
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
              value={newValorPago ? newValorPago?.fecha_pago : ""}
              InputLabelProps={{ shrink: true }}
              placeholder="Ingrese la fecha de pago"
              onChange={(e) =>
                setNewValorPago((prevState) => ({
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
