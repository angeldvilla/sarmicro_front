import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createPermissions,
  createRoles,
  updateRoles,
  updateUser,
  getUsers,
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
import { Toaster, toast } from "sonner";

const Users = () => {
  const rows = useSelector((state) => state?.users?.usersData);
  const permissions = useSelector((state) => state?.users?.permissionsData);
  const roles = useSelector((state) => state?.users?.rolesData);
  const userRoles = useSelector((state) => state?.users?.userRoles);
  const permissionRoles = useSelector((state) => state?.users?.permissionRoles);

  const [scrollUp, setScrollUp] = useState(false);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState({});
  console.log(selectedPermissions);
  const [currentUserId, setCurrentUserId] = useState(null);
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
  const [updating, setUpdating] = useState(false);

  const handleSwitchChange = useCallback(
    (event, rowId) => {
      if (updating) {
        return;
      }
      setUpdating(true);

      try {
        const newState = event.target.checked ? "1" : "0";
        const updatedRow = rows.find((row) => row.id === rowId);

        const updatedUser = {
          ...updatedRow,
          estado: newState,
        };

        dispatch(updateUser(updatedUser, rowId));
        dispatch(getUsers());
      } catch (error) {
        console.log(error);
        toast.error(
          "Error al actualizar el estado del usuario, por favor intente nuevamente"
        );
      } finally {
        setUpdating(false);
      }
    },
    [dispatch, updating, rows]
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

    // Obtener los permisos del usuario actual desde permissionRoles
    const userPermissionRoles = permissionRoles
      .filter((pr) => Number(pr.user_id) === rowId)
      .map((pr) => Number(pr.permissions_id));

    // Crear un objeto con los permisos para el usuario actual
    const userPermissions = {};
    permissions.forEach((permission) => {
      userPermissions[permission.id] = userPermissionRoles.includes(
        permission.id
      );
    });

    setSelectedPermissions(userPermissions);
    setSelectedRoleId(roleId);
    setPermissionsDialogOpen(true);
  };

  const handleClosePermissionsDialog = () => {
    setPermissionsDialogOpen(false);
  };

  const handlePermissionsChange = (event, permissionId) => {
    setSelectedPermissions((prevPermissions) => ({
      ...prevPermissions,
      [permissionId]: event.target.checked,
    }));
  };

  const handleSavePermissions = () => {
    if (currentUserId !== null) {
      // Filtra los permisos seleccionados y obtiene sus IDs
      const selectedPermissionIds = Object.keys(selectedPermissions)
        .filter((permissionId) => selectedPermissions[permissionId])
        .map((permissionId) => Number(permissionId));

      // Envía varios objeto de permisos dependiendo de los permissions_id seleccionado
      /* selectedPermissionIds.forEach((permissionId) => { */
      const permissionsData = {
        user_id: currentUserId,
        permissions_id: selectedPermissionIds,
      };

      // Enviar el arreglo de objetos de permisos al servidor
      dispatch(createPermissions(permissionsData, currentUserId));
      /* }); */

      setPermissionsDialogOpen(false);
    }
  };

  // Función para obtener el role_id de un usuario específico
  const getRoleIdForUser = (userId) => {
    const userRole = userRoles.find((role) => Number(role.user_id) === userId);
    return userRole ? userRole.role_id : "";
  };

  const allRows = useMemo(() => {
    const uniqueIds = new Set();
    const filteredRows = [];

    for (const row of rows) {
      if (!uniqueIds.has(row.id)) {
        uniqueIds.add(row.id);
        filteredRows.push(row);
      }
    }

    return filteredRows.map((row) => ({
      ...row,
      columns: [
        {
          field: "id",
          headerName: "ID",
        },
        {
          field: "name",
          headerName: "Nombre Completo",
          flex: 1,
        },
        {
          field: "email",
          headerName: "Correo Electronico",
          flex: 1,
        },
        {
          field: "cedula",
          headerName: "Cedula",
          flex: 1,
        },
        {
          field: "telefono",
          headerName: "Telefono",
          flex: 1,
        },
        {
          field: "roles",
          headerName: "Roles",
          flex: 1,
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
              style={{
                color: params.value === "1" ? "green" : "red",
              }}
              onChange={(event) => handleSwitchChange(event, params.row.id)}
            />
          ),
        },
      ],
    }));
  }, [
    rows,
    handleSwitchChange /* handleRoleChange, handleOpenPermissionsDialog, roles, getRoleIdForUser */,
  ]);

  return (
    <>
      <div style={{ width: "100%", maxWidth: "100%" }}>
        <DataGridUsers rows={allRows} columns={allRows[0]?.columns || []} />

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
                    checked={selectedPermissions[permission.id] || false}
                    onChange={(event) =>
                      handlePermissionsChange(event, permission.id)
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
      </div>
      {scrollUp && (
        <button onClick={scrollToUp} className={style.scrollUpButton}>
          <ArrowUpwardIcon className={style.arrowBack} />
        </button>
      )}
      <Toaster position="top-right" richColors />
    </>
  );
};
export default Users;
