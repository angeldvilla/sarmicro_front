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
      width: 200,
    },
    {
      field: "vehiculo_grupo",
      headerName: "Grupo Vehiculo",
      width: 120,
    },
    {
      field: "valor_poliza",
      headerName: "Valor Poliza",
      width: 120,
    },
    {
      field: "dias",
      headerName: "Dias",
      width: 100,
      renderCell: (params) => {
        return (
          <span>
            {params.value === "" || params.value === "0"
              ? "Definir tipo de cuotas"
              : params.value === "15"
              ? "Quincenal"
              : params.value === "31"
              ? "Mensual"
              : params.value === "93"
              ? "Trimestral"
              : params.value === "180"
              ? "Semestral"
              : params.value === "365"
              ? "Anual"
              : ""}
          </span>
        );
      },
    },
    {
      field: "vehiculo_grupo_id",
      headerName: "Grupo Vehiculo",
      width: 120,
    },
    {
      field: "cuota_inicial_porcentaje",
      headerName: "Porcentaje Cuota Inicial",
      width: 170,
    },
    {
      field: "numero_cuotas",
      headerName: "Numero Cuotas",
      width: 120,
    },
    {
      field: "fecha_inicial",
      headerName: "Fecha Inicial",
      width: 120,
    },
    {
      field: "fecha_vencimiento",
      headerName: "Fecha de Vencimiento",
      width: 170,
    },

    /*     {
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
    }, */
  ];

  return <DataGridValues rows={rows} columns={columns} sortModel={sortModel} />;
};

export default Values;
