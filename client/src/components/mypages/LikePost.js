import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../Card";

const TitleContainer = styled.div`
  display: grid;

  grid-template-rows: 1fr;

  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  height: max-content;
`;

function LikePost() {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const userId = window.sessionStorage.getItem("userId");
  const accessToken = window.sessionStorage.getItem("loginToken");
  const page = 1;
  const limit = 12;
  const [likePost, setLikePost] = useState([]);

  useEffect(() => {
    getUserPost();
  }, []);

  async function getUserPost() {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const res = await axios.get(
      `${serverPath}/users/likes?pages=${1}&limit=12`,
      headers
    );

    setLikePost(res.data.boards.rows);
  }
  console.log(likePost);
  return (
    <React.Fragment>
      <TitleContainer>
        <Card LikePost={likePost} />
      </TitleContainer>
    </React.Fragment>
  );
}

export default LikePost;
