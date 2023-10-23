import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVehicle } from "../../redux/actions/actionsVehicles";
import DataGridVehicles from "../../components/TableVehicles/TableVehicles";
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

    /* const updatedRow = rows.find((row) => row.id === rowId); */

    const updatedVehicle = {
      id: rowId,
      estado: newState,
    };

    console.log(updatedVehicle);

    dispatch(updateVehicle(updatedVehicle, rowId));
  };

  /*  // Obtener todas las clases únicas
  const uniqueClasses = Array.from(new Set(rows.map((row) => row.tipov))); */

  const allRows = rows.map((row) => ({
    ...row,
    columns: [
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
      {
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
      },
    ],
  }));

  return (
    <>
      <DataGridVehicles rows={allRows} columns={allRows[0]?.columns || []} />
      <div>
        {scrollUp && (
          <button
            onClick={scrollToUp}
            className="fixed bottom-2 right-6 text-white py-4 px-3 rounded-lg z-100 animate-fade-up animate-ease-out"
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
