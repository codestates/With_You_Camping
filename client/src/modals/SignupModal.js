import React, { useState } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

const SignContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
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
  z-index: 999;
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

function SignupModal({ closeFn, setOpenLoginModal, setOpenSignupModal }) {
  return (
    <SignContainer>
      <ModalBackdrop>
        <SignModalView>
          <CloseBtn onClick={closeFn}>
            <IoClose size={"1.5rem"} />
          </CloseBtn>
          <SignUpWrapper>
            <form>
              <Nofication>WYC.</Nofication>
              <label htmlFor="email-for">이메일</label>
              <input type="email" id="email-for" placeholder="email" />

              <label htmlFor="password">비밀번호</label>
              <input type="password" id="password" placeholder="비밀번호" />

              <label htmlFor="password2">비밀번호 확인</label>

              <input
                type="password"
                id="password2"
                placeholder="비밀번호 확인"
              />

              <label htmlFor="nickname">닉네임</label>
              <input type="text" id="nickname" placeholder="닉네임" />

              <label htmlFor="name">이름</label>
              <input type="text" id="name" placeholder="이름" />

              <button className="signup_button" type="button">
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
