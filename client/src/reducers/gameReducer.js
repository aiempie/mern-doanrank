import { FETCH_GAMES_FAIL, FETCH_GAMES_SUCCESS } from "../constans";

export const GameReducer = (state, acton) => {
  const { type, payload } = acton;

  switch (type) {
    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        games: payload,
        gamesLoading: false,
      };
    case FETCH_GAMES_FAIL:
      return {
        ...state,
        games: payload,
        gamesLoading: false,
      };
    default:
      return state;
  }
};
