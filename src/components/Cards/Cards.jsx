import React from "react";
import { NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
/* import PaidIcon from "@mui/icons-material/Paid";
import PolicyIcon from "@mui/icons-material/Policy";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import SavingsIcon from "@mui/icons-material/Savings";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash"; */
import styles from "./card.module.css";
import valorPoliza from "../../assets/images/valorPolizas.jpg";
import pagoPolizas from "../../assets/images/pagoPolizas.jpg";
/* import cuotasPolizas from "../../assets/images/cuotas.jpg"; */
import parqueAutomotor from "../../assets/images/parqueAutomotor.jpg";
import cuadreCaja from "../../assets/images/cuadreCaja.jpg";
import deleted from "../../assets/images/deleted.png";

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
              /* https://img.freepik.com/vector-gratis/iconos-polizas-seguros_603843-478.jpg?w=2000 */
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
        <div className={styles.overlay}>
          {/* <Typography className={styles.overlayButton}>
            Ver Detalles
            <PolicyIcon style={{ marginLeft: 10, fontSize: "large" }} />
          </Typography> */}
        </div>
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
              /*https://img.freepik.com/vector-premium/concepto-ganancia-billetera-dinero-pago-linea-ilustracion-vectorial-plana-banner-pagina-destino_128772-915.jpg
           
          https://www.autopista.es/uploads/s1/57/92/67/2/5eec6d370de69406553493f3-que-seguro-de-coche-elegir-tipos-de-polizas-ventajas-e-inconvenientes.jpeg */
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
        <div className={styles.overlay}>
          {/* <Typography className={styles.overlayButton}>
            Ver Detalles
            <PaidIcon style={{ marginLeft: 10, fontSize: "large" }} />
          </Typography>*/}
        </div>
      </NavLink>
    </div>
  );
};

/* export const CardCuotas = () => {
  return (
    <div className={styles.cardContainer}>
      <NavLink to="/cuotas">
        <Card style={{ borderRadius: "1.2em" }}>
          <CardActionArea>
            <CardMedia
              className={styles.cardImage}
              component="img"
              height="140"
              image={cuotasPolizas}
              https://img.freepik.com/vector-gratis/iconos-polizas-seguros_603843-478.jpg?w=2000
              alt="Cuotas"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className={styles.cardText}
              >
                Cuotas
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.cardText}
              >
                Esta tarjeta muestra información relacionada con las cuotas
                registradas de las polizas.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <div className={styles.overlay}>
           <Typography className={styles.overlayButton}>
            Ver Detalles
            <RequestQuoteIcon style={{ marginLeft: 10, fontSize: "large" }} />
          </Typography>
        </div>
      </NavLink>
    </div>
  );
}; */

export const CardVehicles = () => {
  return (
    <div className={styles.cardContainer}>
      <NavLink to="/vehiculos">
        <Card style={{ borderRadius: "1.2em" }}>
          <CardActionArea>
            <CardMedia
              className={styles.cardImage}
              component="img"
              height="140"
              image={parqueAutomotor}
              /* https://img.freepik.com/vector-premium/diseno-zona-aparcamiento-o-parque_24877-34208.jpg
           https://img.freepik.com/vector-gratis/estacionamiento-isometrico-coloreado_1284-25255.jpg?w=2000 */
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
        <div className={styles.overlay}>
          {/*  <Typography className={styles.overlayButton}>
            Ver Detalles
            <LocalTaxiIcon style={{ marginLeft: 10, fontSize: "large" }} />
          </Typography> */}
        </div>
      </NavLink>
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
        <div className={styles.overlay}>
          {/*<Typography className={styles.overlayButton}>
            Ver Detalles
            <SavingsIcon style={{ marginLeft: 10, fontSize: "large" }} />
          </Typography>*/}
        </div>
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
        <div className={styles.overlay}>
          {/*<Typography className={styles.overlayButton}>
            Ver Detalles
            <RestoreFromTrashIcon
              style={{ marginLeft: 10, fontSize: "large" }}
            />
          </Typography>*/}
        </div>
      </a>
    </div>
  );
};
