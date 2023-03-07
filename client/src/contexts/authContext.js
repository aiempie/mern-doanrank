import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME, SET_AUTH } from "../constans";
import { AuthReducer } from "../reducers/authReducer";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: { username: null },
  });
  // authentication user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${apiUrl}/auth/`);
      if (response.data.success) {
        dispatch({
          type: SET_AUTH,
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: SET_AUTH,
        payload: { isAuthenticated: false, user: { username: null } },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  //login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }

      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message, loi: "client" };
    }
  };

  //register
  const registerUser = async (registerForm) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/register`,
        registerForm
      );
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message, loi: "client" };
    }
  };

  //logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: SET_AUTH,
      payload: { isAuthenticated: false, user: { username: null } },
    });
  };

  // context data
  const authContextData = {
    loginUser,
    authState,
    registerUser,
    loadUser,
    logoutUser,
  };

  // return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
