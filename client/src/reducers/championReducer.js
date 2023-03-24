import { FETCH_CHAMP_FAIL, FETCH_CHAMP_SUCCESS } from "../constans";

export const ChampReducer = (state, acton) => {
  const { type, payload } = acton;

  switch (type) {
    case FETCH_CHAMP_SUCCESS:
      return {
        ...state,
        champions: payload,
        champLoading: false,
      };
    case FETCH_CHAMP_FAIL:
      return {
        ...state,
        champions: [],
        champLoading: false,
      };
    default:
      return state;
  }
};
