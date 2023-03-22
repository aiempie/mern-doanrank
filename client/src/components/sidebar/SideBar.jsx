import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { GameContext } from "../../contexts/gameContext";
import { Button, CardMedia } from "@mui/material";
import { selectGameContext } from "../../contexts/selectGameContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { ExitToApp, Login } from "@mui/icons-material";

export default function TemporaryDrawer({ state, setState, toggleDrawer }) {
  //context
  const {
    gameState: { games },
    getGames,
  } = useContext(GameContext);
  const {
    authState: { isAuthenticated, user },
    logoutUser,
  } = useContext(AuthContext);

  const { setSelectGameState } = useContext(selectGameContext);

  //start: get list games
  useEffect(() => {
    getGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  const login = () => {
    navigate("/login");
  };

  const gotoClip = async (e) => {
    await setSelectGameState(e.slug);
    navigate(`/xem-clip-doan-rank/${e.slug}`);
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 260,
        background: "#607d8b",
        height: "100vh",
        color: "white",
        position: "relative",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <h3 className="ml-2 ">Xem clip đoán rank</h3>
        {games
          .filter((item) => item.isVideo === true && item.comingSoon === true)
          .map((item, index) => (
            <ListItem key={index} disablePadding onClick={() => gotoClip(item)}>
              <ListItemButton>
                <ListItemIcon>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 30,
                      height: 30,
                      objectFit: "cover",
                    }}
                    image={item.gameIcon}
                    alt={item.gameName}
                  ></CardMedia>
                </ListItemIcon>
                <ListItemText primary={item.gameName} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider />
      <List>
        <h3 className="ml-2 ">Dùng dữ kiện đoán tướng</h3>
        {games
          .filter(
            (item) => item.isDoanTenTuong === true && item.comingSoon === true
          )
          .map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 30,
                      height: 30,
                      objectFit: "cover",
                    }}
                    image={item.gameIcon}
                    alt={item.gameName}
                  ></CardMedia>
                </ListItemIcon>
                <ListItemText primary={item.gameName} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider />
      <div className="hello-user-sidebar">
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
      </div>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
