import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/actionsUsers";
import {
  CardPolicy,
  CardPayments,
  CardVehicles,
  CashBox,
  DetailPolicy,
  CardUsers,
} from "../../components/Cards/Cards";
import ModalHome from "../../components/Modals/ModalHome/ModalHome";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import styles from "./home.module.css";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const userLogged = useSelector((state) => state?.auth?.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());

    // Verifica si el modal ya se ha mostrado en la sesión actual
    const modalShown = sessionStorage.getItem("modalShown");

    // Verifica si el usuario ha cerrado la sesión
    const userLoggedOut = !userLogged;

    if (userLogged && (!modalShown || userLoggedOut)) {
      setShowModal(true);
      // Establece que el modal se ha mostrado en la sesión actual
      sessionStorage.setItem("modalShown", "true");
    }
  }, [dispatch, userLogged]);

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
      <ModalHome
        openDetail={showModal}
        closeDetail={() => setShowModal(false)}
        message="Bienvenido"
        userName={userLogged?.user?.name}
      />
    </>
  );
};

export default Home;
