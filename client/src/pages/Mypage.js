import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import ModifyMyinfo from "./ModifyMyinfo";
import MyPost from "../components/mypages/MyPost";
import LikePost from "../components/mypages/LikePost";

const TabContainer = styled.div`
  position: relative;
  right: 500px;
  top: 50px;
  flex-direction: column;

  div {
    margin-bottom: 70px;
    padding-bottom: 2em;
    border-bottom: #c0c0c0 solid 2px;
    font-size: 1.5rem;
  }

  ul,
  li {
    font-weight: 300;
    .active {
      color: #12b886;
    }
    * {
      margin-top: 4em;
      :hover {
        color: #12b886;
        cursor: pointer;
        font-weight: bold;
      }
    }
  }
`;
const MyPageContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: {
    top: 3rem;
    left: auto;
    right: auto;
    bottom: 1rem;
  }
  max-width: 800px;
  justify-content: center;
  .container {
    font-family: "Stylish", sans-serif;
    position: relative;

    text-align: center;

    margin: 0 auto;
    max-width: 1130px;
    height: max-content;
  }
  .post-list {
    position: relative;
    left: 30%;
    top: -7%;
  }
`;

const ContentsContainer = styled.div`
  margin: {
    top: 2rem;
    bottom: 2rem;
  }
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 350px;
  word-break: break-all;

  padding-bottom: 2rem;
  border-bottom: 1px solid $color-grey-border;
  @media screen and (max-width: 500px) {
    right: 5%;
    bottom: 5%;
    transform: scale(0.8);
  }
`;

const SignContainer = styled.div`
  position: relative;
  left: 100%;
  bottom: 30%;

  width: 1px;

  @media screen and (max-width: 500px) {
    right: 5%;
    bottom: 5%;
    transform: scale(0.8);
  }
`;

function Mypage(page) {
  const navigate = useNavigate();


  

  const tabContents = [
    "게시글",
    "좋아요",
    "회원 정보수정"];
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
