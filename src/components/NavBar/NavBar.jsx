import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import sarmicroLogo from "../../assets/images/sarmicroLogo.png";
import { logoutUser } from "../../redux/actions/actionsAuth";
import { Toaster } from "sonner";
import style from "./navBar.module.css";

function NavBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogged = useSelector((state) => state?.auth?.authUser);

  const handleLogout = () => {
    const unAuthenticated = {
      access_token: userLogged.access_token,
      tipo_token: userLogged.tipo_token,
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
              <h5>Gestión de Valores de Polizas - TA, TC y TE</h5>
            </div>
          </Box>

          <Box sx={{ marginLeft: "auto", display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={userLogged?.user?.name}
                src={userLogged?.user?.name}
              />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <button onClick={handleLogout} style={{ color: "red" }}>
                  Cerrar Sesión
                  <LogoutIcon
                    style={{ marginLeft: 10, fontSize: "large", color: "red" }}
                  />
                </button>
              </MenuItem>
            </Menu>
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
              <h1>Gestión de Valores de Polizas - TA, TC y TE</h1>
            </div>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {userLogged && (
                <h6
                  style={{
                    marginRight: 5,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {userLogged.user.name}
                </h6>
              )}
            </Box>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={userLogged?.user?.name}
                src={userLogged?.user?.name}
              />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <button onClick={handleLogout} style={{ color: "red" }}>
                  Cerrar Sesión
                  <LogoutIcon
                    style={{ marginLeft: 10, fontSize: "large", color: "red" }}
                  />
                </button>
              </MenuItem>
            </Menu>
          </Box>
          <Toaster position="top-right" richColors />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
