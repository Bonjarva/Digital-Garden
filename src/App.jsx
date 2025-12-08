import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import About from "./pages/about";
import Home from "./pages/home";
import Seeds from "./pages/seeds";
import Plots from "./pages/plots";

import NavBar from "./components/navbar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seeds" element={<Seeds />} />
        <Route path="/plots" element={<Plots />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
