import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 90px;
  left: 0;
  width: 100%;
  height: 75%;
  background: linear-gradient(
      to right,
      rgba(20, 20, 20, 0.1) 10%,
      rgba(20, 20, 20, 0.7) 70%,
      rgba(20, 20, 20, 1)
    ),
    url(https://waifu2x.booru.pics/outfiles/1ab60b9c49136f2b1db6af7362c637749ece315c_s2_n2.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

function Home() {
  return <Container />;
}

export default Home;
