import { useState } from "react";
import { createContext } from "react";

export const selectGameContext = createContext();

const SelectGameContextProvider = ({ children }) => {
  //state
  const [selectGameState, setSelectGameState] = useState();

  const SelectGameContextData = {
    selectGameState,
    setSelectGameState,
  };

  return (
    <selectGameContext.Provider value={SelectGameContextData}>
      {children}
    </selectGameContext.Provider>
  );
};

export default SelectGameContextProvider;
