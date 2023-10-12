import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import ModalCreate from "../Modales/ModalCreate";
import ModalEdit from "../Modales/ModalEdit";
import { createPoliza, getPolizas } from "../../redux/actions/actionsPayments";

const TablePayment = () => {
  const data = useSelector((state) => state?.payments?.polizasData);

  /* const [rowEdit, setRowEdit] = useState(null); */
  const [openForm, setOpenForm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backFunction = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getPolizas());
  }, [dispatch]);

  const handleOpen = () => {
    setOpenForm(true);
  };

  const handleCreate = async (polizaData) => {
    setOpenForm(false);
    dispatch(createPoliza(polizaData));
  };

  /* const handleDelete = async (rowId) => {
    setOpenDelete(false);
    const deleteRow = data.find((row) => row.id === rowId);
    try {
      await axios.delete(
        `https://poliza.transargelia.com.co/public/api/poliza/${deleteRow}`
      );
      getPolizas();
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      alert(error);
    }
  }; */

  /*  const handleConfirmDelete = (rowId) => {
       const deleteRow = data.find((row) => row.id === rowId);
    setRowEdit(deleteRow); 
    setOpenDelete(true);
  };*/

  /*   const handleUpdate = (rowId) => {
    const updatedRow = data.find((row) => row.id === rowId);
    setRowEdit(updatedRow);
    setOpenEdit(true);
  }; */

  /* const handleEdit = async (data) => {
    setOpenForm(false);
    await axios.put(
      `https://poliza.transargelia.com.co/public/api/poliza/${rowEdit.id}`,
      data
    );
    getPolizas();
  }; */

  /* TABLE DESIGN */
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
      name: "numero_poliza",
      label: "#Poliza",
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
      name: "fecha_inicio",
      label: "Fecha Inicio",
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
      name: "fecha_fin",
      label: "Fecha Fin",
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
      name: "monto_total",
      label: "Monto Total",
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
      name: "numero_cuotas",
      label: "# Cuotas",
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
      name: "dias_cuota",
      label: "Tipo Cuotas",
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
      name: "cliente_id",
      label: "Nombre Cliente",
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
              <IconButton
                aria-label="Editar"
                style={{ color: "#0054b4" }}
                /* onClick={() => handleUpdate(rowId)} */
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Borrar"
                style={{ color: "#dd0000" }}
                /* onClick={() => handleConfirmDelete(rowId)} */
              >
                <DeleteIcon />
              </IconButton>
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
          title={"Pagos de Polizas"}
          data={data}
          columns={columns}
          options={{
            ...options,
            customToolbar: () => {
              return (
                <Tooltip title="Crear Pago de Poliza">
                  <IconButton
                    aria-label="Crear Pago de Poliza"
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
          <DialogTitle>Eliminar Pago De Poliza</DialogTitle>
          <DialogContent>
            ¿Estás seguro de eliminar este pago de poliza
            <span style={{ fontWeight: "bold" }}> {data.numero_poliza} </span>?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDelete(false)} color="primary">
              No
            </Button>
            <Button /* onClick={handleDelete} */ color="error">Sí</Button>
          </DialogActions>
        </Dialog>
        <ModalCreate
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

export default TablePayment;
