import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/_TempNavBar";
import Footer from "./components/_TempFooter";
import Home from "./pages/_TempHome";
import Seeds from "./pages/_TempSeeds";
import Plots from "./pages/_TempPlots";
import About from "./pages/_TempAbout";

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
