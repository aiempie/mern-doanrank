import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Login, ExitToApp } from "@mui/icons-material";
import TemporaryDrawer from "./SideBar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export default function ButtonAppBar() {
  let navigate = useNavigate();
  const {
    authState: { isAuthenticated, user },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => {
    logoutUser();
    navigate("/");
  };
  const login = () => {
    navigate("/login");
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isAuthenticated ? (
            <>
              <span>Hello {user.username}</span>
              <Button color="inherit" onClick={logout}>
                <ExitToApp />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={login}>
              <Login />
              <span>Login</span>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <TemporaryDrawer
        state={state}
        setState={setState}
        toggleDrawer={toggleDrawer}
      />
    </Box>
  );
}
