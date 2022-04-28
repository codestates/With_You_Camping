import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
// import Search from "./Search";
import { TwoBtnModal } from "./TwoBtnModal";

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
function Navber({ isLogin, setIsLogin }) {
  const [openModal, setOpenModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openTwoBtnModal, setOpenTwoBtnModal] = useState(false);

  const navigate = useNavigate();

  const modalHandler = (modal) => {
    openModal ? setOpenModal(false) : setOpenModal(true);

    if (modal === "login") {
      openLoginModal ? setOpenLoginModal(false) : setOpenLoginModal(true);
    } else if (modal === "signup") {
      openSignupModal ? setOpenSignupModal(false) : setOpenSignupModal(true);
    } else if (modal === "logout") {
      openTwoBtnModal ? setOpenTwoBtnModal(false) : setOpenTwoBtnModal(true);
    }
  };

  // 로그아웃 시 실행
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      {/* 로그아웃 확인 모달 */}
      {openTwoBtnModal ? (
        <TwoBtnModal
          main={"로그아웃 하시겠습니까?"}
          close={() => modalHandler("logout")}
          action={() => handleLogout()}
          navigate={"/"}
        />
      ) : null}
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
      <Container>
        <Logo onClick={() => navigate("/")}>
          WYC<span>.</span>
        </Logo>
        {isLogin ? (
          <Page>
            <Div>
              <NavLink
                to="/postlist"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                게시물 목록
              </NavLink>
            </Div>
            <Div>
              <NavLink
                to="/add_post"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                게시물 작성
              </NavLink>
            </Div>
            <Div>
              <NavLink
                to="/mypage"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                마이페이지
              </NavLink>
            </Div>
            <Div>
              <div className="logout" onClick={() => modalHandler("logout")}>
                로그아웃
              </div>
            </Div>
          </Page>
        ) : (
          <Page>
            <Div>
              <NavLink
                to="/postlist"
                style={{ textDecoration: "none", color: "inherit" }}
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
