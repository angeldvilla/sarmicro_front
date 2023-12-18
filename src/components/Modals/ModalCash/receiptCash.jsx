import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import formatNumber from "../../../formatNumbers";
/* import { formatDate } from "../../../formatNumbers"; */
import sarmicroLogo from "../../../assets/images/sarmicroLogo.png";
import styles from "./receiptEgress.module.css";

const ReciboCaja = () => {
  const location = useLocation();
  const cash = location.state?.selectRow;
  let currentDate = new Date();

  useEffect(() => {
    if (cash) {
      window.print();
    }
  }, [cash]);

  if (!cash) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Recibo de Caja</h1>
        <img src={sarmicroLogo} alt="Sarmicro Logo" className={styles.logo} />
      </div>

      <table className={`${styles.table} ${styles.tableBordered}`}>
        <tbody>
          <tr>
            <th>Fecha de pago:</th>
            <td>{cash?.fecha_pago}</td>
          </tr>
          <tr>
            <th>Movil:</th>
            <td>{`${cash?.id_movil}`}</td>
          </tr>
          <tr>
            <th>Concepto:</th>
            <td>{cash?.concepto}</td>
          </tr>
          <tr>
            <th>Tipo de pago:</th>
            <td>{cash?.tipo}</td>
          </tr>
          <tr>
            <th>Monto:</th>
            <td>{formatNumber(cash?.monto)}</td>
          </tr>
        </tbody>
      </table>

      <table className={`${styles.table} ${styles.tableBordered}`}>
        <tbody>
          <tr>
            <th>Beneficiario:</th>
            <td>{cash?.nombre}</td>
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
      <p
        style={{ marginTop: "2em", marginBottom: "2em" }}
      >{`Fecha de Impresión: ${currentDate.toLocaleDateString()}`}</p>
    </div>
  );
};

export default ReciboCaja;
