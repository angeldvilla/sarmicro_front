import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export const CardPayments = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://img.freepik.com/vector-gratis/iconos-polizas-seguros_603843-478.jpg?w=2000"
          alt="Valor de Polizas"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Valor de Polizas
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Esta tarjeta muestra información relacionada con los valores de las polizas.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const CardPolicy = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://us.123rf.com/450wm/vladwel/vladwel1606/vladwel160600267/59051081-cesta-de-la-compra-la-pila-de-dinero-escudo-ilustraci%C3%B3n-el-concepto-de-protecci%C3%B3n-de-pagos-de.jpg?ver=6"
          
          /*https://img.freepik.com/vector-premium/concepto-ganancia-billetera-dinero-pago-linea-ilustracion-vectorial-plana-banner-pagina-destino_128772-915.jpg
           
          https://www.autopista.es/uploads/s1/57/92/67/2/5eec6d370de69406553493f3-que-seguro-de-coche-elegir-tipos-de-polizas-ventajas-e-inconvenientes.jpeg */
          alt="Pago de Polizas"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Pago de Polizas
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Esta tarjeta muestra información relacionada con los respectivos pagos de las polizas.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const CardVehicles = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://img.freepik.com/vector-premium/diseno-zona-aparcamiento-o-parque_24877-34208.jpg"
          /* https://img.freepik.com/vector-gratis/estacionamiento-isometrico-coloreado_1284-25255.jpg?w=2000 */
          alt="Parque Automotor"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Parque Automotor
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Esta tarjeta muestra información relacionada con el parque automotor y los vehiculos.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const CashBox = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://img.freepik.com/vector-premium/caja-registradora-dinero-adentro_18591-21798.jpg"
          alt="Cuadre de Caja"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Cuadre de Caja
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Esta tarjeta muestra información relacionada con el cuadre de caja.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
