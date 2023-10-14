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

export default function ModalEditValue({
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

  const handleEditValuePoliza = () => {
    const today = new Date().toISOString().split("T")[0];
    const data = {
      id: editedRow.id,
      tipo_poliza: editedRow.tipo_poliza,
      vehiculo_grupo: editedRow.vehiculo_grupo,
      valor_poliza: editedRow.valor_poliza,
      cuota_inicial: editedRow.cuota_inicial,
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
              Editar Valor de Poliza
            </Typography>
            <Button autoFocus color="inherit" onClick={handleEditValuePoliza}>
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
              value={editedRow ? editedRow?.tipo_poliza : ""}
              placeholder="Ingrese Tipo de Poliza"
              onChange={(e) =>
                setEditedRow((prevState) => ({
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
              value={editedRow ? editedRow?.vehiculo_grupo : ""}
              placeholder="Ingrese el grupo del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
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
              value={editedRow ? editedRow?.valor_poliza : ""}
              placeholder="Ingrese el valor de la poliza"
              onChange={(e) =>
                setEditedRow((prevState) => ({
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
              value={editedRow ? editedRow?.cuota_inicial : ""}
              placeholder="Ingrese el monto de la cuota inicial"
              onChange={(e) =>
                setEditedRow((prevState) => ({
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
