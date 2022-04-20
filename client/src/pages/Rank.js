import React from "react";
import { NavLink } from "react-router-dom";

function Rank() {
  return (
    <>
      <div>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          Home
        </NavLink>
      </div>
      <div>Rank</div>
    </>
  );
}

export default Rank;
