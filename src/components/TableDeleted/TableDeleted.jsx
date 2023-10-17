import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../NavBar/NavBar";
import { getDetailsPolicys } from "../../redux/actions/actionsDetails";
import { esES } from "@mui/x-data-grid";

const DataGridDetailsPolicys = ({ rows, columns }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backFunction = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getDetailsPolicys());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: "100%", marginBottom: "20px" }}>
      <NavBar />
      <div
        style={{
          alignSelf: "flex-start",
          position: "relative",
          marginTop: 20,
          marginLeft: 20,
          right: 0,
        }}
      >
        <ArrowBackIcon onClick={backFunction} style={{ cursor: "pointer" }} />
      </div>
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
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
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
  );
};

export default DataGridDetailsPolicys;
