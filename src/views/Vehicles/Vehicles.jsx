import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateVehicle,
  getVehiculos,
} from "../../redux/actions/actionsVehicles";
import DataGridVehicles from "../../components/TableVehicles/TableVehicles";
import Switch from "@mui/material/Switch";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import style from "./vehicles.module.css";

const Vehicles = () => {
  const rows = useSelector((state) => state?.vehicles?.vechiculosData);
  const authUser = useSelector((state) => state?.auth?.authUser);
  const userRoles = useSelector((state) => state?.users?.userRoles);

  const [scrollUp, setScrollUp] = useState(false);

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

  const canViewStatusColumn = useMemo(() => {
    // Se obtiene el role_id del usuario logueado
    const loggedInUserId = authUser.user.id;
    const userRole = userRoles.find(
      (role) => Number(role.user_id) === loggedInUserId
    );
    const userRoleId = userRole ? Number(userRole.role_id) : null;

    // Se define un array de role_id que pueden ver la columna de estado
    const allowedViewStatusRoles = [1, 2];

    // Comprueba si el usuario logueado tiene permiso para ver la columna de estado
    return allowedViewStatusRoles.includes(userRoleId);
  }, [authUser, userRoles]);

  const [updating, setUpdating] = useState(false);

  const handleSwitchChange = useCallback(
    (event, rowId) => {
      if (updating) {
        return;
      }

      setUpdating(true);

      try {
        const newState = event.target.checked ? "1" : "0";
        const updatedVehicle = {
          id: rowId,
          estado: newState,
        };
        dispatch(updateVehicle(updatedVehicle, rowId, dispatch));
        dispatch(getVehiculos());
      } catch (error) {
        console.error(error);
      } finally {
        setUpdating(false);
      }
    },
    [dispatch, updating]
  );

  const allRows = useMemo(() => {
    const uniqueIds = new Set();
    const filteredRows = [];

    for (const row of rows) {
      if (!uniqueIds.has(row.id)) {
        uniqueIds.add(row.id);
        filteredRows.push(row);
      }
    }
    const columns = [
      {
        field: "id",
        headerName: "ID",
        width: 60,
      },
      {
        field: "id_movil",
        headerName: "ID Movil",
        width: 90,
      },
      {
        field: "propietario",
        headerName: "Propietario",
        width: 100,
      },
      {
        field: "modelo",
        headerName: "Modelo",
        width: 70,
      },
      {
        field: "placa",
        headerName: "Placa",
        width: 100,
      },
      {
        field: "clase",
        headerName: "Clase",
        width: 105,
      },
      {
        field: "motor",
        headerName: "Motor",
        width: 100,
      },
      {
        field: "grupo",
        headerName: "Grupo",
        width: 90,
      },
      {
        field: "poliza",
        headerName: "Poliza",
        width: 70,
      },
      {
        field: "referencia",
        headerName: "Referencia",
        width: 105,
      },
      {
        field: "serie",
        headerName: "Serie",
        width: 180,
      },
      {
        field: "tipo",
        headerName: "Tipo",
        width: 100,
      },
      {
        field: "tipov",
        headerName: "Tipo Vehiculo",
        width: 190,
      },
    ];

    if (canViewStatusColumn) {
      // Agrega la columna de estado si el usuario tiene permiso
      columns.push({
        field: "estado",
        headerName: "Estado",
        width: 75,
        renderCell: (params) => (
          <Switch
            label={params}
            checked={params.value === "1"}
            color={params.value === "1" ? "success" : "error"}
            onChange={(event) => handleSwitchChange(event, params.row.id)}
          />
        ),
      });
    }

    return filteredRows.map((row) => ({
      ...row,
      columns,
    }));
  }, [rows, canViewStatusColumn, handleSwitchChange]);

  return (
    <>
      <DataGridVehicles rows={allRows} columns={allRows[0]?.columns || []} />

      {scrollUp && (
        <button onClick={scrollToUp} className={style.scrollUpButton}>
          <ArrowUpwardIcon className={style.arrowBack} />
        </button>
      )}
    </>
  );
};

export default Vehicles;
