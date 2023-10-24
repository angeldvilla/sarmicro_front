import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import sarmicroLogo from "../../assets/images/sarmicroLogo.png";
import { logoutUser } from "../../redux/actions/actionsAuth";
import { Toaster } from "sonner";
import style from "./navBar.module.css";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const NotLogged = useSelector((state) => state?.auth?.authUser);

  const handleLogout = () => {
    const unAuthenticated = {
      access_token: NotLogged.access_token,
      tipo_token: NotLogged.tipo_token,
    };
    dispatch(logoutUser(unAuthenticated, navigate));
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#055bdd" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to="/inicio">
            <Avatar
              alt="Logo Avatar"
              src={sarmicroLogo}
              style={{ width: "75px", height: "auto" }}
            />
          </NavLink>

          {/* PARTE RESPONSIVE */}
          <Box sx={{ marginLeft: "auto", display: { xs: "flex", md: "none" } }}>
            <div
              style={{
                marginLeft: "auto",
                display: { xs: "flex", md: "none" },
              }}
              className={style.scaleWelcome}
            >
              <h5>Sistema de Polizas Sarmicro</h5>
            </div>
          </Box>

          <Box sx={{ marginLeft: "auto", display: { xs: "flex", md: "none" } }}>
            <Tooltip title="Cerrar Sesión">
              <LogoutIcon
                style={{ fontSize: "large", cursor: "pointer" }}
                onClick={handleLogout}
              />
            </Tooltip>
            <Menu
              id="menu-appbar"
              sx={{ display: { xs: "block", md: "none" } }}
            ></Menu>
          </Box>
          {/* PARTE RESPONSIVE */}

          <Box
            sx={{
              marginLeft: "auto",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
          >
            <div
              style={{
                marginLeft: "auto",
                display: { xs: "flex", md: "none" },
              }}
              className={style.scaleWelcome}
            >
              <h1>Sistema de Polizas Sarmicro</h1>
            </div>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
          >
            <button className={style.botonLogout} onClick={handleLogout}>
              Cerrar Sesión
              <LogoutIcon style={{ marginLeft: 10, fontSize: "large" }} />
            </button>
            <Toaster position="top-right" richColors />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
