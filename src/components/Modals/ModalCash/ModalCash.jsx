import React /* , { useEffect }  */ from "react";
import { /* useDispatch, */ useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
/* import Button from "@mui/material/Button"; */
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { esES } from "@mui/x-data-grid";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DataGridFrom = ({ open, handleClose, handleCreate }) => {
  /* const dispatch = useDispatch(); */

  /* const backFunction = () => {
    navigate(-1);
  }; */

  /* useEffect(() => {
    dispatch(getDetailsPolicys());
  }, [dispatch]); */

  const rows = useSelector((state) => state?.cash?.pagosData);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 120,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 120,
    },
    {
      field: "recibo",
      headerName: "Recibo",
      width: 150,
    },
    {
      field: "concepto",
      headerName: "Concepto",
      width: 150,
    },
    {
      field: "movil",
      headerName: "Movil",
      width: 120,
    },
    {
      field: "ingresos",
      headerName: "Ingresos",
      width: 120,
    },
    {
      field: "egresos",
      headerName: "Egresos",
      width: 150,
    },
    {
      field: "saldo",
      headerName: "Saldo",
      width: 120,
    },
    {
      field: "dias_cuota",
      headerName: "Dias Cuotas",
      width: 120,
    },
    {
      field: "clase",
      headerName: "Clase Vehículo",
      width: 120,
    },
    {
      field: "grupo",
      headerName: "Grupo",
      width: 120,
    },
    {
      field: "modelo",
      headerName: "Modelo",
      width: 120,
    },
  ];

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              style={{
                backgroundColor: "rgba(94, 94, 94, 0.144)",
                color: "white",
              }}
              onClick={handleClose}
              aria-label="close"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(187, 12, 0, 0.938)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(94, 94, 94, 0.144)")
              }
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, textAlign: "center" }}
              variant="h6"
              component="div"
            >
              Cuadre de Caja de Seguros
            </Typography>
            {/*      <Button
              style={{
                backgroundColor: "rgba(0, 148, 7, 0.795)",
                color: "white",
                borderRadius: "8px",
              }}
              autoFocus
              onClick={handleCreatePago}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(0, 173, 9, 0.753)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(0, 148, 7, 0.795)")
              }
            >
              Guardar
            </Button> */}
          </Toolbar>
        </AppBar>
        <div style={{ maxWidth: "100%", marginBottom: "20px" }}>
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
              columns={columns}
              /* initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]} */
              disableColumnSelector
              disableDensitySelector
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: "true",
                },
              }}
              style={{
                backgroundColor: "#ffffffcc",
                color: "black",
                marginTop: "20px",
                marginBottom: "25px",
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DataGridFrom;
