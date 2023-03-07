import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import styles from "./GameCard.module.css";

const GameCard = ({ gameInfo }) => {
  const { _id, gameName, gameImage, comingSoon } = gameInfo;

  return (
    <Card
      key={_id}
      sx={{
        backgroundColor: "#2d434f",
        margin: "10px",
        marginTop: "0",
      }}
    >
      <CardMedia
        className={comingSoon ? "" : styles.blur}
        component="img"
        height="200"
        width="180"
        sx={{
          width: 200,
          height: 200,
          objectFit: "cover",
        }}
        image={gameImage}
        alt={gameName}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="span"
          component="div"
          sx={{
            textAlign: "center",
            color: "white",
          }}
        >
          {comingSoon ? gameName : "Comming Soon"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GameCard;
