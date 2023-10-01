import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const InputUserName = ({ name, value, onChange }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: "1em" }}>
      <TextField
        id="input-with-sx"
        label="Nombre de usuario"
        variant="standard"
        name={name}
        value={value}
        onChange={onChange}
        color="warning"
      />
      <AccountCircle sx={{ color: "action.active", ml: 1, my: 0.5 }} />
    </Box>
  );
};

export const InputPassword = ({ name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: "1em" }}>
      <TextField
        id="input-with-sx"
        label="Contraseña"
        variant="standard"
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        color="warning"
      />
      <span
        className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
        onClick={togglePasswordVisibility}
      >
      {showPassword ? (
        <VisibilityIcon sx={{ color: "action.active", ml: 1, my: 0.5 }} />
      ) : (
        <VisibilityOffIcon sx={{ color: "action.active", ml: 1, my: 0.5 }} />
      )}
      </span>
    </Box>
  );
};
