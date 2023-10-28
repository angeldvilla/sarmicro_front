import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/actions/actionsUsers";
import DataGridUsers from "../../components/TableUsers/TableUsers";
import Switch from "@mui/material/Switch";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import style from "../Vehicles/vehicles.module.css";

const Users = () => {
  const rows = useSelector((state) => state?.users?.usersData);
  const [scrollUp, setScrollUp] = useState(false);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);

  const handleScrollUp = () => {
    if (window.scrollY > 900) {
      setScrollUp(true);
    } else {
      setScrollUp(false);
    }
  };

  const scrollToUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollUp);
    return () => window.removeEventListener("scroll", handleScrollUp);
  }, []);

  const dispatch = useDispatch();

  const handleSwitchChange = useCallback(
    (event, rowId) => {
      const newState = event.target.checked ? "1" : "0";

      const updatedRow = rows.find((row) => row.id === rowId);

      const updatedUser = {
        ...updatedRow,
        estado: newState,
      };

      dispatch(updateUser(updatedUser, rowId));
    },
    [dispatch, rows]
  );

  const handleRoleChange = (event, rowId) => {
    const newRole = event.target.value;

    const updatedRow = rows.find((row) => row.id === rowId);

    const updatedUser = {
      ...updatedRow,
      roles: newRole,
    };

    dispatch(updateUser(updatedUser, rowId));
  };

  const handleOpenPermissionsDialog = (rowId) => {
    setCurrentUserId(rowId);
    setPermissionsDialogOpen(true);
  };

  const handleClosePermissionsDialog = () => {
    setPermissionsDialogOpen(false);
  };

  const handlePermissionsChange = (event, permissionName) => {
    setSelectedPermissions((prevPermissions) => ({
      ...prevPermissions,
      [permissionName]: event.target.checked,
    }));
  };

  const handleSavePermissions = () => {
    if (currentUserId !== null) {
      const updatedRow = rows.find((row) => row.id === currentUserId);

      const updatedUser = {
        ...updatedRow,
        permissions: selectedPermissions,
      };

      dispatch(updateUser(updatedUser, currentUserId));
    }

    setPermissionsDialogOpen(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
    },
    {
      field: "name",
      headerName: "Nombre Completo",
      width: 250,
    },
    {
      field: "email",
      headerName: "Correo Electronico",
      width: 270,
    },
    {
      field: "cedula",
      headerName: "Cedula",
      width: 120,
    },
    {
      field: "telefono",
      headerName: "Telefono",
      width: 120,
    },
    {
      field: "roles",
      headerName: "Roles",
      width: 90,
      renderCell: (params) => (
        <FormControl variant="filled" fullWidth>
          <InputLabel>Rol</InputLabel>
          <Select
            label="Rol"
            value={params.value}
            onChange={(event) => handleRoleChange(event, params.row.id)}
          >
            <MenuItem value={1}>Admin</MenuItem>
            <MenuItem value={2}>User</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      field: "permissions",
      headerName: "Permisos",
      width: 200,
      renderCell: (params) => (
        <Button onClick={() => handleOpenPermissionsDialog(params.row.id)}>
          Editar Permisos
        </Button>
      ),
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 90,
      renderCell: (params) => (
        <Switch
          label={params}
          checked={params.value === "1"}
          color={params.value === "1" ? "success" : "error"}
          onChange={(event) => handleSwitchChange(event, params.row.id)}
        />
      ),
    },
  ];

  return (
    <>
      <DataGridUsers rows={rows} columns={columns} />
      <Dialog
        open={permissionsDialogOpen}
        onClose={handleClosePermissionsDialog}
      >
        <DialogTitle>Editar Permisos</DialogTitle>
        <DialogContent>
          {Object.keys(selectedPermissions).map((permissionName) => (
            <div key={permissionName}>
              <Checkbox
                name={permissionName}
                checked={selectedPermissions[permissionName]}
                onChange={(event) =>
                  handlePermissionsChange(event, permissionName)
                }
              />
              {permissionName}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePermissionsDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSavePermissions} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      {scrollUp && (
        <button onClick={scrollToUp} className={style.scrollUpButton}>
          <ArrowUpwardIcon className={style.arrowBack} />
        </button>
      )}
    </>
  );
};

export default Users;
