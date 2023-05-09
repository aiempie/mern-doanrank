import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import "./Login.css";
import { AuthContext } from "../../contexts/authContext";
import AlertMessage from "../layout/AlertMessage";
import fav from "../../assets/imgs/favicon.png";

function Login(props) {
  //context
  const { loginUser } = useContext(AuthContext);
  // router
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const onChangeLoginForm = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const loginOnSubmit = async (event) => {
    event.preventDefault();
    setAlert(null);
    try {
      setLoading(true);
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        navigate("/games");
      } else {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="sign-in">
      <div className="form-content">
        {loading && <BarLoader width={400} />}
        <Link to="/">
          <div className="logo-login">
            <img src={fav} alt="" />
          </div>
        </Link>
        <h1 className="title">Đăng nhập</h1>
        <AlertMessage info={alert} />
        <form action="" onSubmit={loginOnSubmit}>
          <div className="input-group input-dark mb-3">
            <span className="input-group-text">
              <i className="bi bi-person"></i>
            </span>
            <input
              type="text"
              className="form-control"
              name="username"
              id="username"
              placeholder="Tài khoản"
              onChange={onChangeLoginForm}
            />
          </div>
          <div className="input-group input-dark mb-3">
            <span className="input-group-text">
              <i className="bi bi-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="Mật khẩu"
              onChange={onChangeLoginForm}
            />
          </div>
          <button type="submit" className="btn btn-login">
            Đăng nhập
          </button>
          <Link to="/register" className="link-regiser">
            Đăng ký ngay
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Login;
