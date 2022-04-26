import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";

import Search from "./Search";

const Container = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Logo = styled.div`
  font-family: "Sriracha", cursive;
  font-size: 2.3rem;
  text-align: center;
  cursor: pointer;
  span {
    color: #e80707;
  }
`;

const Page = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
`;

const Div = styled.div`
  margin: 40px 30px;
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
        <Search />
        {onLogin ? (
          <Page>
            <Div>
              <NavLink to="/postlist">게시물 목록</NavLink>
            </Div>
            <Div>
              <NavLink to="/post">게시물 작성</NavLink>
            </Div>
            <Div>
              <NavLink to="/mypage">마이페이지</NavLink>
            </Div>
          </Page>
        ) : (
          <Page>
            <Div>
              <NavLink to="/postlist">게시물 목록</NavLink>
            </Div>
            <Div>
              <NavLink to="/post">게시물 작성</NavLink>
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
