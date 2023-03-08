import React from "react";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import ButtonAppBar from "../sidebar/NavBar";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  let navigate = useNavigate();
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <BounceLoader color="#36d7b7" />
      </div>
    );
  } else if (isAuthenticated) {
    return (
      <>
        <ButtonAppBar />
        <Component {...rest} />
      </>
    );
  } else return navigate("/login");
};

export default ProtectedRoute;
