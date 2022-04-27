import React from "react";
import styled from "styled-components";

const Container = styled.div`
  footer {
    margin-top: 7px;
    display: flex;
    justify-content: center;
    color: black;
    height: 100px;

    .about-us {
      .bold-text {
        margin-top: -50px;
        margin-bottom: 20px;
        font-weight: 500;
      }

      display: flex;
      flex-flow: column nowrap;

      a {
        text-decoration: none;
        margin-bottom: 10px;
      }
    }
  }
  .team-member {
    p {
      margin-top: -50px;
      margin-left: 100px;
      font-weight: 500;
    }
    .task {
      margin-top: 20px;
      margin-left: 100px;
      div {
        margin-top: 10px;
      }
    }
  }
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Footer() {
  return (
    <Container>
      <footer>
        <div className="about-us">
          <p className="bold-text">ABOUT US</p>

          <a
            href="https://github.com/codestates/With_You_Camping/tree/main"
            target="_blank"
            rel="noreferrer"
          >
            Repository
          </a>
          <a
            href="https://github.com/codestates/With_You_Camping/wiki"
            target="_blank"
            rel="noreferrer"
          >
            Wiki
          </a>
        </div>
        <div className="team-member">
          <p className="bold-text">TEAM MEMBERS</p>
          <div className="task">
            <div>Front</div>
            <div className="front">오일중</div>
            <div>FullStack</div>
            <div className="full">박재현 이은주</div>
          </div>
        </div>
      </footer>
    </Container>
  );
}

export default Footer;
