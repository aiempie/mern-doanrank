import { createContext, useReducer } from "react";
import axios from "axios";
import { apiUrl, FETCH_GAMES_FAIL, FETCH_GAMES_SUCCESS } from "../constans";
import { GameReducer } from "../reducers/gameReducer";

export const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  //state
  const [gameState, dispatch] = useReducer(GameReducer, {
    games: [],
    gamesLoading: true,
  });

  // get all games
  const getGames = async () => {
    try {
      const response = await axios.get(`${apiUrl}/games`);
      if (response.data.success) {
        dispatch({
          type: FETCH_GAMES_SUCCESS,
          payload: response.data.listGames,
        });
      }
      return response.data;
    } catch (error) {
      dispatch({
        type: FETCH_GAMES_FAIL,
      });
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  //find game
  const findGame = async (idGame) => {
    try {
      const response = await axios.get(`${apiUrl}/games/${idGame}`);
      return response.data.game;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  const gameContextData = { gameState, getGames, findGame };

  return (
    <GameContext.Provider value={gameContextData}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
