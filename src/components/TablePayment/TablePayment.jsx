import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../NavBar/NavBar";
import Tooltip from "@mui/material/Tooltip";
import ModalCreate from "../Modales/ModalCreate";
import ModalEdit from "../Modales/ModalEdit";

const TablePayment = () => {
  const [data, setData] = useState([]);
  const [rowEdit, setRowEdit] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const navigate = useNavigate();
  const backFunction = () => {
    navigate(-1);
  };

  const getPolizas = async () => {
    try {
      const response = await axios.get(
        "https://poliza.transargelia.com.co/public/api/poliza"
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    getPolizas();
  }, []);

  const handleOpen = () => {
    setOpenForm(true);
  };

  const handleCreate = async (data) => {
    setOpenForm(false);
    await axios.post(
      "https://poliza.transargelia.com.co/public/api/poliza",
      data
    );
    getPolizas();
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://poliza.transargelia.com.co/public/api/poliza/${id}`
      );
      getPolizas();
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

  const handleUpdate = (rowData) => {
    setRowEdit(rowData);
    setOpenEdit(true);
  };
  const handleEdit = async (data) => {
    setOpenForm(false);
    await axios.put(
      "https://poliza.transargelia.com.co/public/api/poliza",
      data
    );
    getPolizas();
  };

  /* TABLE DESIGN */
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "numero_poliza",
      label: "#Poliza",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "fecha_inicio",
      label: "Fecha Inicio",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "fecha_fin",
      label: "Fecha Fin",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "monto_total",
      label: "Monto Total",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "numero_cuotas",
      label: "# Cuotas",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "dias_cuota",
      label: "Tipo Cuotas",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cliente_id",
      label: "Nombre Cliente",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Acciones",
      label: "Acciones",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <IconButton
                aria-label="Editar"
                style={{ color: "#0054b4" }}
                onClick={() => handleUpdate(tableMeta.rowData)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Borrar"
                style={{ color: "#dd0000" }}
                onClick={() => handleDelete(tableMeta.rowData[0])}
              >
                <DeleteIcon />
              </IconButton>
            </>
          );
        },
      },
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
        <ModalCreate
          open={openForm}
          handleClose={() => setOpenForm(false)}
          handleCreate={handleCreate}
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
