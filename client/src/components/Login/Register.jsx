import React, { useContext, useState } from "react";
import "./Register.css";
import { AuthContext } from "../../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import fav from "../../assets/imgs/favicon.png";
import { BarLoader } from "react-spinners";
import AlertMessage from "../layout/AlertMessage";

function Register() {
  const { registerUser, loadUser } = useContext(AuthContext);
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [regAlert, setRegAlert] = useState(null);

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [repass, setRepass] = useState(null);

  const onChangeRegisterForm = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };
  const registerOnSubmit = async (event) => {
    event.preventDefault();
    setRegAlert(null);
    if (registerForm.password !== repass) {
      setRegAlert({ type: "danger", message: "Wrong Re-enter the password" });
      setTimeout(() => setRegAlert(null), 5000);
    } else
      try {
        setLoading(true);
        const registerData = await registerUser(registerForm);
        if (registerData.success) {
          setRegAlert({ type: "success", message: registerData.message });
          setTimeout(() => {
            setRegAlert(null);
            loadUser();
            navigate("/games");
          }, 2000);
        } else {
          setRegAlert({ type: "danger", message: registerData.message });
          setTimeout(() => setRegAlert(null), 5000);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <section className="signup">
      {loading && <BarLoader width={400} />}
      <div className="form-content">
        <div className="logo-register">
          <img src={fav} alt="" />
        </div>
        <h1 className="title">Đăng ký</h1>
        <AlertMessage info={regAlert} />
        <form action="" onSubmit={registerOnSubmit}>
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
              onChange={onChangeRegisterForm}
            />
          </div>
          <div className="input-group input-dark mb-3">
            <span className="input-group-text">
              <i className="bi bi-envelope-at"></i>
            </span>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              placeholder="Nhập email"
              onChange={onChangeRegisterForm}
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
              onChange={onChangeRegisterForm}
            />
          </div>
          <div className="input-group input-dark mb-3">
            <span className="input-group-text">
              <i className="bi bi-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              name="repassword"
              id="repassword"
              placeholder="Nhập lại mật khẩu"
              onChange={(e) => setRepass(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-register">
            Đăng ký
          </button>
          <Link to="/login" className="link-login">
            Đăng nhập ngay
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Register;
