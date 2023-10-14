import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import ModalCreateValue from "../Modals/ModalValorPoliza/ModalCreateValue";
import ModalEdit from "../Modals/ModalEdit";
import {
  createValorPoliza,
  getValoresPolizas,
} from "../../redux/actions/actionsValues";
import { esES } from "@mui/x-data-grid";

const DataGridValues = ({ rows, columns }) => {
  /* const [rowEdit, setRowEdit] = useState(null); */
  const [openForm, setOpenForm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backFunction = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getValoresPolizas());
  }, [dispatch]);

  const handleOpen = () => {
    setOpenForm(true);
  };

  const handleCreate = async (data) => {
    setOpenForm(false);
    dispatch(createValorPoliza(data));
  };
  /*  const handleDelete = async (rowId) => {
    setOpenDelete(false);
    const deleteRow = data.find((row) => row.id === rowId);
    try {
      await axios.delete(
        `https://poliza.transargelia.com.co/public/api/cuota/${deleteRow}`
      );
      getCuotas();
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      alert(error);
    }
  }; */

  /*const handleConfirmDelete = (rowId) => {
     const deleteRow = data.find((row) => row.id === rowId);
    setRowEdit(deleteRow); 
    setOpenDelete(true);
  }; */

  /*  const handleUpdate = (rowId) => {
    const updatedRow = data.find((row) => row.id === rowId);
    setRowEdit(updatedRow);
    setOpenEdit(true);
  };

  const handleEdit = async (data) => {
    setOpenForm(false);
    await axios.put(
      `https://poliza.transargelia.com.co/public/api/cuota/${rowEdit.id}`,
      data
    );
    getCuotas();
  }; */

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
        <Tooltip title="Crear Valor de Poliza">
          <IconButton
            aria-label="Crear Valor de Poliza"
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
            marginBottom: "25px"
          }}
        />
      </div>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Eliminar Valor De Poliza</DialogTitle>
        <DialogContent>
          ¿Estás seguro de eliminar este valor de poliza?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} color="primary">
            No
          </Button>
          <Button /* onClick={handleDelete} */ color="error">Sí</Button>
        </DialogActions>
      </Dialog>
      <ModalCreateValue
        open={openForm}
        handleClose={() => setOpenForm(false)}
        handleCreate={handleCreate}
      />
      <ModalEdit
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        /* handleEdit={handleEdit}
          rowEdit={rowEdit} */
      />
    </div>
  );
};

export default DataGridValues;
