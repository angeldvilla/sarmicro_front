import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import PaidIcon from "@mui/icons-material/Paid";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../NavBar/NavBar";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ModalEditCuota from "../Modals/ModalCuotas/ModalEditCuota";
import {
  getCuotas,
  createCuota,
  updateCuota,
  deleteCuota,
} from "../../redux/actions/actionsCuotas.js";
import { esES } from "@mui/x-data-grid";
import { Toaster, toast } from "sonner";

const DataGridCuotas = ({ rows, columns }) => {
  const [rowEdit, setRowEdit] = useState(null);
  const [openPaid, setOpenPaid] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const authUser = useSelector((state) => state?.auth?.authUser);
  const userRoles = useSelector((state) => state?.users?.userRoles);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backFunction = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getCuotas());
  }, [dispatch]);

  const handleConfirmPaid = (rowId) => {
    const selectedRow = rows.find((row) => row.id === rowId);

    const newValueCuota = {
      ...selectedRow,
      cuota_id: selectedRow.id,
      pagada: "1",
      estado: "1",
    };

    if (selectedRow) {
      const { estado, pagada } = selectedRow;

      if (estado === "1" && pagada === "1") {
        toast.error("Esta cuota ya fue registrada");
      } else {
        setRowEdit(newValueCuota);
        setOpenPaid(true);
      }
    }
  };

  const handleCreate = async (data, rowId) => {
    const url = "https://poliza.transargelia.com.co/public/api/recibos/cuotas/";
    const selectedRow = rows.find((row) => row.id === rowId);
    setOpenPaid(false);
    try {
      await dispatch(createCuota(data));
      window.open(`${url}${selectedRow.id}`, "_blank");
    } catch (error) {
      toast.error("Error al crear el pago de la cuota, intente de nuevo");
    }
  };

  const handleUpdate = (rowId) => {
    const selectedRow = rows.find((row) => row.id === rowId);
    setRowEdit(selectedRow);
    setOpenEdit(true);
  };

  const handleEdit = async (data, rowId) => {
    setOpenEdit(false);
    dispatch(updateCuota(data, rowId));
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
      dispatch(deleteCuota(deleteId));
    }
    setOpenDelete(false);
  };

  const handlePrint = (rowId) => {
    const url = "https://poliza.transargelia.com.co/public/api/recibos/cuotas/";
    const selectedRow = rows.find((row) => row.id === rowId);

    if (selectedRow.estado === "1" && selectedRow.pagada === "1") {
      window.open(`${url}${selectedRow.id}`, "_blank");
    } else {
      toast.error("Hacer el registro de la cuota para imprimir");
    }
  };

  const actionsColumn = {
    field: "actions",
    headerName: "Acciones",
    width: 160,
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
          <Tooltip title="Pagar Cuota">
            <IconButton
              aria-label="Pagar Cuota"
              onClick={() => handleConfirmPaid(params.id)}
              color="success"
            >
              <PaidIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Imprimir Cuota">
            <IconButton
              aria-label="Imprimir Cuota"
              onClick={() => handlePrint(params.id)}
              color="warning"
            >
              <PrintIcon />
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

  return (
    <div style={{ maxWidth: "100%", marginBottom: "20px" }}>
      <NavBar />
      <div
        style={{
          alignSelf: "flex-start",
          position: "relative",
          marginTop: 20,
          marginLeft: 20,
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
        <Grid item xs={2}>
          <Paper
            elevation={3}
            style={{
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
            Lista de Cuotas
          </Paper>
        </Grid>

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
          autoHeight
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
            marginTop: "2%",
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
          Eliminar Cuota
        </DialogTitle>
        <DialogContent style={{ fontStyle: "revert-layer", fontWeight: "400" }}>
          ¿Estás seguro de eliminar esta cuota?
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
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
            color="primary"
            onClick={() => setOpenDelete(false)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(187, 12, 0, 0.938)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(197, 31, 19, 0.938)")
            }
          >
            No
          </Typography>

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
            color="error"
            onClick={handleDelete}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(2, 59, 182, 0.938)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(19, 75, 197, 0.938)")
            }
          >
            Si
          </Typography>
        </DialogActions>
      </Dialog>
      <Dialog open={openPaid} onClose={() => setOpenPaid(false)}>
        <DialogTitle
          style={{
            fontFamily: "sans-serif",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Pagar Cuota
        </DialogTitle>
        <DialogContent style={{ fontStyle: "revert-layer", fontWeight: "400" }}>
          ¿Estás seguro de registrar el pago de esta cuota?
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
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
            color="primary"
            onClick={() => setOpenPaid(false)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(187, 12, 0, 0.938)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(197, 31, 19, 0.938)")
            }
          >
            No
          </Typography>
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
            color="error"
            onClick={() => handleCreate(rowEdit, rowEdit.id)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(2, 59, 182, 0.938)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(19, 75, 197, 0.938)")
            }
          >
            Si
          </Typography>
        </DialogActions>
      </Dialog>
      <ModalEditCuota
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        handleEdit={handleEdit}
        rowEdit={rowEdit}
      />
    </div>
  );
};

export default DataGridCuotas;
