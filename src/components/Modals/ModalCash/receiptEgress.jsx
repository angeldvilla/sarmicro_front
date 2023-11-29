import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import formatNumber from "../../../formatNumbers";
import { formatDate } from "../../../formatNumbers";
import sarmicroLogo from "../../../assets/images/sarmicroLogo.png";
import styles from "./receiptEgress.module.css";

const ReciboEgreso = () => {
  const egreso = useSelector((state) => state?.cash?.egresoData);

  useEffect(() => {
    if (egreso) {
      window.print();
    }
  }, [egreso]);

  if (!egreso) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Recibo de Egreso</h1>
        <img src={sarmicroLogo} alt="Sarmicro Logo" className={styles.logo} />
      </div>
      <table className={`${styles.table} ${styles.tableBordered}`}>
        <tbody>
          <tr>
            <th>Fecha de Generación:</th>
            <td>{formatDate(egreso?.fecha_pago)}</td>
          </tr>
          <tr>
            <th>Número de Recibo:</th>
            <td>{`# 000${egreso?.id}`}</td>
          </tr>
          <tr>
            <th>Concepto:</th>
            <td>{egreso?.concepto}</td>
          </tr>
          <tr>
            <th>Monto:</th>
            <td>{formatNumber(egreso?.monto)}</td>
          </tr>
        </tbody>
      </table>

      <table className={`${styles.table} ${styles.tableBordered}`}>
        <tbody>
          <tr>
            <th>Beneficiario:</th>
            <td>{egreso?.nombre}</td>
          </tr>
          <tr>
            <th>CC:</th>
            <td>_____________________________________ </td>
          </tr>
          <tr>
            <th>NIT:</th>
            <td>_____________________________________</td>
          </tr>
          <tr>
            <td colSpan="2">Firma del Preparado</td>
          </tr>
          <tr>
            <td colSpan="2">_____________________________________</td>
          </tr>
          <tr>
            <td colSpan="2">Firma del Aprobado</td>
          </tr>
          <tr>
            <td colSpan="2">_____________________________________</td>
          </tr>
          <tr>
            <td colSpan="2">Firma del Contabilizado</td>
          </tr>
          <tr>
            <td colSpan="2">_____________________________________</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReciboEgreso;
