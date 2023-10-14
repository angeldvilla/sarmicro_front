import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
/* import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button"; */
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../NavBar/NavBar";
import { getCuotas } from "../../redux/actions/actionsCuotas.js";
import { esES } from "@mui/x-data-grid";

const DataGridCuotas = ({ rows, columns }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCuotas());
  }, [dispatch]);

  const backFunction = () => {
    navigate(-1);
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
        <Tooltip title="Crear Valor de Poliza">
          <IconButton
            aria-label="Crear Valor de Poliza"
            /* onClick={() => handleOpen(params.id)} */
            color="primary"
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">
          <IconButton
            aria-label="Editar"
            style={{ color: "#0054b4" }}
            /* onClick={() => handleUpdate(params.id)} */
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Borrar">
          <IconButton
            aria-label="Borrar"
            style={{ color: "#dd0000" }}
            /* onClick={() => handleConfirmDelete(params.id)} */
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
            marginTop: "20px",
          }}
        />
      </div>

      {/* <CreateModalEmployee
        open={openEmployee}
        handleClose={() => setOpenEmployee(false)}
        handleSave={handleSaveEmployee}
      />
       <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Eliminar Usuario</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que quieres eliminar al usuario
          <span style={{ fontWeight: "bold" }}> {nameUser} </span>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Sí
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default DataGridCuotas;
