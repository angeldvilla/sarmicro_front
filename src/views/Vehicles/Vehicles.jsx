import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVehicle } from "../../redux/actions/actionsVehicles";
import DataGridVehicles from "../../components/TableVehicles/TableVehicles";
import OffVehicles from "./VehiclesOff";
import Switch from "@mui/material/Switch";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Vehicles = () => {
  const rows = useSelector((state) => state?.vehicles?.vechiculosData);
  const [scrollUp, setScrollUp] = useState(false);

  const handleScrollUp = () => {
    if (window.scrollY > 500) {
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

  const handleSwitchChange = (event, rowId) => {
    const newState = event.target.checked ? "1" : "0";

    const updatedRow = rows.find((row) => row.id === rowId);

    const updatedVehicle = {
      ...updatedRow,
      estado: newState,
    };

    dispatch(updateVehicle(updatedVehicle, rowId));
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (a.clase < b.clase) return -1;
    if (a.clase > b.clase) return 1;
    return 0;
  });

  /* const sortedRows */

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
      width: 90,
    },
    {
      field: "placa",
      headerName: "Placa",
      width: 100,
    },
    {
      field: "clase",
      headerName: "Clase",
      width: 150,
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
      width: 90,
    },
    {
      field: "serie",
      headerName: "Serie",
      width: 180,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 140,
    },
    {
      field: "tipov",
      headerName: "Tipo Vehiculo",
      width: 90,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 70,
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
      <DataGridVehicles
        rows={sortedRows}
        columns={columns}
        getRowId={(row) => row.id_movil}
      />
      <hr
        style={{
          borderColor: "#0080ca9e",
          borderWidth: "2px",
          margin: "20px 0",
        }}
      />
      <OffVehicles />
      <div>
        {scrollUp && (
          <button
            onClick={scrollToUp}
            className="fixed bottom-10 right-6 text-white py-4 px-3 rounded-lg z-100 animate-fade-up animate-ease-out"
          >
            <ArrowUpwardIcon
              style={{
                width: "35px",
                height: "35px",
                backgroundColor: "#0080ca",
              }}
            />
          </button>
        )}
      </div>
    </>
  );
};

export default Vehicles;
