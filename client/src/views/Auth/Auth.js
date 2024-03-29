import { useContext } from "react";
import Login from "../../components/Login/Login";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import Register from "../../components/Login/Register";

const Auth = (props) => {
  let body;
  let navigate = useNavigate();
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <BounceLoader />
      </div>
    );
  } else if (isAuthenticated) {
    return navigate("/games");
  } else {
    body = (
      <div className="content d-flex justify-content-center align-items-center">
        {props.isRegisterForm ? <Register /> : <Login />}
      </div>
    );
  }
  return <>{body}</>;
};

export default Auth;
