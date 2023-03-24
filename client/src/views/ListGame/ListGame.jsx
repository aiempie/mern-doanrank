import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GameContext } from "../../contexts/gameContext";
import styles from "./ListGame.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

function ListGame() {
  // router
  let navigate = useNavigate();

  const { findGame } = useContext(GameContext);
  const [game, setGame] = useState({
    gameName: "",
  });
  const location = useLocation().pathname.split("/")[2];

  useEffect(() => {
    findGame(location)
      .then((data) => {
        setGame(data);
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handClickCard = (e) => {
    navigate(`/games/${e}/${location}`);
  };
  return (
    <div className="item-center">
      <div className={styles.menu}>
        <h3 className={styles.title}>
          Sẵn sàng thể hiện hiểu biết của bạn với <br />
          <span>{game.gameName}</span> chưa?
        </h3>
        <div className={styles.listGame}>
          <List sx={{ width: "100%", maxWidth: 370 }}>
            {game.isVideo ? (
              <ListItem
                className={styles.listGameItem}
                onClick={() => handClickCard("xem-clip-doan-rank")}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: "#2d2d2d75",
                      border: "3px solid #c1bd0c",
                      borderRadius: "50%",
                    }}
                  >
                    <PlayCircleIcon sx={{ color: "#ff0" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Xem clip"
                  secondary="Đoán mức rank của người chơi trong clip"
                  sx={{
                    color: "#fff",
                    "& .MuiListItemText-secondary": {
                      color: "#fff",
                      fontSize: "13px",
                    },
                  }}
                />
              </ListItem>
            ) : undefined}
            {game.isDoanTenTuong ? (
              <ListItem
                className={styles.listGameItem}
                onClick={() => handClickCard("classic")}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: "#2d2d2d75",
                      border: "3px solid #c1bd0c",
                      borderRadius: "50%",
                    }}
                  >
                    <QuestionMarkIcon sx={{ color: "#ff0" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Đoán tướng"
                  secondary="Dựa vào dữ kiện đưa ra để đoán tên vị tướng"
                  sx={{
                    color: "#fff",
                    "& .MuiListItemText-secondary": {
                      color: "#fff",
                      fontSize: "13px",
                    },
                  }}
                />
              </ListItem>
            ) : undefined}
          </List>
        </div>
      </div>
    </div>
  );
}

export default ListGame;
