import React, { useState, useEffect, useMemo } from "react";
import DataGridNotBalance from "../../components/TableBalance/TableNotBalance";
import { useSelector } from "react-redux";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import style from "../Vehicles/vehicles.module.css";
import formatNumber from "../../formatNumbers";

const NotBalance = () => {
  const rows = useSelector((state) => state?.cash?.balancesData);
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

  const resultados_no_pagados = rows?.resultados_no_pagados || [];

  const allRows = useMemo(() => {
    const uniqueIds = new Set();
    const filteredRows = [];

    for (const row of resultados_no_pagados) {
      if (!uniqueIds.has(row.max_vehiculo_id)) {
        uniqueIds.add(row.max_vehiculo_id);
        filteredRows.push(row);
      }
    }

    return filteredRows.map((row) => ({
      ...row,
      columns: [
        {
          field: "max_vehiculo_id",
          headerName: "ID",
          width: 60,
        },
        {
          field: "id_movil",
          headerName: "Movil",
        },
        {
          field: "placa",
          headerName: "Placa",
          width: 180,
        },
        {
          field: "propietario_codigo",
          headerName: "Cedula",
          width: 180,
        },
        {
          field: "propietario",
          headerName: "Propietario",
          width: 225,
        },
        {
          field: "saldo_debe",
          headerName: "Saldo",
          width: 180,
          renderCell: (params) => {
            return (
              <span style={{ color: "red" }}>
                {formatNumber(Number(params.value))}
              </span>
            );
          },
        },
        {
          field: "cuotas_pagadas",
          headerName: "Cuotas",
          renderCell: (params) => {
            return <span>{params.value ? params.value : "-----"}</span>;
          },
        },
        {
          field: "tipov",
          headerName: "Tipo Vehiculo",
          width: 180,
        },
        {
          field: "total_pagado",
          headerName: "Total Pagado",
          width: 150,
          renderCell: (params) => {
            return (
              <span style={{ color: "red" }}>
                {formatNumber(Number(params.value))}
              </span>
            );
          },
        },
        {
          field: "ultima_fecha_pagada",
          headerName: "Fecha de Vencimiento",
          width: 170,
          renderCell: (params) => {
            return (
              <span style={{ color: "blue" }}>
                {params.value ? params.value : "-----"}
              </span>
            );
          },
        },
      ],
    }));
  }, [resultados_no_pagados]);

  return (
    <>
      <div style={{ width: "100%", maxWidth: "100%" }}>
        <DataGridNotBalance
          rows={allRows}
          columns={allRows[0]?.columns || []}
        />
      </div>
      {scrollUp && (
        <button onClick={scrollToUp} className={style.scrollUpButton}>
          <ArrowUpwardIcon className={style.arrowBack} />
        </button>
      )}
    </>
  );
};

export default NotBalance;
