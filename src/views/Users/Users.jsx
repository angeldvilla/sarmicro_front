import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createPermissions,
  createRoles,
  updateRoles,
  updateUser,
} from "../../redux/actions/actionsUsers";
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
import style from "../Vehicles/vehicles.module.css";
import styles from "../../components/TableVehicles/tablesVehicles.module.css";

const Users = () => {
  const rows = useSelector((state) => state?.users?.usersData);
  const permissions = useSelector((state) => state?.users?.permissionsData);
  const roles = useSelector((state) => state?.users?.rolesData);
  const userRoles = useSelector((state) => state?.users?.userRoles);

  const [scrollUp, setScrollUp] = useState(false);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userPermissions, setUserPermissions] = useState({});
  const [selectedRoleId, setSelectedRoleId] = useState(null);

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

    const roleUser = {
      user_id: updatedRow.id,
      role_id: newRole,
    };

    const roleAlreadyExists = userRoles.some(
      (userRole) => userRole.user_id === updatedRow.id
    );

    if (newRole === "" || !roleAlreadyExists) {
      dispatch(createRoles(roleUser, rowId));
    } else {
      dispatch(updateRoles(roleUser, rowId));
    }
  };

  const handleOpenPermissionsDialog = (rowId) => {
    const roleId = getRoleIdForUser(rowId);
    setCurrentUserId(rowId);
    setSelectedPermissions(userPermissions[rowId] || {});
    setSelectedRoleId(roleId);
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
      // Extrae los nombres de los permisos seleccionados
      const selectedPermissionNames = Object.keys(selectedPermissions);

      // Filtra los permisos seleccionados y obtiene sus IDs
      const selectedPermissionIds = permissions
        .filter((permission) =>
          selectedPermissionNames.includes(permission.name)
        )
        .map((permission) => permission.id);

      // Crea el objeto de permisos con role_id y permissions_id
      const permissionsData = {
        role_id: selectedRoleId,
        permissions_id: selectedPermissionIds,
      };

      // Envía el objeto de permisos al servidor
      dispatch(createPermissions(permissionsData, currentUserId));
    }

    setPermissionsDialogOpen(false);
  };

  // Función para obtener el role_id de un usuario específico
  const getRoleIdForUser = (userId) => {
    const userRole = userRoles.find((role) => Number(role.user_id) === userId);
    return userRole ? userRole.role_id : "";
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
      width: 165,
      renderCell: (params) => (
        <FormControl variant="standard" fullWidth>
          <InputLabel>Rol</InputLabel>
          <Select
            label="Rol"
            value={getRoleIdForUser(params.row.id)}
            onChange={(event) => handleRoleChange(event, params.row.id)}
          >
            <MenuItem value="">
              <em>Ninguno</em>
            </MenuItem>
            {roles &&
              roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      ),
    },
    {
      field: "permissions",
      headerName: "Permisos",
      width: 145,
      renderCell: (params) => (
        <button
          className={styles.buttonClose}
          onClick={() => handleOpenPermissionsDialog(params.row.id)}
        >
          SELECCIONAR
        </button>
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
        <DialogTitle
          style={{
            fontFamily: "sans-serif",
            textAlign: "center",
            fontWeight: "400",
          }}
        >
          Editar Permisos
        </DialogTitle>
        <DialogContent>
          {permissions &&
            permissions.map((permission) => (
              <div key={permission.name}>
                <Checkbox
                  name={permission.name}
                  checked={selectedPermissions[permission.name] || false}
                  onChange={(event) =>
                    handlePermissionsChange(event, permission.name)
                  }
                />
                {permission.name}
              </div>
            ))}
        </DialogContent>
        <DialogActions>
          <button
            className={styles.buttonDelete}
            onClick={handleClosePermissionsDialog}
          >
            Cancelar
          </button>

          <button
            className={styles.buttonClose}
            onClick={handleSavePermissions}
          >
            Guardar
          </button>
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
