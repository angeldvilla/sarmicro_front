import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import BusAlertIcon from "@mui/icons-material/BusAlert";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import NavBar from "../NavBar/NavBar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ModalCreateVehicle from "../Modals/ModalVehicles/ModalCreateVehicle";
import ModalEditVehicle from "../Modals/ModalVehicles/ModalEditVehicle";
import {
  getVehiculos,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  registerAllPolizas,
} from "../../redux/actions/actionsVehicles";
import { esES } from "@mui/x-data-grid";
import { Toaster, toast } from "sonner";
import styles from "../Buttons/styleButton.module.css";

const DataGridVehicles = ({ rows, columns }) => {
  const [rowEdit, setRowEdit] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openRegisterPolizas, setOpenRegisterPolizas] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [polizasRegistradas, setPolizasRegistradas] = useState(false);

  const navigate = useNavigate();
  const backFunction = () => {
    navigate("/inicio");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehiculos());
  }, [dispatch]);

  const handleOpen = () => {
    setOpenForm(true);
  };

  const handleCreate = async (data) => {
    setOpenForm(false);
    dispatch(createVehicle(data));
  };

  const confirmRegisterPolizas = () => {
    setOpenRegisterPolizas(true);
  };

  /* const registerPolizas = () => {
    setOpenRegisterPolizas(false);
    dispatch(registerAllPolizas());
  }; */
  const registerPolizas = async () => {
    if (polizasRegistradas) {
      return;
    }

    setOpenRegisterPolizas(false);
    setPolizasRegistradas(true);

    try {
      await dispatch(registerAllPolizas());
    } catch (error) {
      toast.error("Ya se proceso el registro de todas las polizas");
    }
  };

  const handleUpdate = (rowId) => {
    const selectedRow = rows.find((row) => row.id === rowId);
    setRowEdit(selectedRow);
    setOpenEdit(true);
  };

  const handleEdit = async (data, rowId) => {
    setOpenEdit(false);
    dispatch(updateVehicle(data, rowId));
  };

  const handleConfirmDelete = (rowId) => {
    const selectedRow = rows.find((row) => row.id === rowId);

    if (selectedRow) {
      setDeleteId(selectedRow.id);
      setOpenDelete(true);
    }
  };

  const handleDelete = async () => {
    if (deleteId !== null) {
      dispatch(deleteVehicle(deleteId));
    }
    setOpenDelete(false);
  };

  const actionsColumn = {
    field: "actions",
    headerName: "Acciones",
    width: 90,
    renderCell: (params) => (
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <Tooltip title="Editar">
          <IconButton
            aria-label="Editar"
            style={{ color: "#0054b4" }}
            onClick={() => handleUpdate(params.id)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Borrar">
          <IconButton
            aria-label="Borrar"
            style={{ color: "#dd0000" }}
            onClick={() => handleConfirmDelete(params.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    ),
  };

  const groupedVehicles = {};

  // Se Agrupa los vehículos por tipo
  rows.forEach((row) => {
    if (!groupedVehicles[row.tipov]) {
      groupedVehicles[row.tipov] = [];
    }
    groupedVehicles[row.tipov].push(row);
  });

  const groupedRows = [];
  for (const tipoVehiculo in groupedVehicles) {
    groupedRows.push({
      tipoVehiculo,
      vehicles: groupedVehicles[tipoVehiculo],
    });
  }

  const viewVehiclesOff = () => {
    window.open("/vehiculos-desvinculados", "_blank");
  };

  return (
    <div style={{ maxWidth: "100%", marginBottom: "20px" }}>
      <NavBar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 20,
          marginLeft: 20,
        }}
      >
        <ArrowBackIcon onClick={backFunction} style={{ cursor: "pointer" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "1.5em",
            gap: "1rem",
          }}
        >
          <Typography
            style={{
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#0ca840ed",
              color: "white",
              fontFamily: "Sans-serif",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 20px",
              fontSize: "0.90em",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
            className={styles.botonLogin}
            onClick={handleOpen}
          >
            Crear Vehiculo <AddCircleIcon />
          </Typography>
          <Typography
            style={{
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "rgba(209, 188, 3, 0.966)",
              color: "white",
              fontFamily: "Sans-serif",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 20px",
              fontSize: "0.90em",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
            className={styles.botonRegisterPolizas}
            onClick={confirmRegisterPolizas}
          >
            Registrar Polizas <AppRegistrationIcon />
          </Typography>
          <Typography
            style={{
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#0c4aa8eb",
              color: "white",
              fontFamily: "Sans-serif",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 20px",
              fontSize: "0.90em",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
            className={styles.boton}
            /* onClick={viewVehiclesOff} */
          >
            Descargar <DownloadIcon />
          </Typography>
          <Typography
            style={{
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#a80c0cec",
              color: "white",
              fontFamily: "Sans-serif",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 20px",
              fontSize: "0.90em",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
            className={styles.botonLogout}
            onClick={viewVehiclesOff}
          >
            Vehiculos Desvinculados <BusAlertIcon />
          </Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {groupedRows.map((group, index) => (
          <div key={index}>
            <Grid item xs={2}>
              <Paper
                elevation={3}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "18px",
                  marginBottom: "2%",
                  marginTop: "3%",
                  fontFamily: "sans-serif",
                  fontStyle: "italic",
                  fontWeight: "bold",
                  color: "#0080ca",
                  fontSize: "1.2em",
                }}
              >
                {group.tipoVehiculo}
              </Paper>
            </Grid>
            <DataGrid
              rows={group.vehicles}
              columns={[...columns, actionsColumn]}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 25 },
                },
              }}
              pageSizeOptions={[25, 50, 100]}
              loading={group.vehicles.length === 0}
              virtualization
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              disableColumnSelector
              disableDensitySelector
              disableRowSelectionOnClick
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              style={{
                backgroundColor: "#ffffffcc",
                color: "black",
                marginTop: "2%",
                marginBottom: "5%",
              }}
            />
            {index < groupedRows.length - 1 && (
              <Divider
                style={{
                  borderColor: "#0080ca9e",
                  borderWidth: "2px",
                  margin: "20px 0",
                }}
              />
            )}
          </div>
        ))}
      </div>
      <Toaster richColors position="top-right" />
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle
          style={{
            fontFamily: "sans-serif",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Eliminar Vehiculo
        </DialogTitle>
        <DialogContent style={{ fontStyle: "revert-layer", fontWeight: "400" }}>
          ¿Estás seguro de eliminar este vehiculo?
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Typography
            style={{
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "rgba(19, 75, 197, 0.938)",
              color: "white",
              fontFamily: "Sans-serif",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "5px 15px",
              fontSize: "0.90em",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
            color="primary"
            onClick={() => setOpenDelete(false)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(2, 59, 182, 0.938)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(19, 75, 197, 0.938)")
            }
          >
            No
          </Typography>

          <Typography
            style={{
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "rgba(197, 31, 19, 0.938)",
              color: "white",
              fontFamily: "Sans-serif",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "5px 15px",
              fontSize: "0.90em",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
            color="error"
            onClick={handleDelete}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(187, 12, 0, 0.938)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(197, 31, 19, 0.938)")
            }
          >
            Si
          </Typography>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openRegisterPolizas}
        onClose={() => setOpenRegisterPolizas(false)}
      >
        <DialogTitle
          style={{
            fontFamily: "sans-serif",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Registro de Todas las Polizas
        </DialogTitle>
        <DialogContent style={{ fontStyle: "revert-layer", fontWeight: "400" }}>
          ¿Estás seguro de registrar todas las polizas del parque automotor?
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Typography
            style={{
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "rgba(19, 75, 197, 0.938)",
              color: "white",
              fontFamily: "Sans-serif",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 20px",
              fontSize: "0.90em",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
            color="primary"
            onClick={() => setOpenRegisterPolizas(false)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(2, 59, 182, 0.938)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(19, 75, 197, 0.938)")
            }
          >
            No
          </Typography>
          {/*  <Button onClick={() => setOpenRegisterPolizas(false)} color="primary">
            No
          </Button> */}
          <Typography
            style={{
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "rgba(197, 31, 19, 0.938)",
              color: "white",
              fontFamily: "Sans-serif",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 20px",
              fontSize: "0.90em",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
            color="error"
            onClick={registerPolizas}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(187, 12, 0, 0.938)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(197, 31, 19, 0.938)")
            }
          >
            Si
          </Typography>
          {/* <Button onClick={registerPolizas} color="error">
            Sí
          </Button> */}
        </DialogActions>
      </Dialog>
      <ModalCreateVehicle
        open={openForm}
        handleClose={() => setOpenForm(false)}
        handleCreate={handleCreate}
      />
      <ModalEditVehicle
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        handleEdit={handleEdit}
        rowEdit={rowEdit}
      />
    </div>
  );
};

export default DataGridVehicles;
