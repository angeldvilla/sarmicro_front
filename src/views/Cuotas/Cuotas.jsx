import React from "react";
import DataGridCuotas from "../../components/TableCuotas/TableCuotas.jsx";
import { useSelector } from "react-redux";

const Cuotas = () => {
  const rows = useSelector((state) => state?.cuotas?.cuotasData);

  const sortModel = [
    {
      field: "fecha_vencimiento",
      sort: "desc",
    },
  ];  

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 20,
    },
    {
      field: "poliza_id",
      headerName: "ID Poliza",
      width: 70,
    },
    {
      field: "monto",
      headerName: "Monto",
      width: 100,
    },
    {
      field: "fecha_vencimiento",
      headerName: "Fecha Vencimiento",
      width: 140,
    },
    {
      field: "pagada",
      headerName: "Pagada",
      width: 150,
      renderCell: (params) => {
        return (
          <span
            style={{
              color: params.value === "1" ? "green" : "red",
            }}
          >
            {params.value === "1" ? "Pago realizado" : "No se ha pagado"}
          </span>
        );
      },
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

  return <DataGridCuotas rows={rows} columns={columns} sortModel={sortModel} />;
};

export default Cuotas;
