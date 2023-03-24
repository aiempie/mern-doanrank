import { createContext, useReducer } from "react";
import axios from "axios";
import { apiUrl, FETCH_CHAMP_FAIL, FETCH_CHAMP_SUCCESS } from "../constans";
import { ChampReducer } from "../reducers/championReducer";

export const ChampionContext = createContext();

const ChampionContextProvider = ({ children }) => {
  //state
  const [champState, dispatch] = useReducer(ChampReducer, {
    champions: [],
    champLoading: true,
  });

  // get all games
  const getChamps = async (game_id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/champion/getchampion/${game_id}`
      );
      if (response.data.success) {
        dispatch({
          type: FETCH_CHAMP_SUCCESS,
          payload: response.data.listChampion,
        });
      }
      return response.data;
    } catch (error) {
      dispatch({
        type: FETCH_CHAMP_FAIL,
      });
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  //find game
  const findChamp = async (idChamp) => {
    try {
      const response = await axios.get(
        `${apiUrl}/champion/getonechampion/${idChamp}`
      );
      return response.data.champion;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  const gameContextData = { champState, getChamps, findChamp };

  return (
    <ChampionContext.Provider value={gameContextData}>
      {children}
    </ChampionContext.Provider>
  );
};

export default ChampionContextProvider;
