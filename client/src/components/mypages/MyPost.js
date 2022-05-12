/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../Card";

const DownContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: center;

  @media screen and (max-width: 500px) {
    position: static;
    display: flex;
    width: 100%;
    justify-content: space-between;
    justify-content: center;

    float: left;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  position: relative;
  top: 900px;
  right: 3%;
  margin-left: 10px;
  align-items: flex-end;
  justify-content: center;
  @media screen and (max-width: 500px) {
    position: static;
    margin-top: 30px;
    margin-right: 30px;
  }
`;

const ClickButton = styled.button`
  cursor: pointer;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 26px;
  color: #605c59;

  background: #f1f3ef;
  border: none;
  border: 1px solid none;
  box-sizing: border-box;
  border-radius: 100px;
  width: auto;
  height: 40px;
  padding-left: 20px;
  padding-right: 20px;
  @media screen and (max-width: 500px) {
    font-weight: 300;
    font-size: 20px;
    height: 30px;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

function MyPost() {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const accessToken = window.sessionStorage.getItem("loginToken");

  const [page, setPage] = useState(1);
  const [userPost, setUserPost] = useState([]);

  const [pageNumber, setPageNumber] = useState([]);

  useEffect(() => {
    getUserPost();
  }, [page]);

  async function getUserPost() {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const res = await axios.get(
        `${serverPath}/users/boards?pages=${page}&limit=12`,
        headers
      );
      setUserPost(res.data.boards.rows);

      let pageArray = [];
      if (res.data.boards.count) {
        if (res.data.boards.count <= 12) {
          pageArray.push(1);
        } else {
          for (let i = 1; i <= res.data.boards.count / 12 + 1; i++) {
            pageArray.push(i);
          }
        }
      }
      setPageNumber(pageArray);
    } catch (err) {
      console.log(err);
    }
  }

  const pageButton = pageNumber.map((page, i) => {
    return (
      <ButtonContainer key={i}>
        <ClickButton onClick={() => setPage(page)}>{page}</ClickButton>
      </ButtonContainer>
    );
  });

  return (
    <>
      <React.Fragment>
        <Card post={userPost} />
        <DownContainer>{pageButton}</DownContainer>
      </React.Fragment>
    </>
  );
}

export default MyPost;
