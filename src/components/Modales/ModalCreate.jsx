/* import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
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

export default function ModalCreate({ open, handleClose, handleCreate }) {
  const today = new Date().toISOString().split("T")[0];
  const initialStatePoliza = {
    NumPoliza: "",
    FechaIni: today,
    FechaFin: "",
    MontoTotal: "",
    NumCuotas: "",
    TipoCuotas: "",
    NomCliente: "",
  };

  const [newPoliza, setNewPoliza] = useState(initialStatePoliza);
  const [clients, setClients] = useState([]);

  const handleCreatePoliza = () => {
    handleCreate(newPoliza);
    setNewPoliza(initialStatePoliza);
  };

  const handleChange = (setter) => (e) =>
    setter((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await axios.get(
          "https://poliza.transargelia.com.co/public/api/clientes"
        );
        console.log(response.data);
        setClients(response.data);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };

    getClients();
  }, []);

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
              Crear Valor de Poliza
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCreatePoliza}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <TextField
            id="input-with-sx"
            variant="standard"
            color="primary"
            label="Numero de Poliza"
            margin="none"
            name={"NumPoliza"}
            value={newPoliza.NumPoliza}
            placeholder="Ingrese numero de poliza"
            onChange={handleChange(setNewPoliza)}
          />
          <TextField
            id="input-with-sx"
            variant="standard"
            color="primary"
            label="Fecha de Inicio"
            name={"FechaIni"}
            margin="none"
            type="date"
            disabled
            InputLabelProps={{ shrink: true }}
            value={newPoliza.FechaFin}
          />
          <TextField
            id="input-with-sx"
            variant="standard"
            color="primary"
            label="Monto Total"
            margin="none"
            name={"MontoTotal"}
            value={newPoliza.MontoTotal}
            placeholder="Ingrese Monto Total de la poliza"
            onChange={handleChange(setNewPoliza)}
          />
          <TextField
            id="input-with-sx"
            variant="standard"
            color="primary"
            label="Numero de Cuotas"
            margin="none"
            name={"NumCuotas"}
            value={newPoliza.NumCuotas}
            placeholder="Ingrese numero de cuotas"
            onChange={handleChange(setNewPoliza)}
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Tipo de Cuotas
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={newPoliza.TipoCuotas}
              onChange={handleChange(setNewPoliza)}
              label="Tipo de Cuotas"
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
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Nombre Cliente
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={newPoliza.NomCliente}
              onChange={handleChange(setNewPoliza)}
              label="Nombre de Cliente"
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              {
                clients && clients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                        {client.nombre}
                    </MenuItem>
                ))
              }
              <MenuItem value={7}>Semanal</MenuItem>
            </Select>
          </FormControl>
        </List>
      </Dialog>
    </div>
  );
}
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
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

export default function ModalCreate({ open, handleClose, handleCreate }) {
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

  const [newPoliza, setNewPoliza] = useState(initialStatePoliza);
  console.log(newPoliza);
  const [clients, setClients] = useState([]);

  const handleCreatePoliza = () => {
    handleCreate(newPoliza);
    setNewPoliza(initialStatePoliza);
  };

/*   const handleChange = (setter) => (e) =>
    setter((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    })); */

  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await axios.get(
          "https://poliza.transargelia.com.co/public/api/clientes"
        );
        console.log(response.data);
        setClients(response.data);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };

    getClients();
  }, []);

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
                {clients.map((client) => (
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
