import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

export default function DetailsPayments({ openDetail, closeDetail, rowEdit }) {
  useEffect(() => {
    if (rowEdit) {
      setEditedRow(rowEdit);
    }
  }, [openDetail, rowEdit]);

  const [editedRow, setEditedRow] = useState(rowEdit);

  const getStatusChipColor = (status) => (status === "1" ? "success" : "error");
  const getStatusText = (status) => (status === "1" ? "Activo" : "Inactivo");

  return (
    <div>
      <Dialog open={openDetail} onClose={closeDetail} maxWidth="lg">
        <DialogTitle variant="h4" style={{ textAlign: "center" }}>
          Detalle Pago de Poliza
        </DialogTitle>
        <DialogContent>
          {editedRow && (
            <Grid container spacing={10}>
              <Grid item xs={6}>
                <Paper
                  elevation={1}
                  style={{
                    padding: "20px",
                    marginBottom: "20px",
                    marginTop: "20px",
                  }}
                >
                  <Typography style={{ marginBottom: "20px" }}>
                    Nombre:{" "}
                    {editedRow.nombre.charAt(0).toUpperCase() +
                      editedRow.nombre.slice(1).toLowerCase()}
                  </Typography>

                  <Typography style={{ marginBottom: "20px" }}>
                    Cedula: {editedRow.cedula}
                  </Typography>

                  <Typography style={{ marginBottom: "20px" }}>
                    Vehiculo: {editedRow.id_vehiculo}
                  </Typography>

                  <Typography style={{ marginBottom: "20px" }}>
                    Poliza: {editedRow.numero_poliza}
                  </Typography>

                  <Typography style={{ marginBottom: "12px" }}>
                    Estado:{" "}
                    <Chip
                      label={getStatusText(editedRow.estado)}
                      color={getStatusChipColor(editedRow.estado)}
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: "#acacacab",
                            color: "#fff",
                          }}
                        >
                          {editedRow.estado === "1" ? "A" : "I"}
                        </Avatar>
                      }
                    />
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper
                  elevation={1}
                  style={{
                    padding: "20px",
                    marginBottom: "20px",
                    width: "17em",
                    marginRight: "100px",
                    marginTop: "20px",
                  }}
                >
                  <Typography style={{ marginBottom: "20px" }}>
                    Monto Total: ${editedRow.monto_total}
                  </Typography>

                  <Typography style={{ marginBottom: "20px" }}>
                    Numero de Cuotas: {editedRow.numero_cuotas}
                  </Typography>

                  <Typography style={{ marginBottom: "20px" }}>
                    Dias Cuotas: {editedRow.dias_cuota}
                  </Typography>

                  <Typography style={{ marginBottom: "20px" }}>
                    Fecha Inicio: {editedRow.fecha_inicio}
                  </Typography>

                  <Typography style={{ marginBottom: "20px" }}>
                    Fecha Fin: {editedRow.fecha_fin}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Typography
            style={{
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "rgba(197, 31, 19, 0.938)",
              color: "white",
              fontFamily: "Sans-serif",
              borderRadius: "8px",
              padding: "6px 15px",
              fontSize: "0.90em",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
            color="error"
            onClick={closeDetail}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(187, 12, 0, 0.938)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(197, 31, 19, 0.938)")
            }
          >
            Cerrar
          </Typography>
        </DialogActions>
      </Dialog>
    </div>
  );
}
