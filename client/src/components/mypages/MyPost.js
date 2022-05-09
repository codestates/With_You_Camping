import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Card from "../Card";
import { PageTitle } from "../pageTitle";

const TitleContainer = styled.div``;

const Title = styled.span`
  position: relative;
  right: -100%;
  bottom: 10%;
`;

function MyPost() {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const userId = window.sessionStorage.getItem("userId");
  const accessToken = window.sessionStorage.getItem("loginToken");

  const [page, setPage] = useState(1);
  const [userPost, setUserPost] = useState([]);
  const [postEnd, setPostEnd] = useState(false);

  const viewmore = useRef();

  useEffect(() => {
    getUserPost();
  }, []);

  async function getUserPost() {
    console.log(page);
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    // setUserPost([]);
    // setPage(1);
    try {
      const res = await axios.get(
        `${serverPath}/users/boards?pages=${page}&limit=12`,
        headers
      );
      if (res.status === 200) {
        setUserPost(res.data.boards.rows);
      }
    } catch (err) {}
  }
  // console.log(userPost);
  // console.log(page);
  // const getPage = async (page) => {
  //   const headers = {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   };
  //   try {
  //     const res = await axios.get(
  //       `${serverPath}/users/boards?pages=${page}&limit=12`,
  //       headers
  //     );
  //     if (res.status === 200 && res.data.boards.rows.length > 0) {
  //       console.log(page);
  //       setUserPost([...userPost, ...res.data.boards.rows]);
  //     }
  //     if (res.data.posts.length === 0) {
  //       setPostEnd(true);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const loadMore = () => {
  //   setPage(page + 1);
  // };

  // useEffect(() => {
  //   getPage();
  // }, [page]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && viewmore.current) {
  //         viewmore.current.click();
  //       }
  //     },
  //     { threshold: 1 }
  //   );

  //   if (viewmore.current) {
  //     observer.observe(viewmore.current);
  //   }
  // }, [userPost]);

  return (
    <React.Fragment>
      {userPost ? <Card post={userPost} /> : null}

      {/* <div ref={viewmore} onClick={loadMore} /> */}
    </React.Fragment>
  );
}

export default MyPost;
