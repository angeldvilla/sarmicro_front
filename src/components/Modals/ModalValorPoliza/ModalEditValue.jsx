import React, { useState, useEffect } from "react";
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

export default function ModalEditValue({
  open,
  handleClose,
  handleEdit,
  rowEdit,
}) {
  useEffect(() => {
    if (rowEdit) {
      setEditedRow(rowEdit);
    }
  }, [open, rowEdit]);

  const [editedRow, setEditedRow] = useState(rowEdit);

  const typePolicy = useSelector((state) => state?.values?.typesPolicys);
  const typeEnterprise = useSelector((state) => state?.values?.typesEnterprise);

  const handleEditValuePoliza = () => {
    const data = {
      id: editedRow.id,
      tipo_poliza: editedRow.tipo_poliza,
      vehiculo_grupo: editedRow.vehiculo_grupo,
      valor_poliza: editedRow.valor_poliza,
      dias: editedRow.dias,
      vehiculo_grupo_id: editedRow.vehiculo_grupo_id,
      numero_cuotas: editedRow.numero_cuotas,
      /* cuota_inicial_porcentaje: editedRow.cuota_inicial_porcentaje, */
      fecha_inicial: editedRow.fecha_inicial,
      fecha_vencimiento: editedRow.fecha_vencimiento,
      valor_inicial: editedRow.valor_inicial,
    };
    handleEdit(data, rowEdit.id);
  };

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
              Editar Valor de Poliza
            </Typography>
            <Button
              style={{
                backgroundColor: "rgba(0, 148, 7, 0.795)",
                color: "white",
                borderRadius: "8px",
              }}
              /* autoFocus */
              onClick={handleEditValuePoliza}
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
                value={editedRow ? editedRow?.tipo_poliza : ""}
                onChange={(e) =>
                  setEditedRow((prevState) => ({
                    ...prevState,
                    tipo_poliza: e.target.value,
                  }))
                }
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
                value={editedRow ? editedRow?.vehiculo_grupo_id : ""}
                onChange={(e) => {
                  const selectedVehiculoGrupoId = e.target.value;

                  // Encontrar la empresa correspondiente al vehiculo_grupo_id
                  const foundEnterprise = typeEnterprise.find(
                    (enterprise) =>
                      enterprise.id_empresa === selectedVehiculoGrupoId
                  );

                  setEditedRow((prevState) => ({
                    ...prevState,
                    /* empresa: foundEnterprise.nombre, */
                    vehiculo_grupo_id: selectedVehiculoGrupoId,
                    vehiculo_grupo: foundEnterprise.grupo,
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
                      value={enterprise.id_empresa}
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
              value={editedRow ? editedRow?.valor_poliza : ""}
              placeholder="Ingrese el valor de la poliza"
              onChange={(e) =>
                setEditedRow((prevState) => ({
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
                value={editedRow ? editedRow?.dias : ""}
                onChange={(e) =>
                  setEditedRow((prevState) => ({
                    ...prevState,
                    dias: e.target.value,
                  }))
                }
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value={7}>Semanal</MenuItem>
                <MenuItem value={15}>Quincenal</MenuItem>
                <MenuItem value={31}>Mensual</MenuItem>
                <MenuItem value={93}>Trimestral</MenuItem>
                <MenuItem value={180}>Semestral</MenuItem>
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
              value={editedRow ? editedRow?.numero_cuotas : ""}
              placeholder="Ingrese el numero de cuotas"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  numero_cuotas: e.target.value,
                }))
              }
            />
          </Grid>

          {/*   <Grid item xs={6}>
            <TextField
              fullWidth
              label="Porcentaje de Cuota"
              margin="none"
              name="PorcentajeCuota"
              type="number"
              value={editedRow ? editedRow?.cuota_inicial_porcentaje : ""}
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  cuota_inicial_porcentaje: e.target.value,
                }))
              }
            />
          </Grid> */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Valor inicial"
              margin="none"
              name="TotalPagar"
              type="number"
              value={editedRow ? editedRow?.valor_inicial : ""}
              placeholder="Valor inicial"
              onChange={(e) =>
                setEditedRow((prevState) => ({
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
              disabled
              value={editedRow ? editedRow?.fecha_inicial : ""}
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
              value={editedRow ? editedRow?.fecha_vencimiento : ""}
              onChange={(e) =>
                setEditedRow((prevState) => ({
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
