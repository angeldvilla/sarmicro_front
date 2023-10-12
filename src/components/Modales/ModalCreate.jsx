import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getClientes } from "../../redux/actions/actionsPayments";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCreate({ open, handleClose, handleCreate }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientes());
  }, [dispatch]);

  const today = new Date().toISOString().split("T")[0];
  const initialStatePoliza = {
    numero_poliza: "",
    fecha_inicio: today,
    fecha_fin: "",
    monto_total: "",
    numero_cuotas: "",
    dias_cuota: "",
    cliente_id: "",
  };

  const clientesData = useSelector((state) => state?.payments?.clientesData);
  const [newPoliza, setNewPoliza] = useState(initialStatePoliza);

  const handleCreatePoliza = () => {
    handleCreate(newPoliza);
    setNewPoliza(initialStatePoliza);
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
              Crear Pago de Póliza
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
              label="Número de Póliza"
              margin="none"
              name="NumPoliza"
              value={newPoliza.numero_poliza}
              placeholder="Ingrese número de póliza"
              onChange={(e) =>
                setNewPoliza((prevState) => ({
                  ...prevState,
                  numero_poliza: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Monto Total"
              margin="none"
              name="MontoTotal"
              value={newPoliza.monto_total}
              placeholder="Ingrese Monto Total de la póliza"
              onChange={(e) =>
                setNewPoliza((prevState) => ({
                  ...prevState,
                  monto_total: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Fecha de Inicio"
              name={"FechaIni"}
              margin="none"
              type="date"
              disabled
              InputLabelProps={{ shrink: true }}
              value={newPoliza.fecha_inicio}
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
              value={newPoliza.fecha_fin}
              onChange={(e) =>
                setNewPoliza((prevState) => ({
                  ...prevState,
                  fecha_fin: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Número de Cuotas"
              margin="none"
              name="NumCuotas"
              value={newPoliza.numero_cuotas}
              placeholder="Ingrese número de cuotas"
              onChange={(e) =>
                setNewPoliza((prevState) => ({
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
                InputLabelProps={{ shrink: true }}
                value={newPoliza.dias_cuota}
                onChange={(e) =>
                  setNewPoliza((prevState) => ({
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
                <MenuItem value={180}>Semestral</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Nombre Cliente</InputLabel>
              <Select
                label="Nombre Cliente"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={newPoliza.cliente_id}
                onChange={(e) =>
                  setNewPoliza((prevState) => ({
                    ...prevState,
                    cliente_id: e.target.value,
                  }))
                }
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {clientesData &&
                  clientesData.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.nombre}
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
