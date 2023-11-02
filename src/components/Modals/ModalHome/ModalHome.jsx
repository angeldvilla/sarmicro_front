import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ModalHome({
  openDetail,
  closeDetail,
  message,
  userName,
}) {
  useEffect(() => {
    // Al montar el modal, marca la señal de que se ha mostrado
    if (openDetail) {
      sessionStorage.setItem("modalShown", "true");
    }
  }, [openDetail]);

  return (
    <Dialog open={openDetail} onClose={closeDetail} maxWidth="lg">
      <DialogTitle variant="h4" style={{ textAlign: "center" }}>
        {message}{" "}
        {userName && (
          <>
            {userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase()}
          </>
        )}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={1} style={{ padding: "20px" }}>
              <Typography variant="body1" style={{ textAlign: "center" }}>
                Has iniciado sesión con éxito! <VerifiedIcon color="success" />
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <button
          onClick={closeDetail}
          style={{ color: "red", cursor: "pointer" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(185, 12, 0, 0.938)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255, 17, 0, 0.938)")
          }
        >
          Cerrar
          <CancelIcon />
        </button>
      </DialogActions>
    </Dialog>
  );
}
