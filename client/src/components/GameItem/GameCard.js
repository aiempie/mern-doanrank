import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./GameCard.module.css";

const GameCard = ({ gameInfo }) => {
  const { _id, gameName, gameImage, comingSoon, slug } = gameInfo;
  // router
  let navigate = useNavigate();

  const handClickCard = () => {
    navigate(`/games/${slug}`);
  };

  return (
    <Card
      className="card-hover"
      key={_id}
      sx={{
        backgroundColor: "#2d434f",
        margin: "10px",
        marginTop: "0",
        cursor: "pointer",
      }}
      onClick={comingSoon ? handClickCard : undefined}
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
          className="hover-red"
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
