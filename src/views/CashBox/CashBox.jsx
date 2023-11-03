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
    return rows.map((row) => {
      return {
        ...row,
        fecha_vencimiento: row?.cuota?.fecha_vencimiento,
        pagada: row?.cuota?.pagada,
        id_propietario: row?.cuota?.poliza?.id_propietario,
        monto_total: row?.cuota?.poliza?.monto_total,
        numero_cuotas: row?.cuota?.poliza?.numero_cuotas,
        placa: row?.cuota?.poliza?.vehiculo?.placa,
        clase: row?.cuota?.poliza?.vehiculo?.clase,
        grupo: row?.cuota?.poliza?.vehiculo?.grupo,
        id_movil: row?.cuota?.poliza?.vehiculo?.id_movil,
      };
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "monto",
      headerName: "Monto",
      flex: 1,
    },
    {
      field: "fecha_pago",
      headerName: "Fecha Pago",
      flex: 1,
    },
    {
      field: "fecha_vencimiento",
      headerName: "Fecha Vencimiento",
      width: 150,
    },
    {
      field: "monto_total",
      headerName: "Monto Total",
      flex: 1,
      renderCell: (params) => {
        return formatNumber(params.value);
      },
    },
    {
      field: "placa",
      headerName: "Placa",
      flex: 1,
    },
    {
      field: "id_movil",
      headerName: "ID Movil",
      flex: 1,
    },
    {
      field: "clase",
      headerName: "Clase Vehículo",
      flex: 1,
    },
    {
      field: "grupo",
      headerName: "Grupo",
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
