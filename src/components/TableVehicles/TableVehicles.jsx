import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
/* import DeleteIcon from "@mui/icons-material/Delete"; */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import BusAlertIcon from "@mui/icons-material/BusAlert";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NavBar from "../NavBar/NavBar";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ModalCreateVehicle from "../Modals/ModalVehicles/ModalCreateVehicle";
import ModalEditVehicle from "../Modals/ModalVehicles/ModalEditVehicle";
import ModalFormDeleted from "../Modals/ModalFormDeleted/ModalFormDeleted";
import {
  getVehiculos,
  createVehicle,
  updateVehicle,
  /* deleteVehicle, */
  registerAllPolizas,
  deleteVehicleAll,
} from "../../redux/actions/actionsVehicles";
import { esES } from "@mui/x-data-grid";
import { Toaster, toast } from "sonner";
import { utils, writeFileXLSX } from "xlsx";
import style from "./tablesVehicles.module.css";
import styles from "../Buttons/styleButton.module.css";
import Loader from "../Loader/Loader";

const DataGridVehicles = ({ rows, columns }) => {
  const [rowEdit, setRowEdit] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  /* const [openDelete, setOpenDelete] = useState(false); */
  const [openDeleteAll, setOpenDeleteAll] = useState(false);
  const [openRegisterPolizas, setOpenRegisterPolizas] = useState(false);
  /* const [deleteId, setDeleteId] = useState(null); */
  const [polizasRegistradas, setPolizasRegistradas] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});

  const authUser = useSelector((state) => state?.auth?.authUser);
  const userRoles = useSelector((state) => state?.users?.userRoles);

  const navigate = useNavigate();
  const backFunction = () => {
    navigate("/inicio");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehiculos());
    setIsLoading(false);
  }, [dispatch, isLoading]);

  const handleOpen = () => {
    setOpenForm(true);
  };

  const handleCreate = (data) => {
    // Verificar si ya existe un registro con el mismo ID
    const isDuplicate = rows.some((row) => row.id === data.id);

    if (isDuplicate) {
      toast.error("Ya existe un registro con este ID.");
    } else {
      setOpenForm(false);
      dispatch(createVehicle(data));
    }
  };

  const confirmRegisterPolizas = () => {
    setOpenRegisterPolizas(true);
  };

  const registerPolizas = () => {
    if (polizasRegistradas) {
      toast.error("Ya se proceso el registro de todas las polizas");
      return;
    }
    setOpenRegisterPolizas(false);
    setPolizasRegistradas(true);

    try {
      dispatch(registerAllPolizas());
    } catch (error) {
      toast.error("Ya se proceso el registro de todas las polizas");
    }
  };

  /* const handleUpdate = (rowId) => {
    const selectedRow = rows.find((row) => row.id === rowId);
    setRowEdit(selectedRow);
    setOpenEdit(true);
  }; */

  const handleUpdate = (rowId) => {
    // Extraer el tipoVehiculo y el índice del rowId
    const [tipoVehiculo, indexStr] = rowId.split('_');
    const index = parseInt(indexStr, 10);
  
    // Encontrar el grupo correspondiente
    const group = groupedVehicles[tipoVehiculo];
  
    // Verificar si el grupo y el índice son válidos
    if (group && !isNaN(index) && index >= 0 && index < group.length) {
      const selectedRow = group[index];
      setRowEdit(selectedRow);
      setOpenEdit(true);
    } else {
      console.error('Error al obtener la información del registro para editar');
    }
  };
  
  const handleEdit = (data, rowId) => {
    setOpenEdit(false);
    dispatch(updateVehicle(data, rowId));
  };

  /* const handleConfirmDelete = (rowId) => {
    const selectedRow = rows.find((row) => row.id === rowId);

    if (selectedRow) {
      setDeleteId(selectedRow.id);
      setOpenDelete(true);
    }
  }; */

  /* const handleDelete = () => {
    if (deleteId !== null) {
      dispatch(deleteVehicle(deleteId));
    }
    setOpenDelete(false);
  }; */

  const handleConfirmDeleteAll = (rowId) => {
    const selectedRow = rows.find((row) => row.id === rowId);
    setRowEdit(selectedRow);
    setOpenDeleteAll(true);
  };

  const handleDeleteAll = (data) => {
    try {
      setOpenDeleteAll(false);
      dispatch(deleteVehicleAll(data));
    } catch (error) {
      console.log(error);
    }
  };

  const actionsColumn = {
    field: "actions",
    headerName: "Acciones",
    width: 90,
    renderCell: (params) => {
      // Encuentra el role_id del usuario logueado
      const loggedInUserId = authUser.user.id;
      const userRole = userRoles.find(
        (role) => Number(role.user_id) === loggedInUserId
      );
      const userRoleId = userRole ? Number(userRole.role_id) : null;

      // Se define un array de role_id donde tiene permisos para editar o borrar
      const allowedEditRoles = [1];

      // Se comprueba si el usuario logueado tiene permiso para editar o borrar
      const autorized = allowedEditRoles.includes(userRoleId);

      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "95%",
          }}
        >
          {autorized && (
            <Tooltip title="Editar">
              <IconButton
                aria-label="Editar"
                style={{ color: "#0054b4" }}
                onClick={() => handleUpdate(params.id)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {/* {autorized && (
            <Tooltip title="Borrar">
              <IconButton
                aria-label="Borrar"
                style={{ color: "#dd000088" }}
                onClick={() => handleConfirmDelete(params.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )} */}
          {autorized && (
            <Tooltip title="Excluir Vehículo">
              <IconButton
                aria-label="Eliminar"
                style={{ color: "#dd0000" }}
                onClick={() => handleConfirmDeleteAll(params.id)}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      );
    },
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
    const vehiclesWithId = groupedVehicles[tipoVehiculo].map(
      (vehicle, index) => ({
        ...vehicle,
        id: `${tipoVehiculo}_${index}`,
      })
    );
    groupedRows.push({
      tipoVehiculo,
      vehicles: vehiclesWithId,
    });
  }

  const viewVehiclesOff = () => {
    navigate("/vehiculos-desvinculados");
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

  const toggleExpansion = (tipoVehiculo) => {
    setExpandedGroups((prevExpandedGroups) => ({
      ...prevExpandedGroups,
      [tipoVehiculo]: !prevExpandedGroups[tipoVehiculo],
    }));
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
      {isLoading ? (
        <Loader />
      ) : (
        <div className={style.container4}>
          {groupedRows.map((group, index) => (
            <div key={index}>
              <Grid item xs={2}>
                <Paper
                  elevation={3}
                  style={{ color: "#0080ca", marginTop: "3em" }}
                  className={style.paper}
                >
                  <div>
                    <span>{group.tipoVehiculo}</span>
                    <button
                      onClick={() => toggleExpansion(group.tipoVehiculo)}
                      style={{ marginLeft: "10px" }}
                    >
                      {expandedGroups[group.tipoVehiculo] ? (
                        <ExpandMoreIcon />
                      ) : (
                        <ExpandLessIcon />
                      )}
                    </button>
                  </div>
                </Paper>
              </Grid>
              {!expandedGroups[group.tipoVehiculo] && (
                <DataGrid
                  rows={group.vehicles}
                  columns={[...columns, actionsColumn]}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 25 },
                    },
                  }}
                  pageSizeOptions={[25, 50, 100]}
                  autoHeight
                  loading={group.vehicles.length === 0}
                  virtualization
                  localeText={
                    esES.components.MuiDataGrid.defaultProps.localeText
                  }
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
                  className={style.dataGrid}
                />
              )}
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
      )}
      <Toaster richColors position="top-right" />
      {/* Modal para eliminar un vehiculo */}
      {/*       <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
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
            className={style.buttonDelete}
            onClick={() => setOpenDelete(false)}
          >
            No
          </button>

          <button className={style.buttonClose} onClick={handleDelete}>
            Si
          </button>
        </DialogActions>
      </Dialog> */}

      {/* // Modal para registrar todas las polizas */}
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
            className={style.buttonDelete}
            onClick={() => setOpenRegisterPolizas(false)}
          >
            No
          </button>

          <button className={style.buttonClose} onClick={registerPolizas}>
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
      <ModalFormDeleted
        open={openDeleteAll}
        handleClose={() => setOpenDeleteAll(false)}
        handleDelete={handleDeleteAll}
        rowEdit={rowEdit}
      />
    </div>
  );
};

export default DataGridVehicles;
