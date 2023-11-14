import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../NavBar/NavBar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { esES } from "@mui/x-data-grid";
import Loader from "../Loader/Loader";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import style from "../TableVehicles/tablesVehicles.module.css";
import styles from "../Buttons/styleButton.module.css";

const DataGridBalance = ({ rows, columns }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});

  const navigate = useNavigate();

  const backFunction = () => {
    navigate(-1);
  };

  const viewVehiclesOff = () => {
    navigate("/deudores-en-mora");
  };

  useEffect(() => {
    setIsLoading(false);
  }, [isLoading]);

  const groupedVehicles = {};

  // Se Agrupa los vehículos por tipo
  rows.forEach((row) => {
    if (!groupedVehicles[row.tipov]) {
      groupedVehicles[row.tipov] = [];
    }
    groupedVehicles[row.tipov].push(row);
  });

  const groupedRows = [];
  for (const tipoVehiculo in groupedVehicles) {
    groupedRows.push({
      tipoVehiculo,
      vehicles: groupedVehicles[tipoVehiculo],
    });
  }

  const toggleExpansion = (tipoVehiculo) => {
    setExpandedGroups((prevExpandedGroups) => ({
      ...prevExpandedGroups,
      [tipoVehiculo]: !prevExpandedGroups[tipoVehiculo],
    }));
  };

  return (
    <div className={style.container1}>
      <NavBar />
      <div className={style.container2}>
        <ArrowBackIcon onClick={backFunction} style={{ cursor: "pointer" }} />
        <div className={style.container3}>
          <button
            style={{
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#a80c0cec",
              color: "white",
              fontFamily: "Sans-serif",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 20px",
              fontSize: "0.90em",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
            className={styles.botonLogout}
            onClick={viewVehiclesOff}
          >
            Deudores en Mora <CreditCardOffIcon />
          </button>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={style.container4}>
          {groupedRows.map((group, index) => (
            <div key={index}>
              <Grid item xs={2}>
                <Paper
                  elevation={3}
                  style={{ color: "#0080ca", marginTop: "3em" }}
                  className={style.paper}
                >
                  <div>
                    <span>{group.tipoVehiculo}</span>
                    <button
                      onClick={() => toggleExpansion(group.tipoVehiculo)}
                      style={{ marginLeft: "10px" }}
                    >
                      {expandedGroups[group.tipoVehiculo] ? (
                        <ExpandMoreIcon />
                      ) : (
                        <ExpandLessIcon />
                      )}
                    </button>
                  </div>
                </Paper>
              </Grid>
              {!expandedGroups[group.tipoVehiculo] && (
                <DataGrid
                  rows={group.vehicles}
                  columns={columns}
                  getRowId={(row) => row.max_vehiculo_id}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 25 },
                    },
                  }}
                  pageSizeOptions={[25, 50, 100]}
                  autoHeight
                  loading={group.vehicles.length === 0}
                  virtualization
                  localeText={
                    esES.components.MuiDataGrid.defaultProps.localeText
                  }
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
                  className={style.dataGrid}
                />
              )}
              {index < groupedRows.length - 1 && (
                <Divider
                  style={{
                    borderColor: "#0080ca9e",
                    borderWidth: "2px",
                    margin: "20px 0",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataGridBalance;
