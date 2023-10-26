import React, { useState, useEffect } from "react";
import DataGridCash from "../../components/TableCash/TableCash";
import { useSelector } from "react-redux";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import style from "../Vehicles/vehicles.module.css";
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
      width: 120,
    },
    {
      field: "monto",
      headerName: "Monto",
      width: 105,
    },
    {
      field: "fecha_pago",
      headerName: "Fecha Pago",
      width: 150,
    },
    {
      field: "fecha_vencimiento",
      headerName: "Fecha Vencimiento",
      width: 150,
    },
    {
      field: "pagada",
      headerName: "Pagada",
      width: 75,
    },
    {
      field: "id_propietario",
      headerName: "Nombre Cliente",
      width: 120,
    },
    {
      field: "monto_total",
      headerName: "Monto Total",
      width: 100,
    },
    {
      field: "numero_cuotas",
      headerName: "Numero Cuotas",
      width: 120,
    },
    {
      field: "dias_cuota",
      headerName: "Dias Cuotas",
      width: 100,
    },
    {
      field: "clase",
      headerName: "Clase Vehículo",
      width: 120,
    },
    {
      field: "grupo",
      headerName: "Grupo",
      width: 120,
    },
    {
      field: "modelo",
      headerName: "Modelo",
      width: 120,
    },
  ];

  return (
    <>
      <DataGridCash rows={rowsModified()} columns={columns} />
      {scrollUp && (
        <button
          onClick={scrollToUp}
          className={style.scrollUpButton}
          /* className="fixed bottom-2 right-6 text-white py-4 px-3 rounded-lg z-100 animate-fade-up animate-ease-out" */
        >
          <ArrowUpwardIcon className={style.arrowBack} />
        </button>
      )}
    </>
  );
};

export default CashBox;
