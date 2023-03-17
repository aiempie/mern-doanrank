import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./views/Auth/Auth";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import FullGame from "./views/FullGame/FullGame";
import AuthContextProvider from "./contexts/authContext";
import GameContextProvider from "./contexts/gameContext";
import DoanClip from "./views/DoanClip/DoanClip";
import SelectGameContextProvider from "./contexts/selectGameContext";

function App() {
  return (
    <AuthContextProvider>
      <GameContextProvider>
        <SelectGameContextProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Auth isRegisterForm={false} />} />
              <Route
                path="/register"
                element={<Auth isRegisterForm={true} />}
              />
              <Route
                path="/select-games"
                element={<ProtectedRoute component={FullGame} />}
              />
              <Route
                path="/xem-clip-doan-rank/:slug"
                element={<ProtectedRoute component={DoanClip} />}
              />
            </Routes>
          </Router>
        </SelectGameContextProvider>
      </GameContextProvider>
    </AuthContextProvider>
  );
}

export default App;
