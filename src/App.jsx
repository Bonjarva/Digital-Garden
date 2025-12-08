import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Seeds from "./pages/Seeds";
import Plots from "./pages/plots";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/seeds" element={<Seeds />} />
            <Route path="/plots" element={<Plots />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
