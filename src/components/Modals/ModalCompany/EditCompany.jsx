import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditCompany = ({ open, handleClose, company, handleEditNameCompany }) => {
  const data = company.map((company) => {
    return {
      id: company.id,
      nombre: company.nombre,
      numero_poliza: company.numero_poliza,
      nit: company.nit,
    };
  });

  useEffect(() => {
    if (company) {
      setEditedRow(data[0]);
    }
  }, [open, company]);

  const [editedRow, setEditedRow] = useState({ ...data[0] });

  const handleEdit = () => {
    const newNameCompany = {
      id: editedRow.id,
      nombre: editedRow.nombre,
      numero_poliza: editedRow.numero_poliza,
      nit: editedRow.nit,
    };
    handleEditNameCompany(newNameCompany, newNameCompany.id);
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
                backgroundColor: "rgba(48, 42, 42, 0.144)",
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
              Compañia de Poliza
            </Typography>
            <Button
              style={{
                backgroundColor: "rgba(0, 148, 7, 0.795)",
                color: "white",
                borderRadius: "8px",
              }}
              onClick={handleEdit}
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
              Edite la compañia de seguros
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
          <Grid item xs={2}>
            <TextField
              sx={{ width: "15em" }}
              label="Compañia"
              margin="none"
              name="Compañia"
              value={editedRow ? editedRow?.nombre : ""}
              onChange={(e) => {
                setEditedRow((prevState) => ({
                  ...prevState,
                  nombre: e.target.value,
                }));
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              sx={{ width: "15em" }}
              label="Nro Poliza"
              margin="none"
              name="NroPoliza"
              value={editedRow ? editedRow?.numero_poliza : ""}
              onChange={(e) => {
                setEditedRow((prevState) => ({
                  ...prevState,
                  numero_poliza: e.target.value,
                }));
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              sx={{ width: "15em" }}
              label="NIT"
              margin="none"
              name="NIT"
              value={editedRow ? editedRow?.nit : ""}
              onChange={(e) => {
                setEditedRow((prevState) => ({
                  ...prevState,
                  nit: e.target.value,
                }));
              }}
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default EditCompany;
