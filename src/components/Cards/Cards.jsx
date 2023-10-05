import React from "react";
import { NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
/* import ListItemIcon from "@mui/material/ListItemIcon";
import PaidIcon from "@mui/icons-material/Paid";
import PolicyIcon from "@mui/icons-material/Policy";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import SavingsIcon from "@mui/icons-material/Savings"; */
import styles from "./card.module.css";

const paths = ["valor-poliza", "pago-polizas", "vehiculos", "caja"];
export const CardPayments = () => {
  return (
    <NavLink to={`/${paths[0]}`}>
      <Card style={{ borderRadius: "1.2em" }}>
        <CardActionArea>
          <CardMedia
            className={styles.cardImage}
            component="img"
            height="140"
            image="https://img.freepik.com/vector-gratis/seguro-proteccion-contra-perdidas-economicas-gestion-riesgos-seguro-salud-vida-propiedad-ingresos_335657-839.jpg"
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
    </NavLink>
  );
};

export const CardPolicy = () => {
  return (
    <NavLink to={`/${paths[1]}`}>
      <Card style={{ borderRadius: "1.2em" }}>
        <CardActionArea>
          <CardMedia
            className={styles.cardImage}
            component="img"
            height="140"
            image="https://us.123rf.com/450wm/vladwel/vladwel1606/vladwel160600267/59051081-cesta-de-la-compra-la-pila-de-dinero-escudo-ilustraci%C3%B3n-el-concepto-de-protecci%C3%B3n-de-pagos-de.jpg?ver=6"
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
    </NavLink>
  );
};

export const CardVehicles = () => {
  return (
    <NavLink to={`/${paths[2]}`}>
      <Card style={{ borderRadius: "1.2em" }}>
        <CardActionArea>
          <CardMedia
            className={styles.cardImage}
            component="img"
            height="140"
            image="https://us.123rf.com/450wm/petrovv/petrovv1708/petrovv170800011/83541598-aparcamiento-de-taxi-vista-desde-el-techo-representaci%C3%B3n-3d.jpg?ver=6"
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
    </NavLink>
  );
};

export const CashBox = () => {
  return (
    <NavLink to={`/${paths[3]}`}>
      <Card style={{ borderRadius: "1.2em" }}>
        <CardActionArea>
          <CardMedia
            className={styles.cardImage}
            component="img"
            height="140"
            image="https://img.freepik.com/vector-premium/caja-registradora-dinero-adentro_18591-21798.jpg"
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
    </NavLink>
  );
};
