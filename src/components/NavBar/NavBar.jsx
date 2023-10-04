import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PaidIcon from '@mui/icons-material/Paid';
import PolicyIcon from '@mui/icons-material/Policy';
/* import PaymentsIcon from '@mui/icons-material/Payments'; */
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import SavingsIcon from '@mui/icons-material/Savings';
import LogoutIcon from "@mui/icons-material/Logout";
import sarmicroLogo from "../../assets/images/sarmicroLogo.png";

const pages = ["Valor Poliza", "Pago Poliza", "Vehiculos", "Caja"];
const paths = ["valor-poliza", "pago-polizas", "vehiculos", "caja"];
const icons = [<PolicyIcon/>, <PaidIcon/>, <LocalTaxiIcon/>, <SavingsIcon/>];

const settings = ["Cerrar Sesión"];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <NavLink to={`/${paths[index]}`}>
                  <MenuItem key={page}>
                  <ListItemIcon>{icons[index]}</ListItemIcon>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <NavLink to={`/${paths[index]}`}>
                <Button
                  key={page}
                  sx={{ 
                    my: 3, 
                    color: "white", 
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                    marginLeft: 2
                  }}
                  >
                  {/* <ListItemIcon>{icons[index]}</ListItemIcon> */}
                  <ListItemIcon style={{ color: "rgb(202, 221, 92)" }}>{icons[index]}</ListItemIcon>
                  <span style={{marginRight: 55, alignItems: "center", textAlign: "center"}}>{page}</span>
                </Button>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Logo Avatar" src={sarmicroLogo} style={{width: "65px", height: "auto"}} />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleLogout}>
                  <Typography textAlign="center">
                    <LogoutIcon
                      style={{ marginRight: 5, fontSize: "medium" }}
                    />
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
