import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../NavBar/NavBar";
import Tooltip from "@mui/material/Tooltip";
import ModalCreatePago from "../Modals/ModalPagos/ModalCreatePago";
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

  const CustomHeaderButton = () => {
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
          <Tooltip title="Crear Pago">
            <IconButton
              aria-label="Crear Pago"
              onClick={handleOpen}
              color="primary"
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  };

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
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "98%",
          height: "500px",
          marginTop: 20,
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
          slots={{ toolbar: CustomHeaderButton }}
          style={{
            backgroundColor: "#ffffffcc",
            color: "black",
            marginTop: "20px",
            marginBottom: "25px",
          }}
        />
      </div>
      <ModalCreatePago
        open={openForm}
        handleClose={() => setOpenForm(false)}
        handleCreate={handleCreate}
      />
    </div>
  );
};

export default DataGridCash;
