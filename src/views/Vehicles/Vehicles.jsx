import React from "react";
import DataGridVehicles from "../../components/TableVehicles/TableVehicles";
import { useSelector } from "react-redux";

const Vehicles = () => {
  const rows = useSelector((state) => state?.vehicles?.vechiculosData);

  const sortModel = [
    {
      field: "id_movil",
      sort: "desc",
    },
  ];

  const rowsWithIds = rows.map((row, index) => ({
    ...row,
    id: index, // Usamos el índice como ID único, pero puedes usar una lógica diferente
  }));


  const columns = [
    {
      field: "id_movil",
      headerName: "ID Movil",
      width: 70,
    },
    {
      field: "id_marca",
      headerName: "ID Marca",
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
      width: 80,
    },
    {
      field: "placa",
      headerName: "Placa",
      width: 85,
    },
    {
      field: "clase",
      headerName: "Clase",
      width: 70,
    },
    {
      field: "color",
      headerName: "Color",
      width: 160,
    },
    {
      field: "pago_hasta",
      headerName: "Pago Hasta",
      width: 100,
    },
    {
      field: "grupo",
      headerName: "Grupo",
      width: 70,
    },
    {
      field: "motor",
      headerName: "Motor",
      width: 150,
    },
    {
      field: "poliza",
      headerName: "Poliza",
      width: 70,
    },

    {
      field: "poliza_paz",
      headerName: "Poliza Paz",
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
      field: "rtu_paz",
      headerName: "RTU Paz",
      width: 70,
    },
    {
      field: "segurida_social_paz",
      headerName: "Seguridad Social",
      width: 120,
    },
    {
      field: "serie",
      headerName: "Serie",
      width: 150,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 150,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
      renderCell: (params) => {
        return (
          <span
            style={{
              color: params.value === "1" ? "green" : "red",
            }}
          >
            {params.value === "1" ? "Activo" : "Inactivo"}
          </span>
        );
      },
    },
  ];

  return (
    <DataGridVehicles rows={rowsWithIds} columns={columns} sortModel={sortModel}  getRowId={(row) => row.id_movil}/>
  );
};

export default Vehicles;
