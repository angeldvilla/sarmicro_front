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
  return <Slide direction="right" ref={ref} {...props} />;
});

const DataGridDiary = ({ open, handleClose, handleFecha }) => {
  const [valueDiary, setValueDiary] = useState({
    fecha_inicio: "",
    fecha_fin: "",
  });

  const handleCreate = () => {
    const date = {
      fecha_inicio: valueDiary.fecha_inicio,
      fecha_fin: valueDiary.fecha_fin,
    };
    handleFecha(date);
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
              Caja Diaria
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
              Ver Informe
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
              Ingrese el rango de fecha para ver el informe
            </Paper>
          </Grid>
        </div>
        <Grid container spacing={2} sx={{ p: 20 }}>
          <Grid item xs={6}>
            <TextField
              /* sx={{ width: "20em" }} */
              fullWidth
              label="Fecha Inicio"
              margin="none"
              name="FechaInicio"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={valueDiary ? valueDiary?.fecha_inicio : ""}
              placeholder="Ingrese el rango de fecha inicio"
              onChange={(e) =>
                setValueDiary((prevState) => ({
                  ...prevState,
                  fecha_inicio: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              /* sx={{ width: "20em" }} */
              fullWidth
              label="Fecha Final"
              margin="none"
              name="FechaFinal"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={valueDiary ? valueDiary?.fecha_fin : ""}
              placeholder="Ingrese el rango de fecha final"
              onChange={(e) =>
                setValueDiary((prevState) => ({
                  ...prevState,
                  fecha_fin: e.target.value,
                }))
              }
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default DataGridDiary;
