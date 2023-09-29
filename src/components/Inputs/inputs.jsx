import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VisibilityIcon from '@mui/icons-material/Visibility';
/* import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; */

export const InputUserName = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: "1em" }}>
      <TextField
        id="input-with-sx"
        label="Nombre de usuario"
        variant="outlined"
        sx={{ display: "flex", alignItems: "center", outlineColor: "yellow" }}
      />
      <AccountCircle sx={{ color: "action.active", ml: 1, my: 0.5 }} />
    </Box>
  );
};

export const InputPassword = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: "1em" }}>
      <TextField
        id="input-with-sx"
        label="Contraseña"
        variant="outlined"
      />
      <VisibilityIcon sx={{ color: "action.active", ml: 1, my: 0.5 }} />
    </Box>
  );
};
