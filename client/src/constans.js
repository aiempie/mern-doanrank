export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5005/api/v1"
    : "deploy url";

export const LOCAL_STORAGE_TOKEN_NAME = "accessToken";
export const FETCH_GAMES_FAIL = "FETCH_GAMES_FAIL";
export const FETCH_GAMES_SUCCESS = "FETCH_GAMES_SUCCESS";
export const SET_AUTH = "SET_AUTH";
export const FETCH_CLIP_FAIL = "FETCH_GAMES_FAIL";
export const FETCH_CLIP_SUCCESS = "FETCH_GAMES_SUCCESS";
