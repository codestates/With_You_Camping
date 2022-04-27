import React from "react";
import styled from "styled-components";

import image from "../img/camping.jpg";
import image1 from "../img/camping1.jpg";
import image3 from "../img/camping3.jpg";
import image4 from "../img/camping4.jpg";

const Container = styled.section`
  font-family: "Square Peg", cursive;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 1200px;
  /* width: 100vw; */
  height: max-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid rgba(1, 0, 0, 0.5);
`;

const Picture = styled.div`
  position: absolute;
  top: -100px;
  left: 0;

  display: grid;
  place-items: center;

  width: 100%;

  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 1) 100%
    ),
    url(https://images.unsplash.com/photo-1531012804729-7df44b58327b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1710&q=80);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

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

  @media screen and (max-width: 500px) {
    min-height: 300px;
    height: max-content;

    .wrapper {
      position: relative;
      display: block;
      width: 100vw;
      height: 100%;

      .intro {
        position: absolute;
        top: 0;
        grid-column: 0 / -1;
        font-size: 1rem;
        height: 150px;
        padding: 20px;

        p {
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }
  }
`;

const InnerContainer = styled.div`
  position: relative;
  grid-column: 2 / 12;
  width: 100%;

  height: max-content;

  margin-top: 350px;

  section {
    position: relative;
    display: flex;
    align-items: center;

    height: 500px;
    width: 100%;

    .image {
      display: grid;
      place-items: center;

      width: 40%;
      height: 400px;

      img {
        height: 400px;
      }
    }

    .text {
      position: absolute;
      right: 0;
      display: flex;

      flex-direction: column;
      justify-content: center;
      align-items: flex-end;

      width: 700px;
      height: 400px;

      .wrapper {
        display: flex;
      }

      p {
        font-size: 2rem;
        margin-bottom: 20px;
      }
    }
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    margin-top: 250px;

    section {
      display: grid;
      place-items: center;
      height: max-content;

      margin-top: 30px;

      .image {
        display: flex;
        justify-content: center;
        height: 200px;

        z-index: -1;
        img {
          width: 300px;
          height: auto;
        }
      }

      .text {
        position: static;
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;
        height: 100px;

        .wrapper {
          display: flex;
        }

        p {
          font-size: 1.1rem;
        }
      }
    }
  }
`;

function Landing() {
  return (
    <Container>
      <Picture>
        <div className="wrapper">
          <div className="intro">
            <p>오늘은 어디로 가볼까?</p>
            <p>지금 With You Camping</p>
            <p> 가슴 설레는</p>
            <p>캠핑 여행을 떠나보아요</p>
          </div>
        </div>
      </Picture>
      <InnerContainer>
        <section>
          <div className="image">
            <img src={image1} alt="1" />
          </div>
          <div className="text">
            <p>가족과 함께 재밌는 여행을 떠나</p>
            <p>추억을 남겨요</p>
          </div>
        </section>
        <section>
          <div className="image">
            <img src={image3} alt="3" />
          </div>
          <div className="text">
            <p>친구, 연인 사랑하는 이들에게</p>
            <p></p>
          </div>
        </section>
        <section>
          <div className="image">
            <img src={image4} alt="4" />
          </div>
          <div className="text">
            <p>반복되는 일상, WYC로</p>
            <p>사람들과 가슴 설레는 순간을 공유해보세요.</p>
          </div>
        </section>
      </InnerContainer>
    </Container>
  );
}

export default Landing;
