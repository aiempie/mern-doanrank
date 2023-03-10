import React from "react";
import FullGame from "../../views/FullGame/FullGame";
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
