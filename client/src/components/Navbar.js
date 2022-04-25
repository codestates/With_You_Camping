import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
import Search from "./Search";

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Div = styled.div`
  margin: 40px 30px;
`;

const Page = styled.div`
  display: flex;
  margin-right: 200px;
`;

const Button = styled.button``;

function Navber() {
  const [onLogin, setLogin] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

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
    <Nav>
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
    </Nav>
  );
}

export default Navber;
