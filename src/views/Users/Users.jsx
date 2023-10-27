import React from "react";
import DataGridUsers from "../../components/TableUsers/TableUsers";
import { useSelector } from "react-redux";

const Users = () => {
  const rows = useSelector((state) => state?.details?.detailPolicys);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 20,
    },
    /*     {
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
    }, */
  ];

  return <DataGridUsers rows={rows} columns={columns} />;
};

export default Users;
