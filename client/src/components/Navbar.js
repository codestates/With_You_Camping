import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";

const Container = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 1200px;
  height: 50px;

  @media screen and (max-width: 500px) {
    min-width: 0;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    display: block;
    min-width: 0;
    grid-gap: 0;

    .left-btns,
    .right-btns {
      display: none;
    }

    .menu_mobile_btn,
    .user_mobile_btn {
      display: block;
    }
  }
`;

const Logo = styled.div`
  font-family: "Sriracha", cursive;
  font-size: 2.3rem;
  text-align: center;
  cursor: pointer;
`;

const Page = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
`;

const Div = styled.div`
  margin: 40px 30px;
  &:hover {
    a {
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
          With You Camping<span>.</span>
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
                to="/post"
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
                to="/post"
              >
                게시물 작성
              </NavLink>
            </Div>
            <Div
              className="login"
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
