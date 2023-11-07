import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPermissions,
  getPermissionsandRoles,
  getUsers,
  getRoles,
  getRolesuser,
} from "../../redux/actions/actionsUsers";
import { getPagos } from "../../redux/actions/actionsCashBox";
import {
  getValoresPolizas,
  getTipoPolizas,
  getTipoEmpresas,
  getCompany,
} from "../../redux/actions/actionsValues";
import {
  CardPolicy,
  CardPayments,
  CardVehicles,
  CashBox,
  /* DetailPolicy, */
  CardUsers,
} from "../../components/Cards/Cards";
import ModalHome from "../../components/Modals/ModalHome/ModalHome";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import styles from "./home.module.css";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const userLogged = useSelector((state) => state?.auth?.authUser);
  /* const userRoles = useSelector((state) => state?.users?.userRoles); */
  const permissionRoles = useSelector((state) => state?.users?.permissionRoles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPermissions());
    dispatch(getPermissionsandRoles());
    dispatch(getRoles());
    dispatch(getRolesuser());
    dispatch(getPagos());
    dispatch(getValoresPolizas());
    dispatch(getTipoPolizas());
    dispatch(getTipoEmpresas());
    dispatch(getCompany());

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

  const permissionsRequired = {
    CardPolicy: 1,
    CardPayments: 2,
    CashBox: 3,
    CardVehicles: 4,
    CardUsers: 5,
  };

  const userHasPermission = (cardName) => {
    const requiredPermission = permissionsRequired[cardName];

    if (requiredPermission !== null) {
      return permissionRoles.some((pr) => {
        const userId = Number(pr.user_id);
        const permissionId = Number(pr.permissions_id);

        return (
          userId === userLogged.user.id && permissionId === requiredPermission
        );
      });
    }
  };

  //Verifica si es administrador para mostrar la card de detalles polizas
  /*   const loggedInUserId = userLogged.user.id;
  const userRole = userRoles.find(
    (role) => Number(role.user_id) === loggedInUserId
  );
  const userRoleId = userRole ? Number(userRole.role_id) : null;

  const allowedEditRoles = [1];
  const visibilityDeletePolizas = allowedEditRoles.includes(userRoleId); */

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
        <div
          className={styles.cardStyle}
          style={{
            display: userHasPermission("CardPolicy") ? "block" : "none",
          }}
        >
          {userHasPermission("CardPolicy") && (
            <div className={styles.scaleUpBottom}>
              <CardPolicy />
            </div>
          )}
        </div>

        <div
          className={styles.cardStyle}
          style={{
            display: userHasPermission("CardPayments") ? "block" : "none",
          }}
        >
          {userHasPermission("CardPayments") && (
            <div className={styles.scaleUpBottom2}>
              <CardPayments />
            </div>
          )}
        </div>

        <div
          className={styles.cardStyle}
          style={{ display: userHasPermission("CashBox") ? "block" : "none" }}
        >
          {userHasPermission("CashBox") && (
            <div className={styles.scaleUpBottom4}>
              <CashBox />
            </div>
          )}
        </div>

        <div
          className={styles.cardStyle}
          style={{
            display: userHasPermission("CardVehicles") ? "block" : "none",
          }}
        >
          {userHasPermission("CardVehicles") && (
            <div className={styles.scaleUpBottom5}>
              <CardVehicles />
            </div>
          )}
        </div>

        {/*    <div
          className={styles.cardStyle}
          style={{
            display: visibilityDeletePolizas ? "block" : "none",
          }}
        >
          <div className={styles.scaleUpBottom6}>
            <DetailPolicy />
          </div>
        </div> */}

        <div
          className={styles.cardStyle}
          style={{ display: userHasPermission("CardUsers") ? "block" : "none" }}
        >
          {userHasPermission("CardUsers") && (
            <div className={styles.scaleUpBottom7}>
              <CardUsers />
            </div>
          )}
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
