import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
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

const TableValues = () => {
  const data = useSelector((state) => state?.values?.valuesData);
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

  /* TABLE DESIGN */

  const modifiedData = data.map((row) => ({
    ...row,
    created_at:
      row.created_at === null ? (
        <span style={{ color: "red" }}>No hay fecha de creación</span>
      ) : (
        <span style={{ color: "green" }}>{row.created_at}</span>
      ),
      updated_at:
      row.updated_at === null ? (
        <span style={{ color: "red" }}>No hay fecha de creación</span>
      ) : (
        <span style={{ color: "green" }}>{row.updated_at}</span>
      ),
  }));

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
      customHeadRender: (columnMeta) => (
        <th>
          <div style={{ textTransform: "none" }}>{columnMeta.label}</div>
        </th>
      ),
    },
    {
      name: "tipo_poliza",
      label: "Tipo Poliza",
      options: {
        filter: true,
        sort: true,
      },
      customHeadRender: (columnMeta) => (
        <th>
          <div style={{ textTransform: "none" }}>{columnMeta.label}</div>
        </th>
      ),
    },
    {
      name: "vehiculo_grupo",
      label: "Grupo Vehiculo",
      options: {
        filter: true,
        sort: true,
      },
      customHeadRender: (columnMeta) => (
        <th>
          <div style={{ textTransform: "none" }}>{columnMeta.label}</div>
        </th>
      ),
    },
    {
      name: "valor_poliza",
      label: "Valor Poliza",
      options: {
        filter: true,
        sort: true,
      },
      customHeadRender: (columnMeta) => (
        <th>
          <div style={{ textTransform: "none" }}>{columnMeta.label}</div>
        </th>
      ),
    },
    {
      name: "cuota_inicial",
      label: "Cuota Inicial",
      options: {
        filter: true,
        sort: true,
      },
      customHeadRender: (columnMeta) => (
        <th>
          <div style={{ textTransform: "none" }}>{columnMeta.label}</div>
        </th>
      ),
    },
    {
      name: "created_at",
      label: "Fecha Creación",
      options: {
        filter: true,
        sort: true,
      },
      customHeadRender: (columnMeta) => (
        <th>
          <div style={{ textTransform: "none" }}>{columnMeta.label}</div>
        </th>
      ),
    },
    {
      name: "updated_at",
      label: "Fecha Actualización",
      options: {
        filter: true,
        sort: true,
      },
      customHeadRender: (columnMeta) => (
        <th>
          <div style={{ textTransform: "none" }}>{columnMeta.label}</div>
        </th>
      ),
    },
    {
      name: "Acciones",
      label: "Acciones",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          /* const rowId = tableMeta.rowData[0]; */
          return (
            <>
              <Tooltip title="Editar">
                <IconButton
                  aria-label="Editar"
                  style={{ color: "#0054b4" }}
                  /* onClick={() => handleUpdate(rowId)} */
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Borrar">
                <IconButton
                  aria-label="Borrar"
                  style={{ color: "#dd0000" }}
                  /* onClick={() => handleConfirmDelete(rowId)} */
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          );
        },
      },
      customHeadRender: (columnMeta) => (
        <th>
          <div style={{ textTransform: "none" }}>{columnMeta.label}</div>
        </th>
      ),
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: "none",
    search: true,
    download: false,
    print: false,
    pagination: true,
    viewColumns: false,
    textLabels: {
      body: {
        noMatch: "No se encontraron registros",
        toolTip: "Ordenar",
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver Columnas",
        filterTable: "Filtrar Tabla",
      },
    },
  };
  /* ----------------- */

  return (
    <>
      <NavBar />
      <div
        style={{
          alignSelf: "flex-start",
          position: "absolute",
          marginTop: 40,
          left: 50,
          right: 0,
        }}
      >
        <ArrowBackIcon onClick={backFunction} style={{ cursor: "pointer" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5%",
        }}
      >
        <MUIDataTable
          title={"Valores de Polizas"}
          data={modifiedData}
          columns={columns}
          options={{
            ...options,
            customToolbar: () => {
              return (
                <Tooltip title="Crear Valor de Poliza">
                  <IconButton
                    aria-label="Crear Valor de Poliza"
                    onClick={handleOpen}
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              );
            },
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 20],
          }}
        ></MUIDataTable>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "100%",
          marginTop: "100%",
          marginBottom: "100%",
        }}
      >
        <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
          <DialogTitle>Eliminar Valor De Poliza</DialogTitle>
          <DialogContent>
            ¿Estás seguro de eliminar este valor de poliza
            <span style={{ fontWeight: "bold" }}> {data.tipo_poliza} </span>?
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
    </>
  );
};

export default TableValues;
