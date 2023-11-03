import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import MoneyOffCsredIcon from "@mui/icons-material/MoneyOffCsred";
import ArchiveIcon from "@mui/icons-material/Archive";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../NavBar/NavBar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ModalCash from "../Modals/ModalCash/ModalCash";
import ModalEgreso from "../Modals/ModalCash/ModalEgreso";
import ModalDiary from "../Modals/ModalCash/ModalDiary";
import { getPagos, createPago } from "../../redux/actions/actionsCashBox";
import { esES } from "@mui/x-data-grid";
import { Toaster, toast } from "sonner";

const DataGridCash = ({ rows, columns }) => {
  const [openForm, setOpenForm] = useState(false);
  const [openEgreso, setOpenEgreso] = useState(false);
  const [openDiary, setOpenDiary] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backFunction = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getPagos());
  }, [dispatch]);

  const handleOpen = () => {
    setOpenForm(true);
  };

  const handleOpenEgreso = () => {
    setOpenEgreso(true);
  };

  const handleOpenDiary = () => {
    setOpenDiary(true);
  };

  const handleCreateEgreso = (data) => {
    try {
      dispatch(createPago(data));
    } catch (error) {
      toast.error("Error al crear el egreso");
    }
  };

  const handleFecha = (date) => {
    const url = `https://poliza.transargelia.com.co/public/api/consulta-diaria/${date?.fecha}`
    window.open(url);
  }

  return (
    <div style={{ maxWidth: "100%", marginBottom: "20px" }}>
      <NavBar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 20,
          marginLeft: 20,
        }}
      >
        <ArrowBackIcon onClick={backFunction} style={{ cursor: "pointer" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "1.5em",
            gap: "1rem",
          }}
        >
          <button
            style={{
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#0098d4",
              color: "white",
              borderRadius: "8px",
              padding: "8px 20px",
              fontSize: "1em",
              marginRight: "1em",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
            onClick={handleOpenDiary}
          >
            Caja diaria
            <ArchiveIcon style={{ marginLeft: 10, fontSize: "large" }} />
          </button>

          <button
            style={{
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#d4a300",
              color: "white",
              borderRadius: "8px",
              padding: "8px 20px",
              fontSize: "1em",
              marginRight: "1em",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
            onClick={handleOpen}
          >
            Consultar
            <FindInPageIcon style={{ marginLeft: 10, fontSize: "large" }} />
          </button>

          <button
            style={{
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#d42a00",
              color: "white",
              borderRadius: "8px",
              padding: "8px 20px",
              fontSize: "1em",
              marginRight: "1em",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
            onClick={handleOpenEgreso}
          >
            Egresos
            <MoneyOffCsredIcon style={{ marginLeft: 10, fontSize: "large" }} />
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid item xs={2}>
          <Paper
            elevation={3}
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: "18px",
              marginBottom: "2%",
              marginTop: "16%",
              fontFamily: "sans-serif",
              fontStyle: "italic",
              fontWeight: "bold",
              color: "#0080ca",
              fontSize: "1.2em",
            }}
          >
            Movimiento de Caja
          </Paper>
        </Grid>

        <DataGrid
          rows={rows}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={[...columns]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 50 },
            },
          }}
          pageSizeOptions={[50, 100]}
          autoHeight
          loading={rows.length === 0}
          virtualization
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 250 },
            },
          }}
          style={{
            backgroundColor: "#ffffffcc",
            color: "black",
            marginTop: "2%",
            marginBottom: "5%",
            width: "95%",
          }}
        />
      </div>
      <Toaster position="top-right" richColors />
      <ModalCash
        open={openForm}
        handleClose={() => setOpenForm(false)}
        rows={rows}
      />
      <ModalEgreso
        open={openEgreso}
        handleClose={() => setOpenEgreso(false)}
        handleCreateEgreso={handleCreateEgreso}
      />
      <ModalDiary
        open={openDiary}
        handleClose={() => setOpenDiary(false)}
        handleFecha={handleFecha}
      />
    </div>
  );
};

export default DataGridCash;
