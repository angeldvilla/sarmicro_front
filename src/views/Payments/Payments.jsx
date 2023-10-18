import React from "react";
import DataGridPayments from "../../components/TablePayment/TablePayment.jsx";
import { useSelector } from "react-redux";

const Payments = () => {
  const rows = useSelector((state) => state?.payments?.polizasData);

  const sortModel = [
    {
      field: "id",
      sort: "desc",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
    },
    {
      field: "numero_poliza",
      headerName: "#Poliza",
      width: 70,
    },
    {
      field: "fecha_inicio",
      headerName: "Fecha Inicio",
      width: 100,
    },
    {
      field: "fecha_fin",
      headerName: "Fecha Fin",
      width: 140,
    },
    {
      field: "monto_total",
      headerName: "Monto Total",
      width: 150,
    },
    {
      field: "numero_cuotas",
      headerName: "# Cuotas",
      width: 75,
      renderCell: (params) => {
        return (
          <span
            style={{
              color: params.value === "0" ? "red" : "green",
            }}
          >
            {params.value === "0" ? "0" : params.value}
          </span>
        );
      },
    },
    {
      field: "dias_cuota",
      headerName: "Tipo Cuotas",
      width: 150,
      renderCell: (params) => {
        return (
          <span
            style={{
              color:
                params.value === "" || params.value === "0" ? "red" : "green",
            }}
          >
            {params.value === "" || params.value === "0"
              ? "Definir tipo de cuotas"
              : params.value}
          </span>
        );
      },
    },
    {
      field: "cedula",
      headerName: "Cedula Propietario",
      width: 150,
    },
    {
      field: "cliente_id",
      headerName: "Nombre Cliente",
      width: 125,
    },
    {
      field: "id_vehiculo",
      headerName: "ID Vehiculo",
      width: 95,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 90,
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
    <DataGridPayments rows={rows} columns={columns} sortModel={sortModel} />
  );
};

export default Payments;
