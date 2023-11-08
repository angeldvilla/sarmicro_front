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

  /* const handleSwitchChange = useCallback(
    (event, rowId) => {
      const newState = event.target.checked ? "1" : "0";

      const updatedRow = rows.find((row) => row.id === rowId);

      const updatedVehicle = {
        ...updatedRow,
        estado: newState,
      };

      dispatch(updateVehicle(updatedVehicle, rowId, dispatch));
    },
    [dispatch, rows]
  ); */
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
        dispatch(updateVehicle(updatedVehicle, rowId));
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

    return filteredRows.map((row) => ({
      ...row,
      columns: [
        {
          field: "id",
          headerName: "ID",
          width: 60,
        },
        {
          field: "id_movil",
          headerName: "Movil",
        },
        {
          field: "propietario",
          headerName: "Propietario",
          width: 180,
        },
        {
          field: "telefono",
          headerName: "Telefono",
          width: 110,
        },
        {
          field: "clase",
          headerName: "Clase",
          width: 105,
        },
        {
          field: "placa",
          headerName: "Placa",
        },
        {
          field: "modelo",
          headerName: "Modelo",
          width: 70,
        },
        {
          field: "motor",
          headerName: "Motor",
        },
        {
          field: "grupo",
          headerName: "Grupo",
          width: 70,
        },
/*         {
          field: "poliza",
          headerName: "Poliza",
          width: 60,
        }, */
        {
          field: "serie",
          headerName: "Serie",
        },
        {
          field: "referencia",
          headerName: "Referencia",
        },
        {
          field: "tipo",
          headerName: "Tipo",
          width: 90,
        },
        {
          field: "tipov",
          headerName: "Tipo Vehiculo",
          width: 120,
        },
        {
          field: "estado",
          headerName: "Estado",
          width: 100,
          renderCell: (params) => (
            <Switch
              label={params}
              checked={params.value === "1"}
              color={params.value === "1" ? "success" : "error"}
              onChange={(event) => handleSwitchChange(event, params.row.id)}
            />
          ),
        },
      ],
    }));
  }, [rows, handleSwitchChange]);

  return (
    <>
      <div style={{ width: "100%", maxWidth: "100%" }}>
        <DataGridVehicles rows={allRows} columns={allRows[0]?.columns || []} />
      </div>

      {scrollUp && (
        <button onClick={scrollToUp} className={style.scrollUpButton}>
          <ArrowUpwardIcon className={style.arrowBack} />
        </button>
      )}
    </>
  );
};

export default Vehicles;
