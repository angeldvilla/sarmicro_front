import React, { useEffect, useState } from "react";
/* import { useNavigate } from "react-router-dom"; */
import { useDispatch } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import PrintIcon from "@mui/icons-material/Print";
/*import ArrowBackIcon from "@mui/icons-material/ArrowBack"; */
/* import NavBar from "../NavBar/NavBar"; */
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ModalCreate from "../Modals/ModalPayments/ModalCreate";
import ModalEdit from "../Modals/ModalPayments/ModalEdit";
import DetailsPayments from "../Details/DetailsPayments/DetailsPayments";
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
  const [openDetail, setOpenDetail] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const dispatch = useDispatch();
  /*   const navigate = useNavigate();
  const backFunction = () => {
    navigate(-1);
  }; */

  useEffect(() => {
    dispatch(getPolizas());
  }, [dispatch]);

  const handleOpen = (rowId) => {
    const selectedRow = rows.find((row) => row.id === rowId);

    if (selectedRow) {
      const { estado } = selectedRow;

      if (estado === "1") {
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

  const handleSeeDetail = (rowId) => {
    const selectedRow = rows.find((row) => row.id === rowId);
    setViewDetail(selectedRow);
    setOpenDetail(true);
  };

  const handlePrint = (rowId) => {
    const url =
      "https://poliza.transargelia.com.co/public/api/recibos/cuotasInicial/";
    const selectedRow = rows.find((row) => row.id === rowId);
    if (selectedRow.estado === "1") {
      window.open(`${url}${selectedRow.id}`, "_blank");
    } else {
      toast.error("Haga el registro de la cuota para imprimir");
    }
  };

  const actionsColumn = {
    field: "actions",
    headerName: "Acciones",
    width: 189,
    renderCell: (params) => (
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "95%",
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
        <Tooltip title="Imprimir">
          <IconButton
            aria-label="Imprimir"
            onClick={() => handlePrint(params.id)}
            color="warning"
          >
            <PrintIcon />
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
        <Tooltip title="Detalle">
          <IconButton
            aria-label="Detalle"
            style={{ color: "rgba(41, 41, 41, 0.966)" }}
            onClick={() => handleSeeDetail(params.id)}
          >
            {/* rgba(209, 188, 3, 0.966) */}
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </div>
    ),
  };

  return (
    <div style={{ maxWidth: "100%", marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid item xs={2}>
          <Paper
            elevation={3}
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: "18px",
              marginBottom: "20px",
              marginTop: "20px",
              fontFamily: "sans-serif",
              fontStyle: "italic",
              fontWeight: "bold",
              color: "#0080ca",
              fontSize: "1.2em",
            }}
          >
            Lista de Pagos Polizas
          </Paper>
        </Grid>

        <DataGrid
          rows={rows}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={[...columns, actionsColumn]}
          /* initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]} */
          loading={rows.length === 0}
          virtualization
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
          style={{
            backgroundColor: "#ffffffcc",
            color: "black",
            marginTop: "10px",
            marginBottom: "5%",
            width: "95%",
          }}
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
          Eliminar Pago De Poliza
        </DialogTitle>
        <DialogContent style={{ fontStyle: "revert-layer", fontWeight: "400" }}>
          ¿Estás seguro de eliminar este pago de poliza?
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
      <DetailsPayments
        openDetail={openDetail}
        closeDetail={() => setOpenDetail(false)}
        rowEdit={viewDetail}
      />
    </div>
  );
};

export default DataGridPayments;
