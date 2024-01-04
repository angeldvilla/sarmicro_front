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
import FormControl from "@mui/material/FormControl";
import Select from "react-select";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCreateVehicle({
  open,
  handleClose,
  handleCreate,
}) {
  const typeVehicle = useSelector((state) => state?.values?.typesPolicys);
  const propietary = useSelector((state) => state?.vehicles?.propietaryData);
  const brandVehicle = useSelector((state) => state?.vehicles?.brandsData);

  const [newVehicle, setNewVehicle] = useState({
    id_movil: "",
    id_marca: "",
    propietario: "",
    id_propietario: "",
    id_tipov: "",
    telefono: "",
    marca: "",
    modelo: "",
    placa: "",
    clase: "",
    color: "",
    grupo: "",
    motor: "",
    poliza: "0",
    referencia: "",
    serie: "",
    tipo: "",
    tipov: "",
  });
  const handleCreateVehicle = () => {
    const dataVehicle = {
      ...newVehicle,
      estado: 1,
    };
    handleCreate(dataVehicle);
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
              Crear Vehiculo
            </Typography>
            <Button
              style={{
                backgroundColor: "rgba(0, 148, 7, 0.795)",
                color: "white",
                borderRadius: "8px",
              }}
              onClick={handleCreateVehicle}
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
        <Grid container spacing={2} sx={{ p: 12 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Movil"
              margin="none"
              name="Movil"
              value={newVehicle ? newVehicle?.id_movil : ""}
              placeholder="Ingrese el identificador del movil"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  id_movil: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <Select
                options={[
                  { label: "NINGUNO", value: null },
                  ...propietary.map((p) => ({
                    label: p?.nombreCompleto,
                    value: p?.nombreCompleto,
                  })),
                ]}
                value={
                  newVehicle?.propietario
                    ? {
                        label: newVehicle?.propietario,
                        value: newVehicle?.propietario,
                      }
                    : null
                }
                noOptionsMessage={() => "No se encontraron propietarios"}
                onChange={(selectedOption) => {
                  const selectedPropietario = selectedOption.value;

                  const foundPropietary = propietary.find(
                    (propietary) =>
                      propietary?.nombreCompleto === selectedPropietario
                  );

                  const found_id_propietary = foundPropietary
                    ? foundPropietary?.id_propietario
                    : "";

                  setNewVehicle((prevState) => ({
                    ...prevState,
                    id_propietario: found_id_propietary,
                    propietario: selectedPropietario,
                  }));
                }}
                isSearchable
                placeholder="Propietario"
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  control: (base) => ({
                    ...base,
                    width: "100%",
                    height: "55px",
                  }),
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Telefono"
              margin="none"
              name="Telefono"
              value={newVehicle ? newVehicle?.telefono : ""}
              placeholder="Ingrese el numero de telefono del propietario"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  telefono: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <Select
                options={[
                  { label: "NINGUNO", value: null },
                  ...brandVehicle.map((brand) => ({
                    label: brand?.marca,
                    value: brand?.marca,
                  })),
                ]}
                value={
                  newVehicle?.marca
                    ? { label: newVehicle?.marca, value: newVehicle?.marca }
                    : null
                }
                noOptionsMessage={() => "No se encontraron marcas"}
                onChange={(selectedOption) => {
                  const selectedBrand = selectedOption
                    ? selectedOption.value
                    : null;

                  const foundBrand = brandVehicle.find(
                    (brand) => brand?.marca === selectedBrand
                  );

                  const found_id_marca = foundBrand
                    ? String(foundBrand?.id_marca)
                    : "";

                  setNewVehicle((prevState) => ({
                    ...prevState,
                    id_marca: String(found_id_marca),
                    marca: selectedBrand,
                  }));
                }}
                isSearchable
                placeholder="Marca"
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  control: (base) => ({
                    ...base,
                    width: "100%",
                    height: "55px",
                  }),
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Modelo"
              margin="none"
              name="Modelo"
              value={newVehicle ? newVehicle?.modelo : ""}
              placeholder="Ingrese el modelo del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  modelo: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Placa"
              margin="none"
              name="Placa"
              value={newVehicle ? newVehicle?.placa : ""}
              placeholder="Ingrese la placa del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  placa: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Clase"
              margin="none"
              name="Clase"
              value={newVehicle ? newVehicle?.clase : ""}
              placeholder="Ingrese la clase del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  clase: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Color"
              margin="none"
              name="Color"
              value={newVehicle ? newVehicle?.color : ""}
              placeholder="Ingrese el color del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  color: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <Select
                options={[
                  { label: "NINGUNO", value: null },
                  { label: "TA", value: "TA" },
                  { label: "TC", value: "TC" },
                  { label: "TE", value: "TE" },
                ]}
                value={
                  newVehicle?.grupo
                    ? { label: newVehicle?.grupo, value: newVehicle?.grupo }
                    : null
                }
                noOptionsMessage={() => "No se encontraron grupos"}
                onChange={(selectedOption) =>
                  setNewVehicle((prevState) => ({
                    ...prevState,
                    grupo: selectedOption ? selectedOption.value : null,
                  }))
                }
                isSearchable
                placeholder="Grupo"
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  control: (base) => ({
                    ...base,
                    width: "100%",
                    height: "55px",
                  }),
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Motor"
              margin="none"
              name="Motor"
              value={newVehicle ? newVehicle?.motor : ""}
              placeholder="Ingrese el motor del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  motor: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Referencia"
              margin="none"
              name="Referencia"
              value={newVehicle ? newVehicle?.referencia : ""}
              placeholder="Ingrese la referencia del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  referencia: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Serie"
              margin="none"
              name="Serie"
              value={newVehicle ? newVehicle?.serie : ""}
              placeholder="Ingrese la serie del vehiculo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  serie: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tipo"
              margin="none"
              name="Tipo"
              value={newVehicle ? newVehicle?.tipo : ""}
              placeholder="Ingrese el tipo"
              onChange={(e) =>
                setNewVehicle((prevState) => ({
                  ...prevState,
                  tipo: e.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <Select
                label="Tipo de Vehiculo"
                variant="outlined"
                options={[
                  { label: "NINGUNO", value: null },
                  ...typeVehicle.map((policy) => ({
                    label: policy?.tipov,
                    value: policy?.tipov,
                  })),
                ]}
                value={
                  newVehicle?.tipov
                    ? { label: newVehicle?.tipov, value: newVehicle?.tipov }
                    : null
                }
                noOptionsMessage={() => "No se encontró el tipo de vehículo"}
                onChange={(selectedOption) => {
                  const selectedType = selectedOption
                    ? selectedOption.value
                    : null;

                  const foundTypeVehicle = typeVehicle.find(
                    (vehicle) => vehicle?.tipov === selectedType
                  );

                  const found_id_tipov = foundTypeVehicle
                    ? foundTypeVehicle?.id_tipov
                    : "";

                  setNewVehicle((prevState) => ({
                    ...prevState,
                    id_tipov: found_id_tipov,
                    tipov: selectedType,
                  }));
                }}
                isSearchable
                placeholder="Tipo de Vehiculo"
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  control: (base) => ({
                    ...base,
                    width: "100%",
                    height: "55px",
                  }),
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
