import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 5, 12, 0.5);
  z-index: 999;
  margin-left: 45px;
  /* left: 3%; */
  .back-arrow {
    font-size: 20px;
    margin-left: 5px;
    margin-top: 70px;
    /* margin-bottom: 10px; */
    font-weight: 800;
    cursor: pointer;
  }
`;

const MessageBox = styled.div`
  background-color: white;
  width: 400px;
  height: 250px;
  z-index: 10;
  border-radius: 3px;
  h2 {
    text-align: center;
    margin-bottom: 3rem;
  }
  button {
    display: block;
    width: 140px;
    height: 40px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    margin: auto;
  }
`;

function Confirm({ message, handleMessage }) {
  const navigate = useNavigate();
  const [curMessage, setCurMessage] = useState('');
  const [btnInfo, setBtnInfo] = useState('');

  useEffect(() => {
    if ( message === 'userinfo_blank') {
      setCurMessage('회원가입 하려면 모든 항목을 작성 하셔야 합니다.');
      setBtnInfo('닫 기');
    }
    else if (message === 'nickname_validate_fail') {
      setCurMessage('닉네임은 2~12자, 특수문자는 사용 불가능 합니다.');
      setBtnInfo('닫 기');
    }
    else if ( message === 'email_validate_fail') {
      setCurMessage('이메일 형식에 맞게 작성 해주세요');
      setBtnInfo('닫 기');
    }
    else if ( message === 'username_validate_fail' ) {
      setCurMessage('이름은 한글/영문만 사용 가능 합니다');
      setBtnInfo('닫 기');
    }
    else if ( message === 'password_validate_fail') {
      setCurMessage('비밀번호와 비밀번호 확인란이 일치하지 않습니다.');
      setBtnInfo('닫 기');
    }
    else if ( message === "loginInfo_blank") {
      setCurMessage('이메일, 비밀번호를 입력해 주세요');
      setBtnInfo('닫 기');
    }
    else if ( message === "signup_success" ) {
      setCurMessage('회원가입 완료되었습니다.');
      setBtnInfo('닫 기');
    }
    else if ( message === "signup_failed" ) {
      setCurMessage('중복된 이메일이 존재합니다.');
      setBtnInfo('닫 기');
    }
    else if ( message === "login_success") {
      setCurMessage('로그인 성공하였습니다.');
      setBtnInfo('닫 기');
    }
    else if ( message === "login_failed") {
      setCurMessage('이메일 또는 비밀번호가 올바르지 않습니다.');
      setBtnInfo('닫 기');
    }
  }, []);

  // useEffect(() => {
  //   if (message === 'success_signup') {
  //     setBtnInfo('로그인 하기');
  //     setCurMessage('회원가입 성공');
  //   } else if (message === 'error_signup') {
  //     setBtnInfo('닫 기');
  //     setCurMessage('회원가입 실패');
  //   } else if (message === 'password_check_fail') {
  //     setBtnInfo('닫 기');
  //     setCurMessage('비밀번호가 일치하지 않습니다');
  //   } else if (message === 'login_fail') {
  //     setBtnInfo('닫 기');
  //     setCurMessage('로그인 실패');
  //   } else if (message === 'should_login') {
  //     setBtnInfo('로그인 하기');
  //     setCurMessage('로그인 해야 사용가능합니다.');
  //   } else if (message === 'info_edit_fail') {
  //     setBtnInfo('닫 기');
  //     setCurMessage('변경하는 정보를 다시 확인해주세요.');
  //   } else if (message === 'info_edit_success') {
  //     setBtnInfo('수정 완료');
  //     setCurMessage('수정이 완료되었습니다');
  //   } 
  // }, []);

  const handleConfirm = () => {
    if (message === 'success_signup') {
      navigate('/login');
    } else if (
      message === 'error_signup' ||
      message === 'password_check_fail' ||
      message === 'login_fail' ||
      message === 'info_dit_fail' ||
      message === 'info_edit_success'
    ) {
      handleMessage('');
    }
  };

  const handleCancel = () => {
    handleMessage('');
  };
  return (
    <Container>
      <MessageBox>
        {/* <div
          role="button"
          onClick={handleCancel}
          className="back-arrow"
          aria-hidden="true"
        >
          ❌
        </div> */}
        <div className="back-arrow">
        <h2>{curMessage}</h2>
        <button type="button" onClick={handleCancel}>
          {btnInfo}
        </button>
        </div>
      </MessageBox>
    </Container>
  );
}

export default Confirm;
