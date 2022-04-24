/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div``;

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

const ModalView = styled.div.attrs(() => ({}))`
  position: absolute;
  left: 35%;
  right: 35%;
  top: 15%;
  bottom: 25%;
  margin: auto;
  background: white;
  border-radius: 15px;
  color: purple;
  font-size: 20px;
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
    align-items: center;

    input {
      outline: none;
      border: none;
      margin: 30px;
      padding: 15px 0px;
      font-size: 16px;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }

    div {
      display: flex;
      flex-direction: column;
      margin-top: 10px;

      .login_button {
        outline: none;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-size: 20px;
        padding: 0.45rem 1rem;
        background: #12b886;
        color: white;
        margin-top: 30px;
      }

      div {
        background: #12b886;
        height: 40px;
        border-radius: 10px;
        color: white;
        margin-bottom: -30px;
        align-items: center;
      }
    }
  }
  span {
    color: black;
    outline: none;
    font-size: 15px;
    justify-content: center;
    margin: 10px 10px;
  }
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
          <div>
            <div
              role="button"
              onClick={closeFn}
              className="back-arrow"
              aria-hidden="true"
            >
              &times;
            </div>
          </div>
          <form>
            <label htmlFor="user-email" />
            <input id="user-email" type="email" placeholder="email" />

            <label htmlFor="user-password" />
            <input id="user-password" type="password" placeholder="password" />
            <div>
              <button className="login_button" type="button">
                Login
              </button>
              <div onClick={openSignup}>Signup</div>
            </div>
          </form>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}

export default LoginModal;
