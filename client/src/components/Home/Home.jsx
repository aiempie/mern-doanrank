import React from "react";
import { Navigate } from "react-router-dom";

function Home() {
  return <Navigate to="/login" replace={true} />;
}

export default Home;
