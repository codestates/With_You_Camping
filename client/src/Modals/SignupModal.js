import React, { useState } from "react";
import styled from "styled-components";

const SignContainer = styled.div``;

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

const SignModalView = styled.div.attrs(() => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.

  role: "dialog",
}))`
  // TODO : Modal창 CSS를 구현합니다.
  position: absolute;
  left: 35%;
  right: 35%;
  top: 15%;
  bottom: 15%;
  margin: auto;
  background: white;
  border-radius: 30px;
  color: purple;
  font-size: 20px;
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
    align-items: center;
    margin: 0px;
    label {
      margin-top: -15px;
      color: black;
    }
    input {
      margin-top: -15px;
      height: 25px;
      border-radius: 5px;
    }
    input:focus {
      outline: 3px solid yellow;
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
  }
`;

function SignupModal({ closeFn, setOpenLoginModal, setOpenSignupModal }) {
  return (
    <SignContainer>
      <ModalBackdrop>
        <SignModalView>
          {" "}
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
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" placeholder="email"></input>

            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" placeholder="비밀번호" />

            <label htmlFor="password2">비밀번호 확인</label>
            <input type="password" id="password2" placeholder="비밀번호 확인" />

            <label htmlFor="nickname">닉네임</label>
            <input type="text" id="nickname" placeholder="닉네임" />

            <label htmlFor="name">이름</label>
            <input type="text" id="name" placeholder="이름" />

            <button className="signup_button" type="button">
              Signup
            </button>
          </form>
        </SignModalView>
      </ModalBackdrop>
    </SignContainer>
  );
}

export default SignupModal;
