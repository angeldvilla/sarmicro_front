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

export default function ModalEdit({ open, handleClose, handleEdit, rowEdit }) {
  const [editedRow, setEditedRow] = useState(rowEdit);
  const [clients, setClients] = useState([]);

  const handleEditPoliza = () => {
    const data = {
      numero_poliza: editedRow.NumPoliza,
      fecha_inicio: editedRow.FechaIni,
      fecha_fin: editedRow.FechaFin,
      monto_total: editedRow.MontoTotal,
      numero_cuotas: editedRow.NumCuotas,
      dias_cuota: editedRow.TipCuotas,
      cliente_id: editedRow.client_id,
    };
    handleEdit(data);
  };

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

  useEffect(() => {
    if (rowEdit) {
      setEditedRow(rowEdit);
    }

    getClients();
  }, [open, rowEdit]);

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
              value={editedRow ? editedRow.numero_poliza : ""}
              placeholder="Ingrese número de póliza"
              onChange={(e) =>
                setEditedRow({
                  ...editedRow,
                  numero_poliza: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Monto Total"
              margin="none"
              name="MontoTotal"
              value={editedRow ? editedRow.monto_total : ""}
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
              label="Fecha de Inicio"
              name="FechaIni"
              margin="none"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={editedRow ? editedRow.fecha_inicio : ""}
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
              InputLabelProps={{ shrink: true }}
              value={editedRow ? editedRow.fecha_fin : ""}
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
              value={editedRow ? editedRow.numero_cuotas : ""}
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
            <FormControl fullWidth>
              <InputLabel>Tipo de Cuotas</InputLabel>
              <Select
                label="Tipo de Cuotas"
                name="TipCuotas"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={editedRow ? editedRow.dias_cuota : ""}
                onChange={(e) =>
                  setEditedRow({
                    ...editedRow,
                    dias_cuota: e.target.value,
                  })
                }
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value="Semanal">Semanal</MenuItem>
                <MenuItem value="Quincenal">Quincenal</MenuItem>
                <MenuItem value="Mensual">Mensual</MenuItem>
                <MenuItem value="Semestral">Semestral</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Nombre Cliente</InputLabel>
              <Select
                label="Nombre Cliente"
                name="NomCliente"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={editedRow ? editedRow.client_id : ""}
                onChange={(e) => {
                  const selectedClientId = e.target.value;
                  const selectedClient = clients.find((client) => client.id === selectedClientId);
                  setEditedRow({
                    ...editedRow,
                    cliente_id: selectedClientId,
                    // Establecer el nombre del cliente en el estado
                    nombre_cliente: selectedClient ? selectedClient.nombre : ""
                  });
                }}
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
