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
/* import DeleteIcon from "@mui/icons-material/Delete"; */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../NavBar/NavBar";
import Tooltip from "@mui/material/Tooltip";
import ModalCreate from "../Modals/ModalCreate";
import ModalEdit from "../Modals/ModalEdit";
import {
  createPoliza,
  /* deletePoliza, */
  getPolizas,
  updatePoliza,
} from "../../redux/actions/actionsPayments";
import { Toaster, toast } from "sonner";

const TablePayment = () => {
  const data = useSelector((state) => state?.payments?.polizasData);

  const [rowEdit, setRowEdit] = useState(null);
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

  const handleOpen = (rowId) => {
    const newPoliza = data.find((row) => row.id === rowId);
    setRowEdit(newPoliza);
    console.log(newPoliza);
    if (newPoliza.dias_cuota !== "" && newPoliza.numero_cuotas !== "0") {
      toast.error("Cuotas ya registradas");
      setOpenForm(false);
    } else {
      setOpenForm(true);
    }
  };

  const handleCreate = async (polizaData) => {
    setOpenForm(false);
    dispatch(createPoliza(polizaData));
  };

  const handleUpdate = (rowId) => {
    const updatedRow = data.find((row) => row.id === rowId);
    setRowEdit(updatedRow);
    setOpenEdit(true);
  };

  const handleEdit = async (data, rowId) => {
    setOpenEdit(false);
    dispatch(updatePoliza(data, rowId));
  };

  /*   const handleConfirmDelete = (rowId) => {
    const deleteRow = data.find((row) => row.id === rowId);
    setRowEdit(deleteRow);
    setOpenDelete(true);
  };

  const handleDelete = async (rowId) => {
    setOpenDelete(false);
    dispatch(deletePoliza(rowId));
  }; */

  /* TABLE DESIGN */
  const modifiedData = data.map((row) => ({
    ...row,
    numero_cuotas:
      row.numero_cuotas === "0" ? (
        <span style={{ color: "red" }}>0</span>
      ) : (
        row.numero_cuotas
      ),
    dias_cuota:
      row.dias_cuota === "" ? (
        <span style={{ color: "red" }}>Definir tipo de cuotas</span>
      ) : (
        row.dias_cuota
      ),
    estado:
      row.estado === "1" ? (
        <span style={{ color: "green" }}>Activo</span>
      ) : (
        <span style={{ color: "red" }}>Inactivo</span>
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
      name: "cedula",
      label: "Cedula Propietario",
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {columnMeta.label}
          </div>
        </th>
      ),
    },
    {
      name: "id_vehiculo",
      label: "ID Vehiculo",
      options: {
        filter: true,
        sort: true,
      },
      customHeadRender: (columnMeta) => (
        <th>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {columnMeta.label}
          </div>
        </th>
      ),
    },
    {
      name: "estado",
      label: "Estado",
      options: {
        filter: true,
        sort: true,
      },
      customHeadRender: (columnMeta) => (
        <th>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {columnMeta.label}
          </div>
        </th>
      ),
    },
    {
      name: "acciones",
      label: "Acciones",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowId = tableMeta.rowData[0];
          return (
            <>
              <Tooltip title="Crear Pago de Poliza">
                <IconButton
                  aria-label="Crear Pago de Poliza"
                  onClick={() => handleOpen(rowId)}
                  color="primary"
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Editar">
                <IconButton
                  aria-label="Editar"
                  style={{ color: "#0054b4" }}
                  onClick={() => handleUpdate(rowId)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>

              {/* <Tooltip title="Borrar">
                <IconButton
                  aria-label="Borrar"
                  style={{ color: "#dd0000" }}
                  onClick={() => handleConfirmDelete(rowId)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip> */}
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
          position: "relative",
          marginTop: 15,
          marginLeft: 20,
          right: 0,
        }}
      >
        <ArrowBackIcon onClick={backFunction} style={{ cursor: "pointer" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1%",
        }}
      >
        <MUIDataTable
          title={"Pagos de Polizas"}
          data={modifiedData}
          columns={columns}
          options={{
            ...options,
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 50, 100],
          }}
        ></MUIDataTable>
      </div>
      <Toaster richColors position="top-right" />
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
            ¿Estás seguro de eliminar este pago de poliza?
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
          rowEdit={rowEdit}
        />
        <ModalEdit
          open={openEdit}
          handleClose={() => setOpenEdit(false)}
          handleEdit={handleEdit}
          rowEdit={rowEdit}
        />
      </div>
    </>
  );
};

export default TablePayment;
