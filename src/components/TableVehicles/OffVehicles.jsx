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
  getExportDesvinculadosExcel,
} from "../../redux/actions/actionsVehicles";
import { esES } from "@mui/x-data-grid";
import { Toaster, toast } from "sonner";
import { utils, writeFileXLSX } from "xlsx";
import styleOffVehicles from "./tablesVehicles.module.css";

const DataGridOffVehicles = ({ rows, columns }) => {
  const [rowEdit, setRowEdit] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();
  const backFunction = () => {
    navigate("/vehiculos");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffVehiculos());
    dispatch(getExportDesvinculadosExcel());
  }, [dispatch]);

  const resultados = useSelector(
    (state) => state?.vehicles?.excelExportDesvinculados
  );

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

  const exportToExcel = () => {
    const wb = utils.book_new();

    // Agregar la hoja de cálculo al libro
    utils.book_append_sheet(
      wb,
      // Crear una hoja de cálculo y asignarle los datos
      utils.json_to_sheet(resultados),
      "Vehiculos Desvinculados"
    );
    // Descargar el archivo Excel
    writeFileXLSX(wb, "Vehiculos-Desvinculados-Parque-Automotor.xlsx");
  };

  const downloadExcel = async () => {
    try {
      exportToExcel(resultados);
    } catch (error) {
      toast.error("Error al descargar el archivo excel, intente de nuevo");
    }
  };

  const actionsColumn = {
    field: "actions",
    headerName: "Acciones",
    width: 80,
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
            className={styleOffVehicles.buttonClose}
            onClick={() => setOpenDelete(false)}
          >
            No
          </button>

          <button
            className={styleOffVehicles.buttonDelete}
            onClick={handleDelete}
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
