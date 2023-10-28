import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataGridUsers from "../../components/TableUsers/TableUsers";
import Switch from "@mui/material/Switch";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import style from "../Vehicles/vehicles.module.css";
import { updateUser } from "../../redux/actions/actionsUsers";

const Users = () => {
  const rows = useSelector((state) => state?.users?.usersData);
  const [scrollUp, setScrollUp] = useState(false);

  const handleScrollUp = () => {
    if (window.scrollY > 900) {
      setScrollUp(true);
    } else {
      setScrollUp(false);
    }
  };

  const scrollToUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollUp);
    return () => window.removeEventListener("scroll", handleScrollUp);
  }, []);

  const dispatch = useDispatch();

  const handleSwitchChange = useCallback(
    (event, rowId) => {
      const newState = event.target.checked ? "1" : "0";

      const updatedVehicle = {
        id: rowId,
        estado: newState,
      };

      dispatch(updateUser(updatedVehicle, rowId));
    },
    [dispatch]
  );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
    },
    {
      field: "name",
      headerName: "Nombre Completo",
      width: 250,
    },
    {
      field: "email",
      headerName: "Correo Electronico",
      width: 270,
    },
    {
      field: "cedula",
      headerName: "Cedula",
      width: 120,
    },
    {
      field: "telefono",
      headerName: "Telefono",
      width: 120,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 90,
      renderCell: (params) => (
        <Switch
          label={params}
          checked={params.value === "1"}
          color={params.value === "1" ? "success" : "error"}
          onChange={(event) => handleSwitchChange(event, params.row.id)}
        />
      ),
    },
  ];

  return (
    <>
      <DataGridUsers rows={rows} columns={columns} />
      {scrollUp && (
        <button
          onClick={scrollToUp}
          className={style.scrollUpButton}
          /* className="fixed bottom-2 right-6 text-white py-4 px-3 rounded-lg z-100 animate-fade-up animate-ease-out" */
        >
          <ArrowUpwardIcon className={style.arrowBack} />
        </button>
      )}
    </>
  );
};

export default Users;
