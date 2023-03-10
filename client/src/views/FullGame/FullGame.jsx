import React, { useContext } from "react";
import { BounceLoader } from "react-spinners";
import GameCard from "../../components/GameItem/GameCard";
import { GameContext } from "../../contexts/gameContext";

function FullGame() {
  //context
  const {
    gameState: { games, gamesLoading },
  } = useContext(GameContext);

  let body = "";

  if (gamesLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <BounceLoader />
      </div>
    );
  } else if (games.length === 0) {
    body = <h1 className="d-flex justify-content-center mt-2">Is Comming</h1>;
  } else {
    body = (
      <div className="d-flex justify-content-center">
        <div className="d-flex justify-content-sp-ar align-content-sp-ar mt-2">
          {games.map((gameInfo) => (
            <GameCard key={gameInfo._id} gameInfo={gameInfo} />
          ))}
        </div>
      </div>
    );
  }
  return body;
}

export default FullGame;
