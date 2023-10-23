import React, { useState, useEffect } from "react";
import DataGridPayments from "../../components/TablePayment/TablePayment.jsx";
import Cuotas from "../Cuotas/Cuotas.jsx";
import { useSelector } from "react-redux";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Payments = () => {
  const rows = useSelector((state) => state?.payments?.polizasData);
  const [scrollUp, setScrollUp] = useState(false);

  const handleScrollUp = () => {
    if (window.scrollY > 500) {
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
      field: "cedula",
      headerName: "Cedula Propietario",
      width: 150,
    },
    {
      field: "nombre",
      headerName: "Nombre Cliente",
      width: 310,
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
    <>
      <Cuotas />
      <hr
        style={{
          borderColor: "#0080ca9e",
          borderWidth: "2px",
          margin: "20px 0",
        }}
      />
      <DataGridPayments rows={rows} columns={columns} sortModel={sortModel} />
      <div>
        {scrollUp && (
          <button
            onClick={scrollToUp}
            className="fixed bottom-2 right-6 text-white py-4 px-3 rounded-lg z-100 animate-fade-up animate-ease-out"
          >
            <ArrowUpwardIcon
              style={{
                width: "35px",
                height: "35px",
                backgroundColor: "#0080ca",
              }}
            />
          </button>
        )}
      </div>
    </>
  );
};

export default Payments;
