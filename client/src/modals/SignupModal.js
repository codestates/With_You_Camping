import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import Confirm from "../components/Confirm";

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

const SignModalView = styled.div`
  // TODO : Modal창 CSS를 구현합니다.
  position: relative;
  top: 20%;
  left: 40%;
  display: grid;
  place-items: center;
  background-color: white;
  width: 400px;
  height: 650px;
  border-radius: 15px;
  z-index: 800;
  line-height: 80px;

  div {
    display: flex;
    justify-content: center;

    div {
      cursor: pointer;
    }
  }
  form {
    display: flex;
    flex-direction: column;

    margin: 0px;
    label {
      margin-top: -12px;
      color: black;
    }
    input {
      margin-top: -25px;
      height: 25px;
      border-radius: 5px;
    }
    input:focus {
      border: none;
      outline: 2px solid red;
    }
  }
  .signup_button {
    cursor: pointer;
    background: #12b886;
    padding: 0.45rem 1rem;
    font-size: 20px;
    margin-top: 40px;
    color: white;
    border: none;
    border-radius: 10px;
  }
  @media screen and (max-width: 600px) {
    position: relative;
    top: 15%;
    left: 10%;
    display: grid;
    place-items: center;
    background-color: white;
    width: 400px;
    height: 650px;
    border-radius: 15px;
    z-index: 999;
  }
`;

const SignUpWrapper = styled.div``;

const CloseBtn = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;

  transition: 0.1s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Nofication = styled.h1`
  font-family: "Stylish", sans-serif;
  position: absolute;
  top: 5%;
  right: 40%;
  font-size: 3rem; ;
`;

function SignupModal({
  closeFn,
  setOpenLoginModal,
  setOpenSignupModal,
  setMessageModal,
  setConfirmSignupModal,
}) {
  const serverPath = process.env.REACT_APP_SERVER_PATH;

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    password_check: "",
    nickname: "",
    name: "",
  });

  const [isFull, setIsFull] = useState(false);

  const [message, setMessage] = useState("");

  const naviagate = useNavigate();

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  const validateEmail = (value) => {
    // 이메일 유효성 검사
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return emailRegex.test(value);
  };

  const validateNickname = (value) => {
    const nicknameRegex = /^[가-힣|a-z|A-Z|0-9|_]{2,12}$/;
    return nicknameRegex.test(value);
  };

  const validateName = (value) => {
    const nicknameRegex = /^[가-힣|a-z|A-Z|_]{2,12}$/;
    return nicknameRegex.test(value);
  };

  useEffect(() => {
    if (
      userInfo.email &&
      userInfo.password &&
      userInfo.password_check &&
      userInfo.name &&
      userInfo.nickname
    ) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFull === false) {
      setMessage("userinfo_blank");
    } else if (!validateEmail(userInfo.email)) {
      setMessage("email_validate_fail");
    } else if (!validateNickname(userInfo.nickname)) {
      setMessage("nickname_validate_fail");
    } else if (!validateName(userInfo.name)) {
      setMessage("username_validate_fail");
    } else {
      try {
        const res = await axios.post(`${serverPath}/auth/signup`, {
          email: userInfo.email,
          password: userInfo.password,
          nickname: userInfo.nickname,
          name: userInfo.name,
        });
        if (res.status === 201) {
          setConfirmSignupModal(true);
          setOpenSignupModal(false);
          setOpenLoginModal(true);
        }
      } catch (err) {
        setMessage("signup_failed");
      }
    }
  };

  const resetMessage = () => {
    setMessage("");
  };

  return (
    <SignContainer>
      <ModalBackdrop>
        {message ? (
          <Confirm message={message} handleMessage={resetMessage} />
        ) : null}
        <SignModalView>
          <CloseBtn onClick={closeFn}>
            <IoClose size={"1.5rem"} />
          </CloseBtn>
          <SignUpWrapper>
            <Nofication>WYC.</Nofication>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email-for">이메일</label>
              <input
                type="email"
                id="email-for"
                placeholder="email"
                onChange={handleInputValue("email")}
              />

              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호"
                onChange={handleInputValue("password")}
              />

              <label htmlFor="password2">비밀번호 확인</label>

              <input
                type="password"
                id="password2"
                placeholder="비밀번호 확인"
                onChange={handleInputValue("password_check")}
              />

              <label htmlFor="nickname">닉네임</label>
              <input
                type="text"
                id="nickname"
                placeholder="닉네임"
                onChange={handleInputValue("nickname")}
              />

              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                placeholder="이름"
                onChange={handleInputValue("name")}
              />

              <button className="signup_button" type="submit">
                Signup
              </button>
            </form>
          </SignUpWrapper>
        </SignModalView>
      </ModalBackdrop>
    </SignContainer>
  );
}

export default SignupModal;
