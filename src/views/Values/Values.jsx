import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DataGridValues from "../../components/TableValues/TableValues";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import style from "../Vehicles/vehicles.module.css";
import formatNumber from "../../formatNumbers";

const Values = () => {
  const rows = useSelector((state) => state?.values?.valuesData);
  const [scrollUp, setScrollUp] = useState(false);

  const handleScrollUp = () => {
    if (window.scrollY > 900) {
      setScrollUp(true);
    } else {
      setScrollUp(false);
    }
  };

  const scrollToUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollUp);
    return () => window.removeEventListener("scroll", handleScrollUp);
  }, []);

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
      renderCell: (params) => {
        return formatNumber(params.value);
      },
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
      field: "numero_cuotas",
      headerName: "Numero Cuotas",
      width: 120,
    },
    {
      field: "valor_inicial",
      headerName: "Valor Inicial",
      width: 120,
      renderCell: (params) => {
        return formatNumber(params.value);
      },
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
  ];

  return (
    <>
      <DataGridValues rows={rows} columns={columns} />
      {scrollUp && (
        <button
          onClick={scrollToUp}
          className={style.scrollUpButton}
        >
          <ArrowUpwardIcon className={style.arrowBack} />
        </button>
      )}
    </>
  );
};

export default Values;
