import React from "react";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DataGridForm = ({ open, handleClose, rows }) => {
  let totalIngresos = 0;
  let totalEgresos = 0;

  // Calcular los totales de ingresos egresos y saldo
  for (const row of rows) {
    if (row?.tipo === "Ingreso") {
      totalIngresos += Number(row?.monto);
    } else if (row?.tipo === "Egreso") {
      totalEgresos += Number(row?.monto);
    }
  }
  const saldoTotal = totalEgresos + totalIngresos;

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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid item xs={2}>
            <Paper
              elevation={3}
              style={{
                padding: "18px",
                marginBottom: "1%",
                marginTop: "3%",
                fontFamily: "sans-serif",
                fontStyle: "italic",
                fontWeight: "bold",
                color: "#0080ca",
                fontSize: "1.2em",
              }}
            >
              Transportes Argelia y Cairo S.A, Transportadora Cartago S.A.S y
              Transportes Especiales el Sol S.A.S
            </Paper>
          </Grid>
        </div>
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
              <th style={cellStyle}>Movil</th>
              <th style={cellStyle}>Recibo</th>
              <th style={cellStyle}>Concepto</th>
              <th style={cellStyle}>Fecha</th>
              <th style={cellStyle}>Ingresos</th>
              <th style={cellStyle}>Egresos</th>
              <th style={cellStyle}>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const concepto = row?.concepto === null ? "---" : row?.concepto;
              const ingresos =
                row?.tipo === "Ingreso" ? Number(row?.monto) : "0";
              const egresos = row?.tipo === "Egreso" ? Number(row?.monto) : "0";
              const saldo = ingresos - egresos;

              return (
                <tr key={index}>
                  <td style={cellStyle}>{row?.id_movil}</td>
                  <td style={cellStyle}>2023000{row?.id}</td>
                  <td style={cellStyle}>{concepto}</td>
                  <td style={cellStyle}>{row?.fecha_pago}</td>
                  <td
                    style={{ ...cellStyle, color: "green" }}
                  >{`$${ingresos} COP`}</td>
                  <td
                    style={{ ...cellStyle, color: "red" }}
                  >{`$${egresos} COP`}</td>
                  <td style={cellStyle}>{`$${saldo} COP`}</td>
                </tr>
              );
            })}

            <tr>
              <td style={cellStyle} colSpan="3"></td>
              <td
                style={{
                  ...cellStyle,
                  fontWeight: "800",
                  fontStyle: "oblique",
                }}
              >
                Totales
              </td>
              <td
                style={{ ...cellStyle, color: "green" }}
              >{`$${totalIngresos} COP`}</td>
              <td
                style={{ ...cellStyle, color: "red" }}
              >{`$${totalEgresos} COP`}</td>
              <td style={cellStyle}>{`$${saldoTotal} COP`}</td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            width: "97%",
            marginTop: "4%",
            marginBottom: "2%",
            borderCollapse: "collapse",
            marginLeft: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid item xs={2}>
              <Paper
                elevation={3}
                style={{
                  padding: "12px",
                  marginBottom: "1%",
                  marginTop: "2%",
                  fontFamily: "sans-serif",
                  fontStyle: "italic",
                  fontWeight: "bold",
                  color: "#0080ca",
                  fontSize: "1.2em",
                }}
              >
                Resumen de Caja
              </Paper>
            </Grid>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "1%",
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
                Total Egresos
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
                Saldo Total
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
              <div style={{ color: "green" }}>$ {totalIngresos} COP</div>{" "}
              <hr
                style={{
                  borderColor: "#464646",
                  borderWidth: "1px",
                  margin: "10px 0",
                }}
              />
              <div style={{ color: "red" }}>$ {totalEgresos} COP</div>{" "}
              <hr
                style={{
                  borderColor: "#464646",
                  borderWidth: "1px",
                  margin: "10px 0",
                }}
              />
              <div>$ {saldoTotal} COP</div>{" "}
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
