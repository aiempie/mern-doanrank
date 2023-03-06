export const AuthReducer = (state, acton) => {
  const { type, payload } = acton;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
      };
  }
};
