import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCreateValue({ open, handleClose, handleCreate }) {
  const typePolicy = useSelector((state) => state?.values?.typesPolicys);
  const typeEnterprise = useSelector((state) => state?.values?.typesEnterprise);
  /* const today = new Date().toISOString().split("T")[0]; */
  const [newValorPoliza, setNewValorPoliza] = useState({
    tipo_poliza: "",
    tipo_poliza_id: "",
    empresa: "",
    vehiculo_grupo: "",
    valor_poliza: "",
    dias: 365,
    vehiculo_grupo_id: "",
    numero_cuotas: "",
    fecha_inicial: "",
    fecha_vencimiento: "",
    valor_inicial: 0,
  });
  console.log(newValorPoliza);
  const handleCreateValuePoliza = () => {
    const valuePoliza = {
      tipo_poliza: newValorPoliza.tipo_poliza,
      tipo_poliza_id: newValorPoliza.tipo_poliza_id,
      empresa: newValorPoliza.empresa,
      vehiculo_grupo: newValorPoliza.vehiculo_grupo,
      valor_poliza: newValorPoliza.valor_poliza,
      dias: newValorPoliza.dias,
      vehiculo_grupo_id: newValorPoliza.vehiculo_grupo_id,
      numero_cuotas: newValorPoliza.numero_cuotas,
      fecha_inicial: newValorPoliza.fecha_inicial,
      fecha_vencimiento: newValorPoliza.fecha_vencimiento,
      valor_inicial: newValorPoliza.valor_inicial,
    };

    handleCreate(valuePoliza);
  };

  /* const valueTotal = (event) => {
    const cuota_inicial_porcentaje = event.target.value;

    const valor_inicial =
      parseFloat(newValorPoliza.valor_poliza * cuota_inicial_porcentaje) / 100;
    if (!isNaN(cuota_inicial_porcentaje)) {
      setNewValorPoliza((prevState) => {
        return {
          ...prevState,
          cuota_inicial_porcentaje,
          valor_inicial,
        };
      });
    }
  }; */

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
              Crear Valor de Póliza
            </Typography>
            <Button
              style={{
                backgroundColor: "rgba(0, 148, 7, 0.795)",
                color: "white",
                borderRadius: "8px",
              }}
              /* autoFocus */
              onClick={handleCreateValuePoliza}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(0, 173, 9, 0.753)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(0, 148, 7, 0.795)")
              }
            >
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} sx={{ p: 20 }}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Poliza</InputLabel>
              <Select
                label="Tipo de Poliza"
                variant="outlined"
                value={newValorPoliza ? newValorPoliza?.tipo_poliza : ""}
                /* onChange={(e) =>
                  setNewValorPoliza((prevState) => ({
                    ...prevState,
                    tipo_poliza: e.target.value,
                  }))
                } */
                onChange={(e) => {
                  const selectedPolicy = e.target.value;

                  // Obtener el tipo_poliza_id de acuerdo a el tipo de poliza seleccionada
                  const foundPolicy = typePolicy.find(
                    (policy) => policy.tipov === selectedPolicy
                  );
                  const tipo_poliza_id = foundPolicy?.id_tipov;

                  setNewValorPoliza((prevState) => ({
                    ...prevState,
                    tipo_poliza: selectedPolicy,
                    tipo_poliza_id: tipo_poliza_id,
                  }));
                }}
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {typePolicy &&
                  typePolicy.map((policy) => (
                    <MenuItem key={policy.id_tipov} value={policy.tipov}>
                      {policy.tipov}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Empresa</InputLabel>
              <Select
                label="Empresa"
                variant="outlined"
                value={newValorPoliza ? newValorPoliza?.empresa : ""}
                /* onChange={(e) =>
                  setNewValorPoliza((prevState) => ({
                    ...prevState,
                    empresa: e.target.value,
                  }))
                } */
                onChange={(e) => {
                  const selectedEnterprise = e.target.value;

                  // Obtener el vehiculo_grupo_id de acuerdo a la empresa seleccionada
                  const foundEnterprise = typeEnterprise.find(
                    (enterprise) => enterprise.nombre === selectedEnterprise
                  );
                  const vehiculo_grupo_id = foundEnterprise?.id_empresa;

                  // Obtener el vehiculo_grupo de acuerdo a la empresa seleccionada
                  const groupEnterprise = typeEnterprise.find(
                    (group) => group.id_empresa === vehiculo_grupo_id
                  );
                  const vehiculo_grupo = groupEnterprise?.grupo;

                  setNewValorPoliza((prevState) => ({
                    ...prevState,
                    empresa: selectedEnterprise,
                    vehiculo_grupo: vehiculo_grupo,
                    vehiculo_grupo_id: vehiculo_grupo_id,
                  }));
                }}
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {typeEnterprise &&
                  typeEnterprise.map((enterprise) => (
                    <MenuItem
                      key={enterprise.id_empresa}
                      value={enterprise.nombre}
                    >
                      {enterprise.nombre} - {enterprise.grupo}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Valor Poliza"
              margin="none"
              name="ValorPoliza"
              type="number"
              value={newValorPoliza ? newValorPoliza?.valor_poliza : ""}
              placeholder="Ingrese el valor de la poliza"
              onChange={(e) =>
                setNewValorPoliza((prevState) => ({
                  ...prevState,
                  valor_poliza: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Cuotas (Dias)</InputLabel>
              <Select
                label="Tipo de Cuotas (Dias)"
                variant="outlined"
                value={newValorPoliza ? newValorPoliza?.dias : ""}
                /* onChange={(e) =>
                  setNewValorPoliza((prevState) => ({
                    ...prevState,
                    dias: e.target.value,
                  }))
                } */
                disabled
              >
                {/*  <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                 <MenuItem value={7}>Semanal</MenuItem>
                <MenuItem value={15}>Quincenal</MenuItem>
                <MenuItem value={31}>Mensual</MenuItem>
                <MenuItem value={93}>Trimestral</MenuItem>
                <MenuItem value={180}>Semestral</MenuItem> */}
                <MenuItem value={365}>Anual</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Numero de Cuotas"
              margin="none"
              name="ValorPoliza"
              type="number"
              value={newValorPoliza ? newValorPoliza?.numero_cuotas : ""}
              placeholder="Ingrese el numero de cuotas"
              onChange={(e) =>
                setNewValorPoliza((prevState) => ({
                  ...prevState,
                  numero_cuotas: e.target.value,
                }))
              }
            />
          </Grid>

          {/* <Grid item xs={6}>
            <TextField
              fullWidth
              label="Porcentaje de Cuota"
              margin="none"
              name="PorcentajeCuota"
              type="number"
              value={
                newValorPoliza ? newValorPoliza?.cuota_inicial_porcentaje : ""
              }
               onChange={(e) =>
                setNewValorPoliza((prevState) => ({
                  ...prevState,
                  cuota_inicial_porcentaje: e.target.value,
                }))
              }
              onChange={valueTotal}
            />
          </Grid> */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Valor inicial"
              margin="none"
              name="TotalPagar"
              type="number"
              value={newValorPoliza ? newValorPoliza?.valor_inicial : ""}
              placeholder="Valor inicial"
              onChange={(e) =>
                setNewValorPoliza((prevState) => ({
                  ...prevState,
                  valor_inicial: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Fecha Inicial"
              name={"FechaIni"}
              margin="none"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newValorPoliza ? newValorPoliza?.fecha_inicial : ""}
              onChange={(e) =>
                setNewValorPoliza((prevState) => ({
                  ...prevState,
                  fecha_inicial: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Fecha de Vencimiento"
              name={"FechaFin"}
              margin="none"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newValorPoliza ? newValorPoliza?.fecha_vencimiento : ""}
              onChange={(e) =>
                setNewValorPoliza((prevState) => ({
                  ...prevState,
                  fecha_vencimiento: e.target.value,
                }))
              }
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
