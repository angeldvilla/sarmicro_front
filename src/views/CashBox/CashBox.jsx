import React, { useState, useEffect } from "react";
import DataGridCash from "../../components/TableCash/TableCash";
import { useSelector } from "react-redux";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import style from "../Vehicles/vehicles.module.css";
import formatNumber from "../../formatNumbers";
const CashBox = () => {
  const rows = useSelector((state) => state?.cash?.pagosData);
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

  const rowsModified = () => {
    const uniqueRows = {};

    rows.transacciones.forEach((row) => {
      const key = `${row.id}-${row.tipo}`;
      if (!uniqueRows[key]) {
        uniqueRows[key] = {
          ...row,
          id: key,
          id_movil: row.id_movil,
          recibo: `2023000${row.id}`,
          concepto: row.concepto,
          fecha_pago: row.fecha_pago,
          monto: row.monto,
          tipo: row.tipo,
        };
      }
    });
    return Object.values(uniqueRows);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "id_movil",
      headerName: "Movil",
      flex: 1,
    },
    {
      field: "recibo",
      headerName: "Recibo",
      flex: 1,
    },
    {
      field: "concepto",
      headerName: "Concepto",
      flex: 1,
    },
    {
      field: "monto",
      headerName: "Monto",
      flex: 1,
      renderCell: (params) => {
        return formatNumber(params.value);
      },
    },
    {
      field: "tipo",
      headerName: "Valor",
      flex: 1,
      renderCell: (params) => (
        <span style={{ color: params.value === "Ingreso" ? "green" : "red" }}>
          {params.value}
        </span>
      ),
    },
    {
      field: "fecha_pago",
      headerName: "Fecha Pago",
      flex: 1,
    },
  ];

  return (
    <>
      <div style={{ width: "100%", maxWidth: "100%" }}>
        <DataGridCash rows={rowsModified()} columns={columns} />
      </div>
      {scrollUp && (
        <button onClick={scrollToUp} className={style.scrollUpButton}>
          <ArrowUpwardIcon className={style.arrowBack} />
        </button>
      )}
    </>
  );
};

export default CashBox;
