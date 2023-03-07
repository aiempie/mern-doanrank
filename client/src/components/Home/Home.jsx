import React from "react";
import FullGame from "../../views/FullGame/FullGame";
// import { Navigate } from "react-router-dom";
import ButtonAppBar from "../sidebar/NavBar";

function Home() {
  return (
    <div>
      <ButtonAppBar />
      <FullGame />
    </div>
  );
}

export default Home;
