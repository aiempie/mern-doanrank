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
import ListGame from "./views/ListGame/ListGame";
import Classic from "./views/Classic/Classic";
import ChampionContextProvider from "./contexts/championContext";

function App() {
  return (
    <AuthContextProvider>
      <GameContextProvider>
        <ChampionContextProvider>
          <SelectGameContextProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/login"
                  element={<Auth isRegisterForm={false} />}
                />
                <Route
                  path="/register"
                  element={<Auth isRegisterForm={true} />}
                />
                <Route
                  path="/games"
                  element={<ProtectedRoute component={FullGame} />}
                />
                <Route
                  path="/games/xem-clip-doan-rank/:slug"
                  element={<ProtectedRoute component={DoanClip} />}
                />
                <Route
                  path="/games/:slug"
                  element={<ProtectedRoute component={ListGame} />}
                />
                <Route
                  path="/games/classic/:slug"
                  element={<ProtectedRoute component={Classic} />}
                />
              </Routes>
            </Router>
          </SelectGameContextProvider>
        </ChampionContextProvider>
      </GameContextProvider>
    </AuthContextProvider>
  );
}

export default App;
