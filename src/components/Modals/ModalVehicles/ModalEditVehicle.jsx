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
import FormControl from "@mui/material/FormControl";
import Select from "react-select";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalEditVehicle({
  open,
  handleClose,
  handleEdit,
  rowEdit,
}) {
  const [editedRow, setEditedRow] = useState(rowEdit);

  useEffect(() => {
    if (rowEdit) {
      setEditedRow(rowEdit);
    }
  }, [open, rowEdit]);

  const typePolicy = useSelector((state) => state?.values?.typesPolicys);
  const propietary = useSelector((state) => state?.vehicles?.propietaryData);
  const brandVehicle = useSelector((state) => state?.vehicles?.brandsData);

  const handleEditVehiculo = () => {
    const data = {
      id_movil: editedRow.id_movil,
      id_marca: editedRow.id_marca,
      propietario: editedRow.propietario,
      id_propietario: editedRow.id_propietario,
      id_tipov: editedRow.id_tipov,
      telefono: editedRow.telefono,
      marca: editedRow.marca,
      clase: editedRow.clase,
      placa: editedRow.placa,
      modelo: editedRow.modelo,
      color: editedRow.color,
      motor: editedRow.motor,
      grupo: editedRow.grupo,
      poliza: editedRow.poliza,
      serie: editedRow.serie,
      referencia: editedRow.referencia,
      tipo: editedRow.tipo,
      tipov: editedRow.tipov,
      estado: editedRow.estado,
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
              Editar Vehiculo
            </Typography>
            <Button
              style={{
                backgroundColor: "rgba(0, 148, 7, 0.795)",
                color: "white",
                borderRadius: "8px",
              }}
              onClick={handleEditVehiculo}
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
              value={editedRow ? editedRow?.id_movil : ""}
              placeholder="Ingrese el identificador del movil"
              onChange={(e) =>
                setEditedRow((prevState) => ({
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
                  editedRow?.propietario
                    ? {
                        label: editedRow?.propietario,
                        value: editedRow?.propietario,
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

                  setEditedRow((prevState) => ({
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
              value={editedRow ? editedRow?.telefono : ""}
              placeholder="Ingrese el telefono del propietario"
              onChange={(e) =>
                setEditedRow((prevState) => ({
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
                  editedRow?.marca
                    ? { label: editedRow?.marca, value: editedRow?.marca }
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

                  setEditedRow((prevState) => ({
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
              label="Clase"
              margin="none"
              name="Clase"
              value={editedRow ? editedRow?.clase : ""}
              placeholder="Ingrese la clase del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
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
              value={editedRow ? editedRow?.color : ""}
              placeholder="Ingrese el color del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  color: e.target.value,
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
              value={editedRow ? editedRow?.placa : ""}
              placeholder="Ingrese la placa del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  placa: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Modelo"
              margin="none"
              name="Modelo"
              value={editedRow ? editedRow?.modelo : ""}
              placeholder="Ingrese el modelo del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  modelo: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Motor"
              margin="none"
              name="Motor"
              value={editedRow ? editedRow?.motor : ""}
              placeholder="Ingrese el motor del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  motor: e.target.value,
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
                  editedRow?.grupo
                    ? { label: editedRow?.grupo, value: editedRow?.grupo }
                    : null
                }
                noOptionsMessage={() => "No se encontraron grupos"}
                onChange={(selectedOption) =>
                  setEditedRow((prevState) => ({
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
              label="Serie"
              margin="none"
              name="Serie"
              value={editedRow ? editedRow?.serie : ""}
              placeholder="Ingrese la serie del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  serie: e.target.value,
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
              value={editedRow ? editedRow?.referencia : ""}
              placeholder="Ingrese la referencia del vehiculo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
                  ...prevState,
                  referencia: e.target.value,
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
              value={editedRow ? editedRow?.tipo : ""}
              placeholder="Ingrese el tipo"
              onChange={(e) =>
                setEditedRow((prevState) => ({
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
                  ...typePolicy.map((policy) => ({
                    label: policy?.tipov,
                    value: policy?.tipov,
                  })),
                ]}
                value={
                  editedRow?.tipov
                    ? { label: editedRow?.tipov, value: editedRow?.tipov }
                    : null
                }
                noOptionsMessage={() => "No se encontró el tipo de vehículo"}
                onChange={(selectedOption) => {
                  const selectedType = selectedOption
                    ? selectedOption.value
                    : null;

                  const foundTypeVehicle = typePolicy.find(
                    (policy) => policy?.tipov === selectedType
                  );

                  const found_id_tipov = foundTypeVehicle
                    ? foundTypeVehicle?.id_tipov
                    : "";

                  setEditedRow((prevState) => ({
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
