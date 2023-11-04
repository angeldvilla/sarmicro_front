import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const DataGridEgresos = ({ open, handleClose, handleCreateEgreso }) => {
  const [valueEgreso, setValueEgreso] = useState({
    monto: "",
    concepto: "",
  });

  const handleCreate = () => {
    const newValueEgreso = {
      tipo_valor: 0,
      cuota_id: 0,
      monto: valueEgreso.monto,
      concepto: valueEgreso.concepto,
      estado: 1,
      pagada: 1,
    };
    handleCreateEgreso(newValueEgreso);
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
              Valor Egreso
            </Typography>
            <Button
              style={{
                backgroundColor: "rgba(0, 148, 7, 0.795)",
                color: "white",
                borderRadius: "8px",
              }}
              onClick={handleCreate}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid item xs={5}>
            <Paper
              elevation={3}
              style={{
                padding: "18px",
                marginBottom: "-15%",
                marginTop: "10%",
                fontFamily: "sans-serif",
                fontStyle: "italic",
                fontWeight: "bold",
                color: "#0080ca",
                fontSize: "1.2em",
              }}
            >
              Ingrese el valor y concepto del egreso
            </Paper>
          </Grid>
        </div>
        <Grid
          container
          spacing={2}
          sx={{
            p: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid item xs={6}>
            <TextField
              sx={{ width: "25em" }}
              label="Valor"
              margin="none"
              name="ValorEgreso"
              type="number"
              value={valueEgreso ? valueEgreso?.monto : ""}
              placeholder="Ingrese el valor de egreso"
              onChange={(e) =>
                setValueEgreso((prevState) => ({
                  ...prevState,
                  monto: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>  
            <TextField
              sx={{ width: "25em"}}
              label="Concepto"
              margin="none"
              name="Concepto"
              value={valueEgreso ? valueEgreso?.concepto : ""}
              placeholder="Ingrese el concepto de egreso"
              onChange={(e) =>
                setValueEgreso((prevState) => ({
                  ...prevState,
                  concepto: e.target.value,
                }))
              }
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default DataGridEgresos;
