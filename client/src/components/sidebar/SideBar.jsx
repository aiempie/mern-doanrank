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
import { CardMedia } from "@mui/material";
import { selectGameContext } from "../../contexts/selectGameContext";
import { useNavigate } from "react-router-dom";

export default function TemporaryDrawer({ state, setState, toggleDrawer }) {
  //context
  const {
    gameState: { games },
    getGames,
  } = useContext(GameContext);

  const { setSelectGameState } = useContext(selectGameContext);

  //start: get list games
  useEffect(() => {
    getGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let navigate = useNavigate();

  const gotoClip = (e) => {
    setSelectGameState(e);
    navigate("/xem-clip-doan-rank");
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        background: "#607d8b",
        height: "100vh",
        color: "white",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <h3 className="ml-2 ">Xem clip đoán rank</h3>
        {games
          .filter((item) => item.isVideo === true)
          .map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              onClick={() => gotoClip(item._id)}
            >
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
          .filter((item) => item.isDoanTenTuong === true)
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
