import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import NavBar from "../NavBar/NavBar";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ModalEditVehicle from "../Modals/ModalVehicles/ModalEditVehicle";
import {
  getOffVehiculos,
  updateVehicle,
  deleteVehicle,
  registerDesvinculate,
} from "../../redux/actions/actionsVehicles";
import { esES } from "@mui/x-data-grid";
import { Toaster, toast } from "sonner";
import { utils, writeFileXLSX } from "xlsx";
import styleOffVehicles from "./tablesVehicles.module.css";
import Loader from "../Loader/Loader";

const DataGridOffVehicles = ({ rows, columns }) => {
  const [rowEdit, setRowEdit] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openRegisterDesvinculate, setOpenRegisterDesvinculate] =
    useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [idMovil, setIdMovil] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const authUser = useSelector((state) => state?.auth?.authUser);
  const userRoles = useSelector((state) => state?.users?.userRoles);

  const navigate = useNavigate();
  const backFunction = () => {
    navigate("/vehiculos");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffVehiculos());
    setIsLoading(false);
  }, [dispatch]);

  const handleUpdate = (rowId) => {
    const selectedRow = rows.find((row) => row.id === rowId);
    setRowEdit(selectedRow);
    setOpenEdit(true);
  };

  const handleEdit = (data, rowId) => {
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

  const handleConfirmRegisterDesvinculate = (rowId) => {
    const selectedRow = rows.find((row) => row.id_movil === rowId);

    if (selectedRow) {
      setIdMovil(selectedRow.id_movil);
      setOpenRegisterDesvinculate(true);
    }
  };
  const handleRegisterDesvinculate = () => {
    if (idMovil !== null) {
      dispatch(registerDesvinculate(idMovil));
    }
    setOpenRegisterDesvinculate(false);
  };

  const exportToExcel = () => {
    const wb = utils.book_new();

    // Agregar la hoja de cálculo al libro
    utils.book_append_sheet(
      wb,
      // Crear una hoja de cálculo y asignarle los datos
      utils.json_to_sheet(rows),
      "Vehiculos Desvinculados"
    );
    // Descargar el archivo Excel
    writeFileXLSX(wb, "Vehiculos-Desvinculados-Parque-Automotor.xlsx");
  };

  const downloadExcel = async () => {
    try {
      exportToExcel(rows);
    } catch (error) {
      toast.error("Error al descargar el archivo excel, intente de nuevo");
    }
  };

  const actionsColumn = {
    field: "actions",
    headerName: "Acciones",
    width: 120,
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
            <Tooltip title="Registrar">
              <IconButton
                aria-label="Registrar"
                style={{ color: "green" }}
                onClick={() =>
                  handleConfirmRegisterDesvinculate(params.row.id_movil)
                }
              >
                <ReplyAllIcon />
              </IconButton>
            </Tooltip>
        
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
          {autorized && (
            <Tooltip title="Borrar">
              <IconButton
                aria-label="Borrar"
                style={{ color: "#dd0000" }}
                onClick={() => handleConfirmDelete(params.id)}
              >
                <DeleteIcon />
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
    groupedRows.push({
      tipoVehiculo,
      vehicles: groupedVehicles[tipoVehiculo],
    });
  }

  return (
    <div className={styleOffVehicles.container1}>
      <NavBar />
      <div className={styleOffVehicles.container2}>
        <ArrowBackIcon onClick={backFunction} style={{ cursor: "pointer" }} />
        <div className={styleOffVehicles.container3}>
          <button
            className={styleOffVehicles.buttonDownload}
            onClick={downloadExcel}
          >
            Descargar Excel <DownloadIcon />
          </button>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styleOffVehicles.container4}>
          {groupedRows.map((group, index) => (
            <div key={index}>
              <Grid item xs={2}>
                <Paper
                  elevation={3}
                  style={{ color: "#0080ca" }}
                  className={styleOffVehicles.paper}
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
                autoHeight
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
                className={styleOffVehicles.dataGrid}
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
      )}
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
            className={styleOffVehicles.buttonDelete}
            onClick={() => setOpenDelete(false)}
          >
            No
          </button>

          <button
            className={styleOffVehicles.buttonClose}
            onClick={handleDelete}
          >
            Si
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openRegisterDesvinculate}
        onClose={() => setOpenRegisterDesvinculate(false)}
      >
        <DialogTitle
          style={{
            fontFamily: "sans-serif",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Vincular Vehiculo
        </DialogTitle>
        <DialogContent style={{ fontStyle: "revert-layer", fontWeight: "400" }}>
          ¿Estás seguro de vincular este vehiculo en el parque automotor y
          registarlo en las polizas?
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <button
            className={styleOffVehicles.buttonDelete}
            onClick={() => setOpenRegisterDesvinculate(false)}
          >
            No
          </button>

          <button
            className={styleOffVehicles.buttonClose}
            onClick={handleRegisterDesvinculate}
          >
            Si
          </button>
        </DialogActions>
      </Dialog>
      <ModalEditVehicle
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        handleEdit={handleEdit}
        rowEdit={rowEdit}
      />
    </div>
  );
};

export default DataGridOffVehicles;
