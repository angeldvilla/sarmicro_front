import React from "react";
import DataGridDetailsPolicys from "../../components/TableDeleted/TableDeleted";
import { useSelector } from "react-redux";

const DetailPolicy = () => {
  const rows = useSelector((state) => state?.details?.detailPolicys);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      /* width: 20, */
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

  return (
    <div style={{ width: "100%", maxWidth: "100%" }}>
      <DataGridDetailsPolicys rows={rows} columns={columns} />;
    </div>
  );
};

export default DetailPolicy;
