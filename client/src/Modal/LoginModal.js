/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from "react";
import styled from "styled-components";
import SignupModal from "./SignupModal";

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

const ModalBtn = styled.button`
  text-decoration: none;
  color: black;
  cursor: grab;
  position: relative;
  cursor: pointer;
`;

const ModalView = styled.div.attrs(() => ({
  role: "dialog",
}))`
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
      margin-top: 50px;
      button {
        outline: none;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-size: 20px;
        padding: 0.45rem 1rem;
        background: #12b886;
        color: white;
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

function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ModalContainer>
      <ModalBtn onClick={openModalHandler}>로그인</ModalBtn>
      {!isOpen ? null : (
        <ModalBackdrop>
          <ModalView>
            <div>
              <div
                role="button"
                onClick={openModalHandler}
                className="back-arrow"
                aria-hidden="true"
              >
                &times;
              </div>
            </div>
            <form>
              <input name="email" type="email" placeholder="email" />
              <input name="password" type="password" placeholder="password" />
              <div>
                <button type="button">Login</button>
              </div>
              <span>Don`t have an account?</span>
              <SignupModal />
            </form>
          </ModalView>
        </ModalBackdrop>
      )}
    </ModalContainer>
  );
}

export default LoginModal;
