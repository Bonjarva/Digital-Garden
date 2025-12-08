import { useState } from "react";
import "../App.css";

function NavBar() {
  return (
    <>
      <nav>
        <a href="/">Home</a> | <a href="/seeds">Seeds</a> |
        <a href="/plots">Plots</a> | <a href="/about">About</a>
      </nav>
    </>
  );
}

export default NavBar;
