import React from "react";
import {
  CardPayments,
  CardPolicy,
  CardVehicles,
  CashBox,
} from "../../components/Cards/Cards";
import NavBar from "../../components/NavBar/NavBar";
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
        <NavBar />
      </div>

      <div className={styles.cardContainerStyle}>
        <div className={styles.cardStyle}>
          <CardPayments />
        </div>

        <div className={styles.cardStyle}>
          <CardPolicy />
        </div>

        <div className={styles.cardStyle}>
          <CardVehicles />
        </div>

        <div className={styles.cardStyle}>
          <CashBox />
        </div>
      </div>
    </>
  );
};

export default Home;
