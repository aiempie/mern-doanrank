import { createContext, useReducer } from "react";
import axios from "axios";
import { apiUrl, LOCA_STORAGE_TOKEN_NAME } from "../constans";
import { AuthReducer } from "../reducers/authReducer";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCA_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }
      return response.data;
    } catch (error) {
      if (error.data) return error.data;
      else return { success: false, message: error.message };
    }
  };
  // context data
  const authContextData = { loginUser };

  // return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

//login

export default AuthContextProvider;
