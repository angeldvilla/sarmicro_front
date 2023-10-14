import React from "react";
import DataGridCash from "../../components/TableCash/TableCash";
import { useSelector } from "react-redux";

const CashBox = () => {
  const rows = useSelector((state) => state?.cash?.pagosData);

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
      field: "cuota_id",
      headerName: "ID Poliza",
      width: 75,
    },
    {
      field: "fecha_pago",
      headerName: "Fecha Pago",
      width: 170,
    },
    {
      field: "created_at",
      headerName: "Fecha Creación",
      width: 225,
    },
  ];

  return <DataGridCash rows={rows} columns={columns} sortModel={sortModel} />;
};

export default CashBox;
