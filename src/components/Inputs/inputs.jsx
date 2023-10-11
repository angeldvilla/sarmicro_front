import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import HailIcon from "@mui/icons-material/Hail";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const InputName = ({ name, value, onChange }) => {
  return (
    <Box
      noValidate
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "1em",
      }}
    >
      <TextField
        id="input-with-sx"
        label="Nombre Completo"
        variant="standard"
        name={name}
        value={value}
        onChange={onChange}
        color="primary"
        autoComplete="off"
      />
      <HailIcon sx={{ color: "action.active", ml: 1, my: 0.5 }} />
    </Box>
  );
};

export const InputDocument = ({ name, value, onChange }) => {
  return (
    <Box
      noValidate
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "1em",
      }}
    >
      <TextField
        id="input-with-sx"
        label="Cédula de Ciudadania"
        variant="standard"
        name={name}
        value={value}
        onChange={onChange}
        color="primary"
        autoComplete="off"
      />
      <BadgeIcon sx={{ color: "action.active", ml: 1, my: 0.5 }} />
    </Box>
  );
};

export const InputCellPhone = ({ name, value, onChange }) => {
  return (
    <Box
      noValidate
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "1em",
      }}
    >
      <TextField
        id="input-with-sx"
        label="Teléfono"
        variant="standard"
        name={name}
        value={value}
        onChange={onChange}
        color="primary"
        autoComplete="off"
      />
      <PhoneAndroidIcon sx={{ color: "action.active", ml: 1, my: 0.5 }} />
    </Box>
  );
};

export const InputEmail = ({ name, value, onChange }) => {
  return (
    <Box
      noValidate
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "1em",
      }}
    >
      <TextField
        id="input-with-sx"
        label="Correo Electrónico"
        variant="standard"
        name={name}
        value={value}
        onChange={onChange}
        color="primary"
        autoComplete="off"
      />
      <EmailIcon sx={{ color: "action.active", ml: 1, my: 0.5 }} />
    </Box>
  );
};

export const InputPassword = ({ name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      noValidate
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "1em",
      }}
    >
      <TextField
        id="outlined-password-input"
        label="Contraseña"
        variant="standard"
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        color="primary"
        inputProps={{
          autoComplete: "new-password",
        }}
      />
      <span onClick={togglePasswordVisibility}>
        {showPassword ? (
          <VisibilityIcon sx={{ color: "action.active", ml: 1, my: 0.5 }} />
        ) : (
          <VisibilityOffIcon sx={{ color: "action.active", ml: 1, my: 0.5 }} />
        )}
      </span>
    </Box>
  );
};

export const InputConfirmPassword = ({ name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      noValidate
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "1em",
      }}
    >
      <TextField
        id="outlined-password-input"
        label="Confirmar Contraseña"
        variant="standard"
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        color="primary"
        inputProps={{
          autoComplete: "new-password",
        }}
      />
      <span onClick={togglePasswordVisibility}>
        {showPassword ? (
          <VisibilityIcon sx={{ color: "action.active", ml: 1, my: 0.5 }} />
        ) : (
          <VisibilityOffIcon sx={{ color: "action.active", ml: 1, my: 0.5 }} />
        )}
      </span>
    </Box>
  );
};
