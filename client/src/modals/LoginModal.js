/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

const ModalContainer = styled.div`
  position: fixed;
  display: grid;
  place-items: center;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  width: 100vw;
  height: 100vh;

  z-index: 998;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.3);

  z-index: 998;
`;

const ModalView = styled.div`
  position: relative;
  top: 20%;
  left: 40%;
  display: grid;
  place-items: center;
  background-color: white;
  width: 400px;
  height: 550px;
  border-radius: 15px;
  z-index: 999;

  span {
    color: black;
    outline: none;
    font-size: 15px;
    justify-content: center;
    margin: 10px 10px;
  }
  @media screen and (max-width: 600px) {
    position: relative;
    top: 25%;
    left: 10%;
    display: grid;
    place-items: center;
    background-color: white;
    width: 400px;
    height: 550px;
    border-radius: 15px;
    z-index: 999;
  }
`;

const InnerContainer = styled.div`
  position: relative;
  top: 15px;
  height: max-content;
`;

const InputContainer = styled.div`
  margin-bottom: 35px;

  form {
    position: relative;
    top: -25%;

    display: grid;
    place-items: center;

    input {
      position: relative;
      top: -60%;
      margin: 30px;
      padding: 15px 0px;
      font-size: 18px;
      margin-bottom: 20px;
      outline: none;
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
    .button-container {
      display: flex;
      flex-direction: column;

      .login_button {
        margin-top: -30px;
        outline: none;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-size: 20px;
        padding: 0.45rem 1rem;
        background: #12b886;
        color: white;
        margin-bottom: 5px;
      }

      .signup-button {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #12b886;
        font-size: 20px;
        padding: 0.45rem 1rem;
        border-radius: 10px;
        color: white;
        cursor: pointer;
      }
    }
  }
`;

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
  position: relative;
  top: -130%;
  right: 0%;
  font-size: 3rem; ;
`;

const Nofify = styled.div`
  font-family: "Stylish", sans-serif;
  position: relative;
  bottom: 500%;
  left: -12%;
  font-size: 0.8rem;
`;

function LoginModal({ closeFn, setOpenSignupModal, setOpenLoginModal }) {
  const openSignup = () => {
    setOpenLoginModal(false);
    setOpenSignupModal(true);
  };

  return (
    <ModalContainer>
      <ModalBackdrop>
        <ModalView>
          <CloseBtn onClick={closeFn}>
            <IoClose size={"1.5rem"} />
          </CloseBtn>
          <InnerContainer>
            <InputContainer>
              <form>
                <Nofication>WYC.</Nofication>
                <label htmlFor="user-email" />
                <input id="user-email" type="email" placeholder="email" />

                <label htmlFor="user-password" />
                <input
                  id="user-password"
                  type="password"
                  placeholder="password"
                />
                <Nofify>이메일과 비밀번호를 확인해주세요</Nofify>
                <div className="button-container">
                  <button className="login_button" type="button">
                    Login
                  </button>
                  <div className="signup-button" onClick={openSignup}>
                    Signup
                  </div>
                </div>
              </form>
            </InputContainer>
          </InnerContainer>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}

export default LoginModal;
