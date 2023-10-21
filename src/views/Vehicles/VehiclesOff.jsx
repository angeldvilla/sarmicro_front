import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVehicle } from "../../redux/actions/actionsVehicles";
import DataGridOffVehicles from "../../components/TableVehicles/OffVehicles";
import Switch from "@mui/material/Switch";

const OffVehicles = () => {
  const rows = useSelector((state) => state?.vehicles?.vechiculosData);

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
      field: "id_propietario",
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
      field: "pago_hasta",
      headerName: "Pago Hasta",
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
      field: "propio",
      headerName: "Propio",
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
      <DataGridOffVehicles
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id_movil}
      />
    </>
  );
};

export default OffVehicles;
