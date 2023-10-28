import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../NavBar/NavBar";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../redux/actions/actionsUsers";
import ModalCreateUser from "../Modals/ModalUsers/ModalEditUser";
import { esES } from "@mui/x-data-grid";
import { Toaster } from "sonner";
import style from "../TableVehicles/tablesVehicles.module.css";
import ModalEditUser from "../Modals/ModalUsers/ModalEditUser";

const DataGridUsers = ({ rows, columns }) => {
  const [rowEdit, setRowEdit] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backFunction = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleOpen = () => {
    setOpenForm(true);
  };

  const handleCreate = async (data) => {
    setOpenForm(false);
    dispatch(createUser(data));
  };

  const handleUpdate = (rowId) => {
    const selectedRow = rows.find((row) => row.id === rowId);
    setRowEdit(selectedRow);
    setOpenEdit(true);
  };

  const handleEdit = async (data, rowId) => {
    setOpenEdit(false);
    dispatch(updateUser(data, rowId));
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
      dispatch(deleteUser(deleteId));
    }
    setOpenDelete(false);
  };

  const CustomHeaderButton = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <GridToolbar showQuickFilter={true} />

        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
          <Tooltip title="Crear Usuario">
            <IconButton
              aria-label="Crear Usuario"
              onClick={handleOpen}
              color="primary"
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
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

  return (
    <div className={style.container1}>
      <NavBar />
      <div className={style.container2}>
        <ArrowBackIcon onClick={backFunction} style={{ cursor: "pointer" }} />
      </div>
      <div className={style.container4}>
        <Grid item xs={2}>
          <Paper
            elevation={3}
            style={{ color: "#0080ca" }}
            className={style.paper}
          >
            Lista de Usuarios
          </Paper>
        </Grid>
        <DataGrid
          rows={rows}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={[...columns, actionsColumn]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
          }}
          pageSizeOptions={[25, 50, 100]}
          loading={rows.length === 0}
          virtualization
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          components={{ Toolbar: CustomHeaderButton }}
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
          Eliminar Usuario
        </DialogTitle>
        <DialogContent style={{ fontStyle: "revert-layer", fontWeight: "400" }}>
          ¿Estás seguro de eliminar este usuario, esta acción es irreversible?
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
      <ModalCreateUser
        open={openForm}
        handleClose={() => setOpenForm(false)}
        handleCreate={handleCreate}
      />
      <ModalEditUser
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        handleEdit={handleEdit}
        rowEdit={rowEdit}
      />
    </div>
  );
};

export default DataGridUsers;
