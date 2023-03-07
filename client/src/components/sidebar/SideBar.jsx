import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { GameContext } from "../../contexts/gameContext";
import { CardMedia } from "@mui/material";

export default function TemporaryDrawer({ state, setState, toggleDrawer }) {
  //context
  const {
    gameState: { games },
    getGames,
  } = useContext(GameContext);

  //start: get list games
  useEffect(() => {
    getGames();
  }, []);

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
        {games.map((item, index) => (
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
      <List>
        <h3 className="ml-2 ">Dùng dữ kiện đoán tướng</h3>
        {["Liên Minh", "Liên Quân", "Dota 2"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
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
