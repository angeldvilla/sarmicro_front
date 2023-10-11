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
          <div className={styles.scaleUpBottom}>
            <CardPayments />
          </div>
        </div>

        <div className={styles.cardStyle}>
          <div className={styles.scaleUpBottom2}>
            <CardPolicy />
          </div>
        </div>

        <div className={styles.cardStyle}>
          <div className={styles.scaleUpBottom3}>
            <CardVehicles />
          </div>
        </div>

        <div className={styles.cardStyle}>
          <div className={styles.scaleUpBottom4}>
            <CashBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
