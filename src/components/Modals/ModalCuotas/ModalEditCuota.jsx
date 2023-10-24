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
export default function ModalEditCuota({
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

  const handleEditCuota = () => {
    const today = new Date().toISOString().split("T")[0];
    const data = {
      cuota_id: editedRow.id,
      poliza_id: Number(editedRow.poliza_id),
      monto: Number(editedRow.monto),
      fecha_vencimiento: editedRow.fecha_vencimiento,
      pagada: editedRow.pagada,
      estado: editedRow.estado,
      created_at: today,
      updated_at: null,
    };
    handleEdit(data, rowEdit.id);
  };

  const editState = (event) => {
    const pagada = event.target.value;
    const estado = pagada ? "1" : "0";

    setEditedRow((prevState) => {
      return {
        ...prevState,
        pagada,
        estado,
      };
    });
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
              Editar Cuota
            </Typography>
            <Button
              style={{
                backgroundColor: "rgba(0, 148, 7, 0.795)",
                color: "white",
                borderRadius: "8px",
              }}
              /* autoFocus */
              onClick={handleEditCuota}
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
              label="ID Poliza"
              margin="none"
              name="IdPoliza"
              type="number"
              value={editedRow ? editedRow?.poliza_id : ""}
              placeholder="Ingrese el ID de la Poliza"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  poliza_id: e.target.value,
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
              placeholder="Ingrese el monto de la cuota"
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
              label="Fecha de Vencimiento"
              margin="none"
              name="FechaVencimiento"
              type="date"
              value={editedRow ? editedRow?.fecha_vencimiento : ""}
              InputLabelProps={{ shrink: true }}
              placeholder="Ingrese la fecha de vencimiento"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  fecha_vencimiento: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Pagada</InputLabel>
              <Select
                label="Pagada"
                variant="outlined"
                value={editedRow ? editedRow?.pagada : ""}
                /* onChange={(e) =>
                  setEditedRow((prevState) => ({
                    ...prevState,
                    pagada: e.target.value,
                  }))
                } */
                onChange={editState}
              >
                <MenuItem value={0}>No</MenuItem>
                <MenuItem value={1}>Si</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
