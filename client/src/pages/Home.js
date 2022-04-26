import React from "react";
import styled from "styled-components";

const Container = styled.section`
  font-family: "Noto Sans KR", sans-serif;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 1200px;
  /* width: 100vw; */
  height: max-content;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Picture = styled.div`
  position: absolute;
  top: -100px;
  left: 0;

  display: grid;
  place-items: center;

  width: 100%;

  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 1) 100%
    ),
    url(https://waifu2x.booru.pics/outfiles/1ab60b9c49136f2b1db6af7362c637749ece315c_s2_n2.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 400px;

  .wrapper {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    width: 2000px;
    height: max-content;

    .intro {
      grid-column: 2 / 12;
      /* position: absolute; */
      left: 0;
      top: 0;

      display: grid;
      width: 100%;
      padding: 70px;

      box-sizing: border-box;

      font-size: 1.8rem;

      height: max-content;

      p {
        color: white;
        margin-top: 20px;
        margin-bottom: 20px;

        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
`;

const Logo = styled.div`
  font-family: "Sriracha", cursive;
  color: white;
  font-size: 4rem;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    font-size: 3rem;
  }
`;

function Home() {
  return (
    <Container>
      <Picture>
        <div className="wrapper">
          <div className="intro">
            <p>같은 장소, 다른시선</p>
            <p>나의 감정과 시선을 공유하는 서비스</p>
            <Logo>
              WYC<span>.</span>
            </Logo>
            <p>입니다.</p>
          </div>
        </div>
      </Picture>
    </Container>
  );
}

export default Home;
