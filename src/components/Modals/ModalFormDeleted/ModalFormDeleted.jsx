import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import style from "../../TableVehicles/tablesVehicles.module.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ModalFormDeleted({
  open,
  handleClose,
  handleDelete,
  rowEdit,
}) {
  useEffect(() => {
    if (rowEdit) {
      setEditedRow(rowEdit);
    }
  }, [open, rowEdit]);

  const [editedRow, setEditedRow] = useState(rowEdit);
  console.log(editedRow);

  const [openDelete, setOpenDelete] = useState(false);
  const [saldoCajaN, setSaldoCajaN] = useState("");
  const [saldoCajaP, setSaldoCajaP] = useState("");

  const handleOpenModalDelete = () => {
    setOpenDelete(true);
  };

  const handleDeleteAllVehicle = () => {
    setOpenDelete(false);
    const data = {
      id: editedRow.id,
      id_movil: editedRow.id_movil,
      saldo_caja_n: parseFloat(saldoCajaN),
      saldo_caja_p: parseFloat(saldoCajaP),
    };
    handleDelete(data);
    handleClose();
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
                  "rgba(94, 94, 94, 0.726)")
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
              Eliminar Vehiculo y sus Polizas
            </Typography>
            <Button
              style={{
                backgroundColor: "rgba(148, 0, 0, 0.940)",
                color: "white",
                borderRadius: "8px",
              }}
              onClick={handleOpenModalDelete}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(187, 12, 0, 0.938)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(148, 0, 0, 0.940)")
              }
            >
              Eliminar
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} sx={{ p: 20 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cantidad de Devolución"
              margin="none"
              name="SaldoCajaN"
              type="number"
              value={saldoCajaN}
              placeholder="Ingrese la cantidad a devolver"
              onChange={(e) => setSaldoCajaN(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cantidad de Retención en la caja"
              margin="none"
              name="SaldoCajaP"
              type="number"
              value={saldoCajaP}
              placeholder="Ingrese la cantidad de retención en la caja"
              onChange={(e) => setSaldoCajaP(e.target.value)}
            />
          </Grid>
        </Grid>
      </Dialog>
      {/* Modal para eliminar un vehiculo */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle
          style={{
            fontFamily: "sans-serif",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Eliminar Vehiculo
        </DialogTitle>
        <DialogContent style={{ fontStyle: "revert-layer", fontWeight: "400" }}>
          ¿Estás seguro de eliminar este vehiculo?
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <button
            className={style.buttonDelete}
            onClick={() => setOpenDelete(false)}
          >
            No
          </button>

          <button
            className={style.buttonClose}
            onClick={handleDeleteAllVehicle}
          >
            Si
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
