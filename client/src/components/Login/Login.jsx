import React, { useContext, useState } from "react";
import "./Login.css";
import { AuthContext } from "../../contexts/authContext";

function Login(props) {
  //context
  const { loginUser } = useContext(AuthContext);

  const [register, setRegister] = useState(props.isRegisterForm);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginForm;
  const onChangeLoginForm = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const handChangeForm = (e) => {
    setRegister(e);
  };

  const loginOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      console.log(loginData);
    } catch (error) {
      console.log(error);
    }
  };

  const formClass = register ? "form register" : "form login";
  const bgActiveStyle = register ? { left: "140px" } : { left: 0 };

  return (
    <div className="container">
      <div className={formClass} id="form">
        <div className="content">
          <form onSubmit={loginOnSubmit}>
            <h1>Login</h1>
            <div className="group">
              <input
                type="text"
                id="username-login"
                className="inputText"
                placeholder=" "
                required
                name="username"
                value={username}
                onChange={onChangeLoginForm}
              />
              <label htmlFor="username-login">Username</label>
            </div>
            <div className="group">
              <input
                type="password"
                id="pass-login"
                className="inputText"
                placeholder=" "
                required
                name="password"
                value={password}
                onChange={onChangeLoginForm}
              />
              <label htmlFor="pass-login">Password</label>
            </div>
            <div className="group">
              <input type="checkbox" /> Save login
            </div>
            <button>Login</button>
          </form>
        </div>
        <div className="content">
          <h1>Register</h1>
          <div className="group">
            <input
              type="text"
              id="username-reg"
              className="inputText"
              placeholder=" "
              required
            />
            <label htmlFor="username-reg">Username</label>
          </div>
          <div className="group">
            <input
              type="password"
              id="email-reg"
              className="inputText"
              placeholder=" "
              required
            />
            <label htmlFor="email-reg">Email</label>
          </div>
          <div className="group">
            <input
              type="password"
              id="pass-reg"
              className="inputText"
              placeholder=" "
              required
            />
            <label htmlFor="pass-reg">Password</label>
          </div>
          <button>Register</button>
        </div>
        <div className="form-rotate">
          <div id="rotate" />
        </div>
      </div>
      <div className="option">
        <div className="bg-active" style={bgActiveStyle} id="bg-active" />
        <div
          className={register ? " changeType" : "changeType active"}
          id="login"
          onClick={() => {
            handChangeForm(false);
          }}
        >
          Login
        </div>
        <div
          className={register ? " changeType active" : "changeType"}
          id="register"
          onClick={() => {
            handChangeForm(true);
          }}
        >
          Register
        </div>
      </div>
    </div>
  );
}

export default Login;
