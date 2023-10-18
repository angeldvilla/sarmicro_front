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

  const rowsModified = () => {
    return rows.map((row) => {
      return {
        ...row,
        fecha_vencimiento: row?.cuota?.fecha_vencimiento,
        pagada: row?.cuota?.pagada,
        cliente_id: row?.cuota?.poliza?.cliente_id,
        monto_total: row?.cuota?.poliza?.monto_total,
        numero_cuotas: row?.cuota?.poliza?.numero_cuotas,
        dias_cuota: row?.cuota?.poliza?.dias_cuota,
        clase: row?.cuota?.poliza?.vehiculo?.clase,
        grupo: row?.cuota?.poliza?.vehiculo?.grupo,
        modelo: row?.cuota?.poliza?.vehiculo?.modelo,
      };
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 30,
    },
    {
      field: "monto",
      headerName: "Monto",
      width: 95,
    },
    {
      field: "fecha_pago",
      headerName: "Fecha Pago",
      width: 170,
    },
    {
      field: "fecha_vencimiento",
      headerName: "Fecha Vencimiento",
      width: 170,
    },
    {
      field: "pagada",
      headerName: "Pagada",
      width: 80,
    },
    {
      field: "cliente_id",
      headerName: "Cliente ID",
      width: 85,
    },
    {
      field: "monto_total",
      headerName: "Monto Total",
      width: 100,
    },
    {
      field: "numero_cuotas",
      headerName: "Numero Cuotas",
      width: 125,
    },
    {
      field: "dias_cuota",
      headerName: "Dias Cuotas",
      width: 100,
    },
    {
      field: "clase",
      headerName: "Clase Vehículo",
      width: 150,
    },
    {
      field: "grupo",
      headerName: "Grupo",
      width: 80,
    },
    {
      field: "modelo",
      headerName: "Modelo",
      width: 90,
    },
  ];

  return (
    <DataGridCash
      rows={rowsModified()}
      columns={columns}
      sortModel={sortModel}
    />
  );
};

export default CashBox;
