import { useState, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import IconButton from "@mui/material/IconButton";
/* import Toolbar from "@mui/material/Toolbar"; */
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NavBar from "../NavBar/NavBar";
import Tooltip from "@mui/material/Tooltip";
const TablePayment = () => {
  /* TABLE DESIGN */
  const columns = [
    {
      name: "name",
      label: "Nombre",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phone",
      label: "Empresa",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "username",
      label: "Username",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "website",
      label: "Sitio Web",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Acciones",
      label: "ACCIONES",
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
                /* onClick={() => handleDelete(tableMeta.rowData[0])} */
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
        AddIcon: "Crear",
      },
    },
  };
  /* ----------------- */
  useEffect(() => {
    const getPolizas = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setData(response.data);
        return data;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    getPolizas();
  }, [data, setData]);
  return (
    <>
      <NavBar />
      {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        <MUIDataTable
          title={
            <>
              Valores de Polizas
              <Tooltip title="Crear Valor de Poliza">
                <IconButton
                  aria-label="Crear"
                  /* onClick={() => handleCreate()} */
                  color="primary"
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </>
          }
          data={data}
          columns={columns}
          options={options}
        ></MUIDataTable>
      {/* </div> */}
    </>
  );
};

export default TablePayment;
