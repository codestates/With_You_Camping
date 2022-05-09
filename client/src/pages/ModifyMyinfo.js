import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { OneBtnModal } from "../components/oneBtnModal";
import { PageTitle } from "../components/pageTitle";
import { TwoBtnModal } from "../components/TwoBtnModal";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 1.5rem;
  }
`;

const UserInfoBox = styled.div`
  grid-column: 3 / 11;

  display: flex;
  flex-direction: column;

  min-height: max-content;
  justify-content: center;
  align-items: center;
  height: 70vh;
  .fields {
    display: grid;
    justify-content: center;
    align-items: center;

    width: 305px;
    min-height: 50px;
    margin-left: 10px;
    margin-top: 20px;
  }

  .fields > div {
    margin-bottom: 25px;
    font-weight: 500;
  }

  .fields input {
    width: 305px;
    height: 38px;

    margin-top: 6px;
    box-sizing: border-box;

    border: 1px solid #aaa;
    border-radius: 5px;

    &:focus {
      outline: 3px solid #12b886;
      border: #ffd600;
    }
  }

  .form {
    position: relative;

    .btn-location {
      position: relative;
      light: 20%;
    }
  }
`;

const Btn = styled.button`
  font-size: 1rem;
  display: grid;
  place-items: center;

  width: 305px;
  height: 38px;

  background-color: ${(props) => (props.disabled ? "#DDDDDD" : "#12b886")};
  color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);

  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  transition: 0.1s;

  &:hover {
    transform: ${(props) => (props.disabled ? "null" : "translateY(-2px)")};
    box-shadow: ${(props) =>
      props.disabled ? "null" : "0px 5px 4px rgba(0,0,0,0.1)"};
  }
  span {
    position: relative;
    top: 2px;
  }
`;

const ConfirmBtn = styled(Btn)`
  position: relative;

  margin-top: 30px;
`;

const SignoutBtn = styled(Btn)`
  background-color: ${(props) => (props.disabled ? "#DDDDDD" : "#ff796b")};
  margin-left: 10px;
  margin-top: 0px;
`;

const Nofication = styled.div`
  position: absolute;
  top: 2px;
  right: 0;
  margin-top: 5px;
  color: red;
  font-size: 0.8rem;
`;

function ModifyMyinfo() {
  const navigate = useNavigate();
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const userId = window.sessionStorage.getItem("userId");
  const accessToken = window.sessionStorage.getItem("loginToken");

  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newNickname, setNewNickname] = useState("");

  const [nicknameCheck, setNicknameCheck] = useState(true);

  const [signoutModal, setSignoutModal] = useState(false);
  const [okModalOpen, setOkModalOpen] = useState(false);
  const [invaildModalOpen, setInvaildModalOpen] = useState(false);

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, []);

  const nicknameValidCheck = (value) => {
    let nicknameReg = /^[가-힣a-zA-Z0-9_]{2,12}$/;
    return nicknameReg.test(value);
  };

  const nicknameCheckHandler = (e) => {
    setNewNickname(e.target.value);
  };

  const clickModifyNicknameBtn = async () => {
    (async () => {
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      if (newNickname && nicknameValidCheck(newNickname)) {
        try {
          const res = await axios.put(
            `${serverPath}/users/`,
            {
              nickname: newNickname,
            },
            headers
          );
          console.log(res);
          if (res.status === 200) {
            setNicknameCheck(true);
            setOkModalOpen(true);
          }
        } catch (err) {
          setNicknameCheck(false);
        }
      }
    })();
  };

  const clickModifyPasswordBtn = async () => {
    (async () => {
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      if (newPassword && currPassword) {
        try {
          const res = await axios.put(
            `${serverPath}/users/`,
            {
              nowPassword: currPassword,
              newPassword,
            },
            headers
          );

          if (res.status === 200) {
            setOkModalOpen(true);
            console.log(res);
          }
        } catch (err) {
          console.log(err);
          setInvaildModalOpen(true);
        }
      }
    })();
  };

  const NicknameNofication = () => {
    if (
      !nicknameValidCheck(newNickname) &&
      newNickname.length < 2 &&
      newNickname
    ) {
      return <Nofication>닉네임은 2글자 이상이여야 합니다!</Nofication>;
    }
    if (!nicknameValidCheck(newNickname) && newNickname) {
      return <Nofication>한글, 영문, 숫자만 가능합니다 </Nofication>;
    }
    return null;
  };

  const PasswordNofication = () => {
    if (newPassword && newPassword.length < 6) {
      return <Nofication>6자 이상이어야 합니다</Nofication>;
    } else {
      return null;
    }
  };

  const clickSignoutBtn = async () => {
    setSignoutModal(true);
  };

  const deleteAccount = async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios.delete(`${serverPath}/users`, headers);

    sessionStorage.clear();
    window.location.reload();
    navigate("/");
  };

  const NickNameBtn = () => {
    if (newNickname) {
      return (
        <ConfirmBtn onClick={clickModifyNicknameBtn}>
          <span>닉네임 변경</span>
        </ConfirmBtn>
      );
    } else {
      return (
        <ConfirmBtn disabled={true}>
          <span>닉네임 변경</span>
        </ConfirmBtn>
      );
    }
  };

  const PasswordBtn = () => {
    if (currPassword && newPassword) {
      return (
        <ConfirmBtn onClick={clickModifyPasswordBtn}>
          <span>비밀번호 변경</span>
        </ConfirmBtn>
      );
    } else {
      return (
        <ConfirmBtn disabled={true}>
          <span>비밀번호 변경</span>
        </ConfirmBtn>
      );
    }
  };

  const SignoutBtnBy = () => {
    return (
      <SignoutBtn onClick={clickSignoutBtn}>
        <span>회원탈퇴</span>
      </SignoutBtn>
    );
  };
  const modalHandler = (modal) => {
    if (modal === "ok") {
      okModalOpen ? setOkModalOpen(false) : setOkModalOpen(true);
    }
    if (modal === "invalid") {
      invaildModalOpen ? setInvaildModalOpen(false) : setInvaildModalOpen(true);
    }
    if (modal === "signout") {
      signoutModal ? setSignoutModal(false) : setSignoutModal(true);
    }
  };

  return (
    <Container>
      {okModalOpen ? (
        <OneBtnModal
          close={() => modalHandler("ok")}
          main={"회원정보 변경이 완료되었습니다"}
          nav={-1}
        />
      ) : null}
      {invaildModalOpen ? (
        <OneBtnModal
          close={() => modalHandler("invalid")}
          main={"비밀번호가 다릅니다."}
        />
      ) : null}
      {signoutModal ? (
        <TwoBtnModal
          close={() => modalHandler("signout")}
          action={deleteAccount}
          main={
            "정말로 회원탈퇴 하시겠습니다?\n삭제된 정보는 복구 할 수 없습니다."
          }
        />
      ) : null}

      <UserInfoBox>
        <PageTitle>회원정보 수정</PageTitle>
        <div className="fields">
          <div className="form">
            <div>새로운 닉네임</div>
            <input
              type="text"
              placeholder="변경할 닉네임을 입력합니다"
              onBlur={nicknameCheckHandler}
            />
            <NicknameNofication />
            <NickNameBtn className="btn-location" />
          </div>

          <div className="form">
            <div>현재 비밀번호</div>
            <input
              type={"password"}
              placeholder="비밀번호 변경을 위해서는 필수입력입니다."
              onBlur={(e) => {
                setCurrPassword(e.target.value);
              }}
            />
          </div>
          <div className="form">
            <div>새로운 비밀번호</div>
            <input
              type={"password"}
              placeholder="변경할 비밀번호를 입력 합니다."
              onBlur={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <PasswordNofication />
            <PasswordBtn />
          </div>
        </div>
        <SignoutBtnBy />
      </UserInfoBox>
    </Container>
  );
}

export default ModifyMyinfo;
