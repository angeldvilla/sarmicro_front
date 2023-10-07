import { useState, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NavBar from "../NavBar/NavBar";
import Tooltip from "@mui/material/Tooltip";
import ModalCreate from "../Modales/ModalCreate";
const TablePayment = () => {
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
                /* onClick={() => handleEdit(tableMeta.rowData[0])} */
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
  const [data, setData] = useState([]);

  const options = {
    filterType: "checkbox",
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

  const [openForm, setOpenForm] = useState(false);

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

  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10%",
        }}
      >
        <MUIDataTable
          title={"Valores de Polizas"}
          data={data}
          columns={columns}
          options={{
            ...options,
            customToolbar: () => {
              return (
                <Tooltip title="Crear Valor de Poliza">
                  <IconButton
                    aria-label="Crear"
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
      </div>
    </div>
  );
};

export default TablePayment;
