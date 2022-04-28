import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";

const Container = styled.header`
  font-family: "Stylish", sans-serif;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  min-width: 1200px;
  height: 50px;

  font-size: 1.2rem;

  @media screen and (max-width: 500px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    grid-gap: 0;
  }
`;
const Logo = styled.div`
  font-family: "Stylish", sans-serif;
  font-size: 4.3rem;

  text-align: center;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    margin-left: 0px;
    font-size: 2.8rem;
  }
`;

const Page = styled.div`
  display: flex;

  @media screen and (max-width: 500px) {
    margin-right: 0px;
  }
`;

const Div = styled.div`
  margin: 40px 30px;
  cursor: pointer;
  &:hover {
    color: red;
  }
  .login {
    &:hover {
      color: red;
    }
  }
`;

function Navber() {
  const [onLogin, setLogin] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  const navigate = useNavigate();

  const modalHandler = (modal) => {
    openModal ? setOpenModal(false) : setOpenModal(true);

    if (modal === "login") {
      openLoginModal ? setOpenLoginModal(false) : setOpenLoginModal(true);
    } else if (modal === "signup") {
      openSignupModal ? setOpenSignupModal(false) : setOpenSignupModal(true);
    }
  };

  const onClick = () => {
    setLogin(!onLogin);
  };

  return (
    <div>
      {openLoginModal ? (
        <LoginModal
          closeFn={() => modalHandler("login")}
          setOpenLoginModal={setOpenLoginModal}
          setOpenSignupModal={setOpenSignupModal}
        />
      ) : null}
      {openSignupModal ? (
        <SignupModal
          closeFn={() => modalHandler("signup")}
          setOpenLoginModal={setOpenLoginModal}
          setOpenSignupModal={setOpenSignupModal}
        />
      ) : null}
      <button type="button" onClick={onClick}>
        버튼
      </button>
      <Container>
        <Logo onClick={() => navigate("/")}>
          WYC<span>.</span>
        </Logo>
        {onLogin ? (
          <Page>
            <Div>
              <NavLink
                style={{ textDecoration: "none", color: "inherit" }}
                to="/postlist"
              >
                게시물 목록
              </NavLink>
            </Div>
            <Div>
              <NavLink
                style={{ textDecoration: "none", color: "inherit" }}
                to="/add_post"
              >
                게시물 작성
              </NavLink>
            </Div>
            <Div>
              <NavLink
                style={{ textDecoration: "none", color: "inherit" }}
                to="/mypage"
              >
                마이페이지
              </NavLink>
            </Div>
          </Page>
        ) : (
          <Page>
            <Div>
              <NavLink
                style={{ textDecoration: "none", color: "inherit" }}
                to="/postlist"
              >
                게시물 목록
              </NavLink>
            </Div>
            <Div>
              <NavLink
                style={{ textDecoration: "none", color: "inherit" }}
                to="/add_post"
              >
                게시물 작성
              </NavLink>
            </Div>
            <Div
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => modalHandler("login")}
            >
              로그인
            </Div>
          </Page>
        )}
      </Container>
    </div>
  );
}

export default Navber;
