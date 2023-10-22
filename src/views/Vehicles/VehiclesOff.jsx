import React from "react";
import { /* useDispatch, */ useSelector } from "react-redux";
/* import { updateVehicle } from "../../redux/actions/actionsVehicles"; */
import DataGridOffVehicles from "../../components/TableVehicles/OffVehicles";
/* import Switch from "@mui/material/Switch"; */

const OffVehicles = () => {
  const rows = useSelector((state) => state?.vehicles?.vechiculosData);

  /* const dispatch = useDispatch();
  const handleSwitchChange = (event, rowId) => {
    const newState = event.target.checked ? "1" : "0";

    const updatedRow = rows.find((row) => row.id === rowId);

    const updatedVehicle = {
      ...updatedRow,
      estado: newState,
    };

    dispatch(updateVehicle(updatedVehicle, rowId));
  }; */

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
    },
    {
      field: "id_movil",
      headerName: "ID Movil",
      width: 80,
    },
    {
      field: "propietario",
      headerName: "Propietario",
      width: 90,
    },
    {
      field: "modelo",
      headerName: "Modelo",
      width: 80,
    },
    {
      field: "placa",
      headerName: "Placa",
      width: 90,
    },
    {
      field: "clase",
      headerName: "Clase",
      width: 120,
    },
    {
      field: "referencia",
      headerName: "Referencia",
      width: 80,
    },
    {
      field: "grupo",
      headerName: "Grupo",
      width: 70,
    },
    {
      field: "poliza",
      headerName: "Poliza",
      width: 60,
    },
    {
      field: "motor",
      headerName: "Motor",
      width: 140,
    },
    {
      field: "telefono",
      headerName: "Telefono",
      width: 90,
    },

    {
      field: "referencia",
      headerName: "Referencia",
      width: 120,
    },
    {
      field: "serie",
      headerName: "Serie",
      width: 175,
    },
    /*  {
      field: "tipo",
      headerName: "Tipo",
      width: 90,
    }, */
    {
      field: "tipov",
      headerName: "Tipo Vehiculo",
      width: 140,
    },
    /*     {
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
    }, */
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
