import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  margin: 50px 50px;
`;

function Mypage() {
  return (
    <>
      <Div>
        <NavLink to="/">Home</NavLink>
      </Div>
      <div>Mypage</div>
    </>
  );
}

export default Mypage;
