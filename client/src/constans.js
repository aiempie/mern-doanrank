export const apiUrl =
  process.env.REACT_APP_NODE_ENV !== "production"
    ? "http://localhost:5005/api/v1"
    : process.env.REACT_APP_API_URL;

export const LOCAL_STORAGE_TOKEN_NAME = "accessToken";
export const LOCAL_STORAGE_CLIP = "fetchClip";
export const FETCH_GAMES_FAIL = "FETCH_GAMES_FAIL";
export const FETCH_GAMES_SUCCESS = "FETCH_GAMES_SUCCESS";
export const SET_AUTH = "SET_AUTH";
export const FETCH_CLIP_FAIL = "FETCH_GAMES_FAIL";
export const FETCH_CLIP_SUCCESS = "FETCH_GAMES_SUCCESS";
export const FETCH_CHAMP_FAIL = "FETCH_CHAMP_FAIL";
export const FETCH_CHAMP_SUCCESS = "FETCH_CHAMP_SUCCESS";
