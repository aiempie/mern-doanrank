import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import "./Login.css";
import { AuthContext } from "../../contexts/authContext";
import AlertMessage from "../layout/AlertMessage";

function Login(props) {
  //context
  const { loginUser, registerUser, loadUser } = useContext(AuthContext);
  // router
  let navigate = useNavigate();

  const [register, setRegister] = useState(props.isRegisterForm);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [regAlert, setRegAlert] = useState(null);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, password } = loginForm;
  const { regUsername, regEmail, regPassword } = registerForm;

  const onChangeLoginForm = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const onChangeRegisterForm = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const handChangeForm = (e) => {
    setRegister(e);
  };

  const [passType, setPassType] = useState("password");
  const passwordOnClick = (e) => {
    if (passType === "password") {
      setPassType("text");
    } else {
      setPassType("password");
    }
  };
  const loginOnSubmit = async (event) => {
    event.preventDefault();
    setAlert(null);
    console.log(registerForm.username);
    try {
      setLoading(true);
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        navigate("/select-games");
      } else {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const registerOnSubmit = async (event) => {
    event.preventDefault();
    setRegAlert(null);
    try {
      setLoading(true);
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
        setRegAlert({ type: "success", message: registerData.message });
        setTimeout(() => {
          setAlert(null);
          loadUser();
          navigate("/select-games");
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
  const formClass = register
    ? "login_form login_register"
    : "login_form login_login";
  const bgActiveStyle = register ? { left: "140px" } : { left: 0 };

  return (
    <div className="login_body">
      <div className="login_container">
        <div className={formClass} id="form">
          <div className="login_content">
            <form onSubmit={loginOnSubmit}>
              <h1 className="h1_tag">Login</h1>
              <AlertMessage info={alert} />
              <div className="login_group">
                <input
                  type="text"
                  id="username-login"
                  className="login_inputText"
                  placeholder=" "
                  required
                  name="username"
                  value={username}
                  onChange={onChangeLoginForm}
                />
                <label htmlFor="username-login">Username</label>
              </div>
              <div className="login_group">
                <input
                  type={passType}
                  id="pass-login"
                  className="login_inputText"
                  placeholder=" "
                  required
                  name="password"
                  value={password}
                  onChange={onChangeLoginForm}
                />
                <label htmlFor="pass-login">
                  Password
                  <i onClick={passwordOnClick} style={{ color: "red" }}>
                    {" "}
                    *Show
                  </i>
                </label>
              </div>
              <div className="login_group">
                <input type="checkbox" /> Save login
              </div>
              <button className="style_button">Login</button>
            </form>
          </div>
          <div className="login_content">
            <form onSubmit={registerOnSubmit}>
              <h1 className="h1_tag">Register</h1>
              <AlertMessage info={regAlert} />
              <div className="login_group">
                <input
                  type="text"
                  id="username-reg"
                  className="login_inputText"
                  placeholder=" "
                  required
                  onChange={onChangeRegisterForm}
                  name="username"
                  value={regUsername}
                />
                <label htmlFor="username-reg">Username</label>
              </div>
              <div className="login_group">
                <input
                  type="email"
                  id="email-reg"
                  className="login_inputText"
                  placeholder=" "
                  required
                  onChange={onChangeRegisterForm}
                  name="email"
                  value={regEmail}
                />
                <label htmlFor="email-reg">Email</label>
              </div>
              <div className="login_group">
                <input
                  type={passType}
                  id="pass-reg"
                  className="login_inputText"
                  placeholder=" "
                  required
                  onChange={onChangeRegisterForm}
                  name="password"
                  value={regPassword}
                />
                <label htmlFor="pass-reg">
                  Password
                  <i onClick={passwordOnClick} style={{ color: "red" }}>
                    {" "}
                    *Show
                  </i>
                </label>
              </div>
              <button className="style_button">Register</button>
            </form>
          </div>
          {loading && <BarLoader width={400} />}
          <div className="login_form-rotate">
            <div id="rotate" />
          </div>
        </div>
        <div className="login_option">
          <div
            className="login_bg-active"
            style={bgActiveStyle}
            id="bg-active"
          />
          <div
            className={
              register ? " login_changeType" : "login_changeType login_active"
            }
            id="login"
            onClick={() => {
              handChangeForm(false);
            }}
          >
            Login
          </div>
          <div
            className={
              register ? " login_changeType login_active" : "login_changeType"
            }
            id="register"
            onClick={() => {
              handChangeForm(true);
            }}
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
