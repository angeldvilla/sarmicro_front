import React from "react";
import { useSelector } from "react-redux";
import DataGridValues from "../../components/TableValues/TableValues";

const Values = () => {
  const rows = useSelector((state) => state?.values?.valuesData);

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
      width: 9,
    },
    {
      field: "tipo_poliza",
      headerName: "Tipo Poliza",
      width: 190,
    },
    {
      field: "vehiculo_grupo",
      headerName: "Grupo Vehiculo",
      width: 120,
    },
    {
      field: "valor_poliza",
      headerName: "Valor Poliza",
      width: 100,
    },
    {
      field: "cuota_inicial",
      headerName: "Cuota Inicial",
      width: 100,
    },
    {
      field: "created_at",
      headerName: "Fecha Creación",
      width: 220,
      renderCell: (params) => {
        return (
          <span
            style={{
              color: params.value === null ? "red" : "green",
            }}
          >
            {params.value === null ? "No hay fecha de creación" : params.value}
          </span>
        );
      },
    },
    {
      field: "updated_at",
      headerName: "Fecha Actualización",
      width: 220,
      renderCell: (params) => {
        return (
          <span
            style={{
              color: params.value === null ? "red" : "green",
            }}
          >
            {params.value === null
              ? "No hay fecha de actualización"
              : params.value}
          </span>
        );
      },
    },
  ];

  return <DataGridValues rows={rows} columns={columns} sortModel={sortModel} />;
};

export default Values;
