import React from "react";
import { Router } from "@reach/router";
import Home from "./Home";
import EcgChart from "./charts/EcgChart";
import TestPage from "./components/TestPage";

function App() {
  return (
    <Router>
      <Home path="/" />
      <EcgChart path="/chart" />
      <TestPage path="/test" />
    </Router>
  );
}

export default App;
