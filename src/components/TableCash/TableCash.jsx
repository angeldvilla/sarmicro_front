import React, { useEffect, useState } from "react";
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
import Typography from "@mui/material/Typography";
import ModalCreatePago from "../Modals/ModalPagos/ModalCreatePago";
import ModalEditPago from "../Modals/ModalPagos/ModalEditPago";
import {
  getPagos,
  createPago,
  updatePago,
  deletePago,
} from "../../redux/actions/actionsCashBox";
import { esES } from "@mui/x-data-grid";

const DataGridCash = ({ rows, columns }) => {
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
    dispatch(getPagos());
  }, [dispatch]);

  const handleOpen = () => {
    setOpenForm(true);
  };

  const handleCreate = async (data) => {
    setOpenForm(false);
    dispatch(createPago(data));
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
        <GridToolbar showQuickFilter="true" />
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
          <Tooltip title="Crear Pago">
            <IconButton
              aria-label="Crear Pago"
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

  const handleUpdate = (rowId) => {
    const selectedRow = rows.find((row) => row.id === rowId);
    setRowEdit(selectedRow);
    setOpenEdit(true);
  };

  const handleEdit = async (data, rowId) => {
    setOpenEdit(false);
    dispatch(updatePago(data, rowId));
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
      dispatch(deletePago(deleteId));
    }
    setOpenDelete(false);
  };

  const actionsColumn = {
    field: "actions",
    headerName: "Acciones",
    width: 130,
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
          slots={{ toolbar: CustomHeaderButton }}
          style={{
            backgroundColor: "#ffffffcc",
            color: "black",
            marginTop: "20px",
            marginBottom: "25px",
          }}
        />
      </div>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle
          style={{
            fontFamily: "sans-serif",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Eliminar Pago
        </DialogTitle>
        <DialogContent style={{ fontStyle: "revert-layer", fontWeight: "400" }}>
          ¿Estás seguro de eliminar este pago?
        </DialogContent>
        <DialogActions>
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
              padding: "8px 20px",
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
      <ModalCreatePago
        open={openForm}
        handleClose={() => setOpenForm(false)}
        handleCreate={handleCreate}
      />
      <ModalEditPago
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        handleEdit={handleEdit}
        rowEdit={rowEdit}
      />
    </div>
  );
};

export default DataGridCash;
