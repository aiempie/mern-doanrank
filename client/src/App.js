import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./views/Auth/Auth";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import FullGame from "./views/FullGame/FullGame";
import AuthContextProvider from "./contexts/authContext";
import GameContextProvider from "./contexts/gameContext";

function App() {
  return (
    <AuthContextProvider>
      <GameContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth isRegisterForm={false} />} />
            <Route path="/register" element={<Auth isRegisterForm={true} />} />
            <Route
              path="/select-games"
              element={<ProtectedRoute component={FullGame} />}
            />
          </Routes>
        </Router>
      </GameContextProvider>
    </AuthContextProvider>
  );
}

export default App;
