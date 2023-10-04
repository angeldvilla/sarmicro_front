import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import HailIcon from "@mui/icons-material/Hail";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const InputName = ({ name, value, onChange }) => {
  return (
      <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "1em",
        "& > :not(style)": { m: 1 },
      }}
    >
      <TextField
        id="input-with-sx"
        label="Nombre"
        variant="standard"
        name={name}
        value={value}
        onChange={onChange}
        color="warning"
      />
      <HailIcon sx={{ color: "action.active", ml: 1, my: 0.5 }} />
    </Box>
  );
};

export const InputLastName = ({ name, value, onChange }) => {
  return (
      <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "1em",
        "& > :not(style)": { m: 1 },
      }}
    >
      <TextField
        id="input-with-sx"
        label="Apellido"
        variant="standard"
        name={name}
        value={value}
        onChange={onChange}
        color="warning"
      />
      <AccessibilityNewIcon sx={{ color: "action.active", ml: 1, my: 0.5 }} />
    </Box>
  );
};

export const InputCellPhone = ({ name, value, onChange }) => {
  return (
      <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "1em",
        "& > :not(style)": { m: 1 },
      }}
    >
      <TextField
        id="input-with-sx"
        label="Telefono"
        variant="standard"
        name={name}
        value={value}
        onChange={onChange}
        color="warning"
      />
      <PhoneAndroidIcon sx={{ color: "action.active", ml: 1, my: 0.5 }} />
    </Box>
  );
};

export const InputEmail = ({ name, value, onChange }) => {
  return (
      <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "1em",
        "& > :not(style)": { m: 1 },
      }}
    >
      <TextField
        id="input-with-sx"
        label="Correo Electronico"
        variant="standard"
        name={name}
        value={value}
        onChange={onChange}
        color="warning"
      />
      <EmailIcon sx={{ color: "action.active", ml: 1, my: 0.5 }} />
    </Box>
  );
};

export const InputUserName = ({ name, value, onChange }) => {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "1em",
        "& > :not(style)": { m: 1 },
      }}
    >
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
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "1em",
        "& > :not(style)": { m: 1 },
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
        color="warning"
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
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "1em",
        "& > :not(style)": { m: 1 },
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
        color="warning"
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
