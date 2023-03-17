import React from "react";
import FullGame from "../../views/FullGame/FullGame";
import Footer from "../footer/Footer";
import ButtonAppBar from "../sidebar/NavBar";

function Home() {
  return (
    <div>
      <ButtonAppBar />
      <div style={{ marginTop: "60px" }}>
        <FullGame />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
