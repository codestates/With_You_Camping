import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import ModifyMyinfo from "./ModifyMyinfo";
import MyPost from "../components/mypages/MyPost";
import LikePost from "../components/mypages/LikePost";

const TabContainer = styled.div`
  display: flex;
  position: sticky !important;
  width: 20%;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  text-align: center;

  margin-top: 2em;
  margin-bottom: 2em;

  span {
    border-bottom: #c0c0c0 solid 1px;
    padding-top: 2em;
    padding-bottom: 2em;
    width: 70%;
    span {
      height: 50%;
    }
  }

  ul {
    @media (max-width: 500px) {
      font-size: 0.7rem;
    }
    display: flex;
    flex-direction: column;
    align-content: space-around;
    .active {
      color: #12b886;
    }
    * {
      margin-top: 4em;
      :hover {
        color: #12b886;
        cursor: pointer;
      }
    }
  }
`;

const MyPageContainer = styled.div`
  font-family: "Stylish", sans-serif;
  display: flex;

  margin: 0 auto;
  max-width: 100%;
  height: 90vh;
`;

const ContentsContainer = styled.div`
  margin-left: 10rem;
`;

const SignContainer = styled.div``;

function Mypage(page) {
  const navigate = useNavigate();

  const tabContents = ["게시글", "좋아요", "회원 정보수정"];
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const userId = window.sessionStorage.getItem("userId");
  const nickname = window.sessionStorage.getItem("nickname");
  const accessToken = window.sessionStorage.getItem("loginToken");

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, []);

  const pageName = [
    "/mypage/mypost",
    "/mypage/likepost",
    "/mypage/modifymyinfo",
  ];

  return (
    <MyPageContainer>
      <TabContainer className="container">
        <div>
          <span>마이페이지</span>
        </div>
        <ul>
          {tabContents.map((e, idx) => {
            return (
              <li
                key={idx}
                onClick={() => {
                  navigate(pageName[idx]);
                }}
                className={page["page"] === idx + "" ? "active" : null}
              >
                {e}
              </li>
            );
          })}
        </ul>
      </TabContainer>
      <ContentsContainer className="post-list">
        {page["page"] === "0" && <MyPost />}
        {page["page"] === "1" && <LikePost />}
      </ContentsContainer>

      <SignContainer>{page["page"] === "2" && <ModifyMyinfo />}</SignContainer>
    </MyPageContainer>
  );
}

export default Mypage;
