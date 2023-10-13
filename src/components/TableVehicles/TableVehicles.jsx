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
import ModalCreate from "../Modals/ModalCreate";
import ModalEdit from "../Modals/ModalEdit";
import Box from "@mui/material/Box";
import { getVehiculos } from "../../redux/actions/actionsVehicles";

const TableVehicles = () => {
  const data = useSelector((state) => state?.vehicles?.vechiculosData);
  /* const [rowEdit, setRowEdit] = useState(null); */
  const [openForm, setOpenForm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const navigate = useNavigate();
  const backFunction = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehiculos());
  }, [dispatch]);

  const handleOpen = () => {
    setOpenForm(true);
  };

  const handleCreate = async (data) => {
    setOpenForm(false);
    /* dispatch(createVechicle(data)); */
  };

  /* TABLE DESIGN */
  const columns = [
    {
      name: "id_movil",
      label: "ID Movil",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "id_marca",
      label: "ID Marca",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "id_propietario",
      label: "Propietario",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "modelo",
      label: "Modelo",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "placa",
      label: "Monto Total",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "clase",
      label: "Clase",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "color",
      label: "Color",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "grupo",
      label: "Grupo",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "motor",
      label: "Motor",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "poliza",
      label: "Poliza",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "poliza_paz",
      label: "Poliza Paz",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "propio",
      label: "Propio",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "referencia",
      label: "Referencia",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "rtu_paz",
      label: "RTU Paz",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "segurida_social_paz",
      label: "Seguridad Social",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "serie",
      label: "Serie",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "tipo",
      label: "Tipo",
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
          const rowId = tableMeta.rowData[0];
          return (
            <>
              <Tooltip title="Crear Vehiculo">
                <IconButton
                  aria-label="Crear Vehiculo"
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
    <div>
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
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          height: "600px",
          width: "99%",
          overflow: "auto",
          marginTop: "2%",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            marginTop: "1%",
          }}
        >
          <MUIDataTable
            title={"Vehiculos"}
            data={data}
            columns={columns}
            options={{
              ...options,
              rowsPerPage: 5,
              rowsPerPageOptions: [10, 20, 50],
            }}
          ></MUIDataTable>
        </div>
      </Box>
      <div
      /* style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "100%",
          marginTop: "100%",
          marginBottom: "100%",
        }} */
      >
        <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
          <DialogTitle>Eliminar Vehiculo</DialogTitle>
          <DialogContent>
            ¿Estás seguro de eliminar este vehiculo
            <span style={{ fontWeight: "bold" }}> {data.clase} </span>?
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
          /* handleEdit={handleEdit} */
          /* rowEdit={rowEdit} */
        />
      </div>
    </div>
  );
};

export default TableVehicles;
