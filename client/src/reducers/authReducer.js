import { SET_AUTH } from "../constans";

export const AuthReducer = (state, acton) => {
  const {
    type,
    payload: { isAuthenticated, user },
  } = acton;

  switch (type) {
    case SET_AUTH:
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
      };

    default:
      return state;
  }
};
