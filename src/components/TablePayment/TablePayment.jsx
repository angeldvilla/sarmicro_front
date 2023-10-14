import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../NavBar/NavBar";
import Tooltip from "@mui/material/Tooltip";
import ModalCreate from "../Modals/ModalPayments/ModalCreate";
import ModalEdit from "../Modals/ModalPayments/ModalEdit";
import {
  createPoliza,
  deletePoliza,
  getPolizas,
  updatePoliza,
} from "../../redux/actions/actionsPayments";
import { esES } from "@mui/x-data-grid";
import { Toaster, toast } from "sonner";

const DataGridPayments = ({ rows, columns }) => {
  const [rowEdit, setRowEdit] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backFunction = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getPolizas());
  }, [dispatch]);

  const handleOpen = (rowId) => {
    const selectedRow = rows.find((row) => row.id === rowId);

    if (selectedRow) {
      const { dias_cuota, numero_cuotas } = selectedRow;

      if (dias_cuota !== "" && numero_cuotas !== "0") {
        toast.error("Cuotas ya registradas");
      } else {
        setRowEdit(selectedRow);
        setOpenForm(true);
      }
    }
  };

  const handleCreate = async (polizaData) => {
    setOpenForm(false);
    dispatch(createPoliza(polizaData));
  };

  const handleUpdate = (rowId) => {
    const selectedRow = rows.find((row) => row.id === rowId);
    setRowEdit(selectedRow);
    setOpenEdit(true);
  };

  const handleEdit = async (data, rowId) => {
    setOpenEdit(false);
    dispatch(updatePoliza(data, rowId));
  };

  const handleConfirmDelete = (rowId) => {
    const selectedRow = rows.find((row) => row.id === rowId);
    console.log(selectedRow);

    if (selectedRow) {
      setDeleteId(selectedRow.id);
      setOpenDelete(true);
    }
  };

  const handleDelete = async (rowId) => {
    if (deleteId !== null) {
      dispatch(deletePoliza(deleteId));
    }
    setOpenDelete(false);
  };

  const actionsColumn = {
    field: "actions",
    headerName: "Acciones",
    width: 150,
    renderCell: (params) => (
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <Tooltip title="Crear Pago de Poliza">
          <IconButton
            aria-label="Crear Pago de Poliza"
            onClick={() => handleOpen(params.id)}
            color="primary"
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
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
    <div style={{ maxWidth: "100%", marginBottom: "20px" }}>
      <NavBar />
      <div
        style={{
          alignSelf: "flex-start",
          position: "relative",
          marginTop: 20,
          marginLeft: 20,
          right: 0,
        }}
      >
        <ArrowBackIcon onClick={backFunction} style={{ cursor: "pointer" }} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DataGrid
          rows={rows}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={[...columns, actionsColumn]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          style={{
            backgroundColor: "#ffffffcc",
            color: "black",
            marginTop: "10px",
            marginBottom: "25px",
          }}
        />
      </div>
      <Toaster richColors position="top-right" />
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Eliminar Pago De Poliza</DialogTitle>
        <DialogContent>
          ¿Estás seguro de eliminar este pago de poliza?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="error">
            Sí
          </Button>
        </DialogActions>
      </Dialog>
      <ModalCreate
        open={openForm}
        handleClose={() => setOpenForm(false)}
        handleCreate={handleCreate}
        rowEdit={rowEdit}
      />
      <ModalEdit
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        handleEdit={handleEdit}
        rowEdit={rowEdit}
      />
    </div>
  );
};

export default DataGridPayments;
