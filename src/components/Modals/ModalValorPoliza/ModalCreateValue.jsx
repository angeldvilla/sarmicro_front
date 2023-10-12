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

export default function ModalCreateValue({ open, handleClose, handleCreate }) {
  const [newValorPoliza, setNewValorPoliza] = useState({
    tipo_poliza: "",
    vehiculo_grupo: "",
    valor_poliza: "",
    cuota_inicial: "",
  });
  const handleCreatePoliza = () => {
    const today = new Date().toISOString().split("T")[0];
    const valuePoliza = {
      tipo_poliza: newValorPoliza.tipo_poliza,
      vehiculo_grupo: newValorPoliza.vehiculo_grupo,
      valor_poliza: newValorPoliza.valor_poliza,
      cuota_inicial: newValorPoliza.cuota_inicial,
      created_at: today,
      updated_at: null,
    };
    handleCreate(valuePoliza);
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
              Crear Valor de Póliza
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCreatePoliza}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} sx={{ p: 20 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tipo de Poliza"
              margin="none"
              name="TipoPoliza"
              value={newValorPoliza ? newValorPoliza?.tipo_poliza : ""}
              placeholder="Ingrese Tipo de Poliza"
              onChange={(e) =>
                setNewValorPoliza((prevState) => ({
                  ...prevState,
                  tipo_poliza: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Grupo de Vehiculo"
              margin="none"
              name="GrupoVehiculo"
              value={newValorPoliza ? newValorPoliza?.vehiculo_grupo : ""}
              placeholder="Ingrese el grupo del vehiculo"
              onChange={(e) =>
                setNewValorPoliza((prevState) => ({
                  ...prevState,
                  vehiculo_grupo: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Valor Poliza"
              margin="none"
              name="ValorPoliza"
              type="number"
              value={newValorPoliza ? newValorPoliza?.valor_poliza : ""}
              placeholder="Ingrese el valor de la poliza"
              onChange={(e) =>
                setNewValorPoliza((prevState) => ({
                  ...prevState,
                  valor_poliza: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cuota Inicial"
              margin="none"
              name="CuotaInicial"
              type="number"
              value={newValorPoliza ? newValorPoliza?.cuota_inicial : ""}
              placeholder="Ingrese el monto de la cuota inicial"
              onChange={(e) =>
                setNewValorPoliza((prevState) => ({
                  ...prevState,
                  cuota_inicial: e.target.value,
                }))
              }
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
