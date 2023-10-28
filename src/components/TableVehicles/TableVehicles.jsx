import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch /* , useSelector */ } from "react-redux";
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
  /* getExportVinculadosExcel, */
} from "../../redux/actions/actionsVehicles";
import { esES } from "@mui/x-data-grid";
import { Toaster, toast } from "sonner";
import { utils, writeFileXLSX } from "xlsx";
import style from "./tablesVehicles.module.css";
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
    /* dispatch(getExportVinculadosExcel()); */
  }, [dispatch]);

  /* const resultados = useSelector((state) => state?.vehicles?.vehiclesData); */

  const handleOpen = () => {
    setOpenForm(true);
  };

  const handleCreate = async (data) => {
    // Verificar si ya existe un registro con el mismo ID
    const isDuplicate = rows.some((row) => row.id === data.id);

    if (isDuplicate) {
      // Mostrar un mensaje de error o realizar alguna acción
      toast.error("Ya existe un registro con este ID.");
    } else {
      setOpenForm(false);
      dispatch(createVehicle(data));
    }
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
      toast.error("Ya se proceso el registro de todas las polizas");
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
          width: "95%",
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
    navigate("/vehiculos-desvinculados");
    /* window.open("/vehiculos-desvinculados", "_blank"); */
  };

  const exportToExcel = () => {
    const wb = utils.book_new();

    // Agregar la hoja de cálculo al libro
    utils.book_append_sheet(
      wb,
      // Crear una hoja de cálculo y asignarle los datos
      utils.json_to_sheet(rows),
      "Vehiculos Vinculados"
    );
    // Descargar el archivo Excel
    writeFileXLSX(wb, "Vehiculos-Parque-Automotor.xlsx");
  };

  const downloadExcel = async () => {
    try {
      exportToExcel(rows);
    } catch (error) {
      toast.error("Error al descargar el archivo excel, intente de nuevo");
    }
  };

  return (
    <div className={style.container1}>
      <NavBar />
      <div className={style.container2}>
        <ArrowBackIcon onClick={backFunction} style={{ cursor: "pointer" }} />
        <div className={style.container3}>
          <button
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
          </button>
          <button
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
          </button>
          <button
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
            onClick={downloadExcel}
          >
            Descargar Excel <DownloadIcon />
          </button>
          <button
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
          </button>
        </div>
      </div>
      <div className={style.container4}>
        {groupedRows.map((group, index) => (
          <div key={index}>
            <Grid item xs={2}>
              <Paper
                elevation={3}
                style={{ color: "#0080ca" }}
                className={style.paper}
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
              components={{ Toolbar: GridToolbar }}
              componentsProps={{
                toolbar: {
                  csvOptions: { disableToolbarButton: true },
                  printOptions: { disableToolbarButton: true },
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 250 },
                },
              }}
              experimentalFeatures={{ newEditingApi: true }}
              className={style.dataGrid}
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
          <button
            className={style.buttonClose}
            onClick={() => setOpenDelete(false)}
          >
            No
          </button>

          <button className={style.buttonDelete} onClick={handleDelete}>
            Si
          </button>
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
          <button
            className={style.buttonClose}
            onClick={() => setOpenRegisterPolizas(false)}
          >
            No
          </button>

          <button className={style.buttonDelete} onClick={registerPolizas}>
            Si
          </button>
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
