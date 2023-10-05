import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import sarmicroLogo from "../../assets/images/sarmicroLogo.png";

function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            alt="Logo Avatar"
            src={sarmicroLogo}
            style={{ width: "75px", height: "auto" }}
          />

          <Box sx={{ marginLeft: "auto", display: { xs: "flex", md: "none" } }}>
            <Tooltip title="Cerrar Sesión">
              <LogoutIcon
                style={{ fontSize: "large" }}
                onClick={handleLogout}
              />
            </Tooltip>
            <Menu
              id="menu-appbar"
              sx={{ display: { xs: "block", md: "none" } }}
            ></Menu>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
          >
            <Typography
              style={{
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "black",
              }}
              onClick={handleLogout}
            >
              Cerrar Sesión
              <LogoutIcon style={{ marginLeft: 10, fontSize: "large" }} />
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
