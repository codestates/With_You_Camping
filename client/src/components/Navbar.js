import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
// import Search from "./Search";
import { TwoBtnModal } from "./TwoBtnModal";
import Confirm from "./Confirm";
import image from "../img/logo3.jpg";
import image1 from "../img/logo4.jpg";
import image2 from "../img/logo5.jpg";
import image3 from "../img/15logo.jpg";

const Container = styled.header`
  font-family: "Comforter", cursive;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  min-width: 1200px;
  height: 50px;
  margin: 20px;
  font-size: 1rem;

  @media screen and (max-width: 500px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    grid-gap: 0;
  }
`;

const SignContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 809;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Logo = styled.div`
  font-family: "Stylish", sans-serif;
  font-size: 4.3rem;

  text-align: center;
  cursor: pointer;
  img {
    margin-top: 25px;
    margin-right: 0px;
    margin-left: 100px;
    height: 70px;
    width: 200px;
    object-fit: contain;
    /* float: left; */
  }

  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const Logo2 = styled.div`
  font-family: "Stylish", sans-serif;
  font-size: 4.3rem;

  text-align: center;
  cursor: pointer;
  img {
    margin-top: 25px;
    margin-right: 100px;
    margin-left: -150px;
    height: 70px;
    width: 200px;
    object-fit: contain;
    float: left;
  }

  @media screen and (max-width: 500px) {
    margin-left: 150px;
    margin-right: 0px;
    font-size: 2.8rem;
    width: 70%;
  }
`;
const Page = styled.div`
  display: flex;

  @media screen and (max-width: 500px) {
    margin-right: 10px;
  }
`;

const Div = styled.div`
  margin: 40px 30px;
  cursor: pointer;
  &:hover {
    color: red;
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const ImgDiv = styled.div`
  margin-top: 33px;
  right: 100%;
  margin-left: 20px;
  margin-right: -22px;
  border-radius: 50%;
  /* margin: 40px 5px; */
  cursor: pointer;
  &:hover {
    color: red;
  }
  @media screen and (max-width: 500px) {
    margin-top: 40px;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 0.8rem;
  }
`;

const UserDiv = styled.div`
  margin: 42px 30px;
  font-family: "Malgun Gothic";
  font-size: 80%;
  color: #c428bf;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    margin-top: 50px;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 0.7rem;
  }
`;
function Navber({ isLogin, setIsLogin, userInfo, setUserInfo }) {
  const [openModal, setOpenModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openTwoBtnModal, setOpenTwoBtnModal] = useState(false);
  // 회원가입 완료시 모달
  const [confirmSignupModal, setConfirmSignupModal] = useState(false);
  // 메세지 모달
  const [message, setMessage] = useState("");

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

  // const [newNickname, setNewNickname] = useState("");

  // 로그아웃 시 실행
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  const confirmLoginModal = () => {
    setMessage("login_check");
  };

  const resetMessage = () => {
    setMessage("");
  };

  // console.log(userInfo);
  // const nickname = window.sessionStorage.getItem("nickname");

  return (
    <div>
      {/* 로그인 X, 게시물 작성 버튼 클릭 시 모달 */}
      {message ? (
        <SignContainer>
          <ModalBackdrop>
            <Confirm message={message} handleMessage={resetMessage} />
          </ModalBackdrop>
        </SignContainer>
      ) : null}
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
          confirmSignupModal={confirmSignupModal}
          setConfirmSignupModal={setConfirmSignupModal}
        />
      ) : null}
      {openSignupModal ? (
        <SignupModal
          closeFn={() => modalHandler("signup")}
          setOpenLoginModal={setOpenLoginModal}
          setOpenSignupModal={setOpenSignupModal}
          setConfirmSignupModal={setConfirmSignupModal}
        />
      ) : null}
      <Container>
        <Logo onClick={() => navigate("/")}>
          {/* <img src={image1} alt="logo" style={{ margin: "20px 0px 0px 0px" }} /> */}
          <img
            src={image3}
            alt="logo3"
            style={{ margin: "20px 20px 0px 0px" }}
          />
        </Logo>
        {/* <Logo2 onClick={() => navigate("/")}>
          <span style={{ margin: "30px 0px 0px 0px" }}>
            <img src={image2} alt="logo1" />
          </span> */}
        {/* <img src={image2} alt="logo1" /> */}
        {/* </Logo2> */}

        {isLogin ? (
          <Page>
            <Div>
              <NavLink
                to="/posts"
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
                to="/mypage/mypost"
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
            <ImgDiv>
              <img
                alt="profile"
                src={userInfo.profile}
                width="32"
                height="32"
                style={{ borderRadius: "50%" }}
              />
            </ImgDiv>

            <UserDiv className="user-profile" style={{}}>
              {userInfo.nickname} 님 안녕하세요
            </UserDiv>
          </Page>
        ) : (
          <Page>
            <Div>
              <NavLink
                to="/posts"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                게시물 목록
              </NavLink>
            </Div>
            <Div onClick={confirmLoginModal}>게시물 작성</Div>
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
