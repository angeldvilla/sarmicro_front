import React from "react";
import { NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styles from "./card.module.css";
import sarmicroLogo from "../../assets/images/sarmicroLogo.png";
import valorPoliza from "../../assets/images/valorPolizas.jpg";
import pagoPolizas from "../../assets/images/pagoPolizas.jpg";
import parqueAutomotor from "../../assets/images/parqueAutomotor.jpg";
import cuadreCaja from "../../assets/images/cuadreCaja.jpg";
import deleted from "../../assets/images/deleted.png";
import users from "../../assets/images/users.png";

export const CardPolicy = () => {
  return (
    <div className={styles.cardContainer}>
      <NavLink to="/valor-poliza">
        <Card style={{ borderRadius: "1.2em" }}>
          <CardActionArea>
            <CardMedia
              className={styles.cardImage}
              component="img"
              height="140"
              image={valorPoliza}
              alt="Valor de Polizas"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className={styles.cardText}
              >
                Valor de Polizas
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.cardText}
              >
                Esta tarjeta muestra información relacionada con los valores de
                las polizas.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <div className={styles.overlay}></div>
      </NavLink>
    </div>
  );
};

export const CardPayments = () => {
  return (
    <div className={styles.cardContainer}>
      <NavLink to="/pago-polizas">
        <Card style={{ borderRadius: "1.2em" }}>
          <CardActionArea>
            <CardMedia
              className={styles.cardImage}
              component="img"
              height="140"
              image={pagoPolizas}
              alt="Pago de Polizas"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className={styles.cardText}
              >
                Pago de Polizas
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.cardText}
              >
                Esta tarjeta muestra información relacionada con los respectivos
                pagos de las polizas.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <div className={styles.overlay}></div>
      </NavLink>
    </div>
  );
};

export const CardVehicles = () => {
  return (
    <div className={styles.cardContainer}>
      <a href="/vehiculos">
        <Card style={{ borderRadius: "1.2em" }}>
          <CardActionArea>
            <CardMedia
              className={styles.cardImage}
              component="img"
              height="140"
              image={parqueAutomotor}
              alt="Parque Automotor"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className={styles.cardText}
              >
                Parque Automotor
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.cardText}
              >
                Esta tarjeta muestra información relacionada con el parque
                automotor y los vehiculos.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <div className={styles.overlay}></div>
      </a>
    </div>
  );
};

export const CashBox = () => {
  return (
    <div className={styles.cardContainer}>
      <a href="/caja">
        <Card style={{ borderRadius: "1.2em" }}>
          <CardActionArea>
            <CardMedia
              className={styles.cardImage}
              component="img"
              height="140"
              image={cuadreCaja}
              alt="Cuadre de Caja"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className={styles.cardText}
              >
                Cuadre de Caja
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.cardText}
              >
                Esta tarjeta muestra información relacionada con el cuadre de
                caja.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <div className={styles.overlay}></div>
      </a>
    </div>
  );
};

export const DetailPolicy = () => {
  return (
    <div className={styles.cardContainer}>
      <a href="/detalle-polizas">
        <Card style={{ borderRadius: "1.2em" }}>
          <CardActionArea>
            <CardMedia
              className={styles.cardImage}
              component="img"
              height="140"
              image={deleted}
              alt="Detalle Polizas"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className={styles.cardText}
              >
                Detalle Polizas
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.cardText}
              >
                Esta tarjeta muestra información de la eliminación en cascada de
                las polizas
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <div className={styles.overlay}></div>
      </a>
    </div>
  );
};

export const CardUsers = () => {
  return (
    <div className={styles.cardContainer}>
      <a href="/usuarios">
        <Card style={{ borderRadius: "1.2em" }}>
          <CardActionArea>
            <CardMedia
              className={styles.cardImage}
              component="img"
              height="140"
              image={users}
              alt="Usuarios"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className={styles.cardText}
              >
                Usuarios
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.cardText}
              >
                Esta tarjeta muestra información de los usuarios registrados y
                los accesos que tienen en el sistema
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <div className={styles.overlay}></div>
      </a>
    </div>
  );
};

export const BalanceCard = () => {
  return (
    <div className={styles.cardContainer}>
      <a href="/saldo-pago">
        <Card style={{ borderRadius: "1.2em" }}>
          <CardActionArea>
            <CardMedia
              className={styles.cardImage}
              component="img"
              height="140"
              image={sarmicroLogo}
              alt="Detalle Polizas"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className={styles.cardText}
              >
                Saldo - Pago
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.cardText}
              >
                Esta tarjeta muestra información de los saldos y pagos
                actualizados
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <div className={styles.overlay}></div>
      </a>
    </div>
  );
};
