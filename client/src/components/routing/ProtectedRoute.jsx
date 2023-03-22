import React from "react";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import ButtonAppBar from "../sidebar/NavBar";
import Footer from "../footer/Footer";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  let navigate = useNavigate();
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="item-center">
        <BounceLoader color="#36d7b7" />
      </div>
    );
  } else if (isAuthenticated) {
    return (
      <>
        <ButtonAppBar />
        <div style={{ marginTop: "65px" }} className="item-center">
          <Component {...rest} />
        </div>
        <Footer />
      </>
    );
  } else return navigate("/login");
};

export default ProtectedRoute;
