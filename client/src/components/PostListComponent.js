import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Search from "./Search";
import SelectList from "./SelectList";
import Card from "./Card";
import axios from "axios";

const HLine = styled.div`
  display: grid;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 1240px;
  height: 1px;
  margin-left: 0px;

  background-color: #dad8d6;
`;

const Container = styled.section`
  width: 113%;
  display: grid;

  word-break: break-all;
  height: auto;

  padding-bottom: 2rem;
  border-bottom: 1px solid $color-grey-border;
`;

const InnerContainer = styled.div`
  display: flex;

  @media screen and (max-width: 500px) {
    width: 100%;
  }
  &:hover {
    box-shadow: 0px 0px 8px $color-grey-border;
    img {
      transform: scale(1.02, 1.02);
    }
  }
`;

const TitleContainer = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  /* width: 100%; */
  width: 1250px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  justify-content: space-between;
  float: left;
  margin-top: 40px;
  width: 1px;

  @media screen and (max-width: 300px) {
    right: 5%;
    bottom: 5%;
    transform: scale(0.8);
  }
`;

export default function PostListComponent() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    ReceiveCardList();
  }, []);

  const ReceiveCardList = () => {
    const serverPath = process.env.REACT_APP_SERVER_PATH;
    axios({
      method: "GET",
      url: `${serverPath}/main`,
      params: {
        pages: 1,
        limit: 12,
      },
    }).then((res) => {
      //const data = res.data.boards;
      //console.log(res);
      // console.log(data);
      setPosts(res.data.boards.rows);
    });
  };
  return (
    <Container>
      <TitleContainer>
        게시글 목록 <HLine />
      </TitleContainer>
      <InnerContainer>
        <SelectList />
        <Search />
      </InnerContainer>
      <CardContainer>
        <Card post={posts} />
      </CardContainer>
    </Container>
  );
}
