import React from "react";
import {
  CardPolicy,
  CardPayments,
  /* CardCuotas, */
  CardVehicles,
  CashBox,
  DetailPolicy,
  CardUsers
} from "../../components/Cards/Cards";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import styles from "./home.module.css";

const Home = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NavBar />{" "}
        {/* Renderizamos el NavBar de la App , donde muestra Logo y boton de cerrar sesion */}
      </div>

      {/* Usamos un contendor para la vista de las cards  */}
      <div className={styles.cardContainerStyle}>
        {/* Renderizamos las cards */}
        <div className={styles.cardStyle}>
          <div className={styles.scaleUpBottom}>
            <CardPolicy />
          </div>
        </div>

        <div className={styles.cardStyle}>
          <div className={styles.scaleUpBottom2}>
            <CardPayments />
          </div>
        </div>

       {/*  <div className={styles.cardStyle}>
          <div className={styles.scaleUpBottom3}>
            <CardCuotas />
          </div>
        </div> */}

        <div className={styles.cardStyle}>
          <div className={styles.scaleUpBottom4}>
            <CashBox />
          </div>
        </div>
        <div className={styles.cardStyle}>
          <div className={styles.scaleUpBottom5}>
            <CardVehicles />
          </div>
        </div>
        <div className={styles.cardStyle}>
          <div className={styles.scaleUpBottom6}>
            <DetailPolicy />
          </div>
        </div>
        <div className={styles.cardStyle}>
          <div className={styles.scaleUpBottom7}>
            <CardUsers />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
