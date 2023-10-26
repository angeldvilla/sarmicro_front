import React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DataGridForm = ({ open, handleClose, rows }) => {
  console.log(rows);
  let totalIngresos = 0;
  let totalEgresos = 0;
  let saldo = 0;

  // Calcular los totales de ingresos egresos y saldo
  for (const row of rows) {
    totalIngresos += Number(row?.monto_total);
    totalEgresos += Number(row?.monto);
    saldo += Number(row?.dias_cuota);
  }
  let saldoAnterior = 1500000;
  const total = totalIngresos + saldoAnterior;

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              style={{
                backgroundColor: "rgba(94, 94, 94, 0.144)",
                color: "white",
              }}
              onClick={handleClose}
              aria-label="close"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(187, 12, 0, 0.938)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(94, 94, 94, 0.144)")
              }
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, textAlign: "center" }}
              variant="h6"
              component="div"
            >
              Cuadre de Caja de Seguros Contractual y Extracontractual
            </Typography>
          </Toolbar>
        </AppBar>
        <Typography
          sx={{ textAlign: "center", marginTop: "2%" }}
          variant="h6"
          component="div"
        >
          Transportes Argelia y Cairo, Transportes Mariscal Robledo S.A y
          Transp. Cartago
        </Typography>
        <table
          style={{
            width: "97%",
            marginTop: "2%",
            borderCollapse: "collapse",
            marginLeft: 18,
          }}
        >
          <thead>
            <tr>
              <th style={cellStyle}>Fecha</th>
              <th style={cellStyle}>Recibo</th>
              <th style={cellStyle}>Concepto</th>
              <th style={cellStyle}>Movil</th>
              <th style={cellStyle}>Ingresos</th>
              <th style={cellStyle}>Egresos</th>
              <th style={cellStyle}>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td style={cellStyle}>{row?.fecha_pago}</td>
                <td style={cellStyle}>{row?.numero_cuotas}</td>
                <td style={cellStyle}>{row?.grupo}</td>
                <td style={cellStyle}>{row?.modelo}</td>
                <td style={cellStyle}>{`$${Number(row?.monto_total)}`}</td>
                <td style={cellStyle}>{`$${Number(row?.monto)}`}</td>
                <td style={cellStyle}>{`$${row?.dias_cuota}`}</td>
              </tr>
            ))}

            <tr>
              <td style={cellStyle} colSpan="3"></td>
              <td style={cellStyle}>Totales</td>
              <td style={cellStyle}>{`$${totalIngresos}`}</td>
              <td style={cellStyle}>{`$${totalEgresos}`}</td>
              <td style={cellStyle}>{`$${saldo}`}</td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            width: "97%",
            marginTop: "4%",
            borderCollapse: "collapse",
            marginLeft: 18,
          }}
        >
          <Typography
            sx={{ ml: 2, flex: 1, textAlign: "center" }}
            variant="h6"
            component="div"
          >
            Resumen de Caja
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              border: "1px solid #000",
              padding: "10px",
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1em",
                }}
              >
                Total Ingresos
              </div>
              <hr
                style={{
                  borderColor: "#464646",
                  borderWidth: "1px",
                  margin: "10px 0",
                }}
              />
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1em",
                }}
              >
                Saldo Anterior
              </div>
              <hr
                style={{
                  borderColor: "#464646",
                  borderWidth: "1px",
                  margin: "10px 0",
                }}
              />
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1em",
                }}
              >
                Total
              </div>
              <hr
                style={{
                  borderColor: "#464646",
                  borderWidth: "1px",
                  margin: "10px 0",
                }}
              />
            </div>
            <div>
              <div>$ {totalIngresos}</div>{" "}
              <hr
                style={{
                  borderColor: "#464646",
                  borderWidth: "1px",
                  margin: "10px 0",
                }}
              />
              <div>$ {saldoAnterior}</div>{" "}
              <hr
                style={{
                  borderColor: "#464646",
                  borderWidth: "1px",
                  margin: "10px 0",
                }}
              />
              <div>$ {total}</div>{" "}
              <hr
                style={{
                  borderColor: "#464646",
                  borderWidth: "1px",
                  margin: "10px 0",
                }}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

const cellStyle = {
  width: "2px",
  border: "1px solid #000",
  padding: "5px",
  textAlign: "center",
};

export default DataGridForm;
