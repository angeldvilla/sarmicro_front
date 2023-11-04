import React from "react";
import DataGridCuotas from "../../components/TableCuotas/TableCuotas.jsx";
import { useSelector } from "react-redux";
import formatNumber from "../../formatNumbers.js";

const Cuotas = () => {
  const rows = useSelector((state) => state?.cuotas?.cuotasData);

  const rowsModified = () => {
    return rows.map((row) => {
      return {
        ...row,
        id_vehiculo: row?.poliza?.id_vehiculo,
      };
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "id_vehiculo",
      headerName: "Movil",
      flex: 1,
    },
/*     {
      field: "poliza_id",
      headerName: "ID Poliza",
      flex: 1,
      width: 90,
    }, */
    {
      field: "monto",
      headerName: "Monto",
      flex: 1,
      /* width: 120, */
      renderCell: (params) => {
        return formatNumber(params.value);
      },
    },
    {
      field: "fecha_vencimiento",
      headerName: "Fecha Vencimiento",
      width: 230,
    },
    {
      field: "pagada",
      headerName: "Pagada",
      flex: 1,
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
    <div style={{ width: "100%", maxWidth: "100%" }}>
      <DataGridCuotas rows={rowsModified()} columns={columns} />
    </div>
  );
};

export default Cuotas;
