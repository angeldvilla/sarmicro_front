import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
/* import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add"; */
import FindInPageIcon from "@mui/icons-material/FindInPage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../NavBar/NavBar";
/* import Tooltip from "@mui/material/Tooltip"; */
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ModalCash from "../Modals/ModalCash/ModalCash";
import { getPagos, createPago } from "../../redux/actions/actionsCashBox";
import { esES } from "@mui/x-data-grid";

const DataGridCash = ({ rows, columns }) => {
  const [openForm, setOpenForm] = useState(false);

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

  const handleCreate = async (data) => {
    setOpenForm(false);
    dispatch(createPago(data));
  };

  /* const CustomHeaderButton = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <GridToolbar showQuickFilter="true" />
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
          <Tooltip title="Consultar">
            <IconButton
              aria-label="Movimiento Caja"
              onClick={handleOpen}
              color="primary"
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }; */

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
          <Typography
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
            /* className={styles.botonLogout} */
            onClick={handleOpen}
          >
            Consultar
            <FindInPageIcon style={{ marginLeft: 10, fontSize: "large" }} />
          </Typography>
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "98%",
            /* height: "500px", */
            marginLeft: 15,
          }}
        >
          <DataGrid
            rows={rows}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            columns={[...columns]}
            /* initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]} */
            disableColumnSelector
            disableDensitySelector
            disableRowSelectionOnClick
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
              marginBottom: "25px",
            }}
          />
        </div>
      </div>
      <ModalCash
        open={openForm}
        handleClose={() => setOpenForm(false)}
        handleCreate={handleCreate}
      />
    </div>
  );
};

export default DataGridCash;
