import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import AuthContextProvider from "./contexts/authContext";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login isRegisterForm={false} />} />
          <Route path="/register" element={<Login isRegisterForm={true} />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
