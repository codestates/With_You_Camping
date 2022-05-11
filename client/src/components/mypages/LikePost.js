import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import Card from "../Card";

function LikePost() {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const accessToken = window.sessionStorage.getItem("loginToken");

  const [page, setPage] = useState(0);
  const [likePost, setLikePost] = useState([]);
  const [postEnd, setEndPost] = useState(true);

  const viewmore = useRef(null);

  useEffect(() => {
    getUserPost();
  }, []);

  async function getUserPost() {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const res = await axios.get(
        `${serverPath}/users/likes?pages=${1}&limit=12`,
        headers
      );
      setLikePost(res.data.boards.rows);
    } catch (err) {}
  }
  console.log(likePost);

  async function getPage(pages) {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    if (pages <= page) {
      try {
        const res = await axios.get(
          `${serverPath}/users/likes?pages=${pages}&limit=12`,
          headers
        );
        console.log(pages);
        if (
          res.data.message === "내가 쓴 게시물을 불러왔습니다," ||
          res.data.boards.count > 0
        ) {
          console.log("게시물을 불러왔습니다");
          setLikePost([...likePost, ...res.data.boards.rows]);
          setEndPost(true);
          console.log(res.data.boards.rows);
        } else if (
          res.data.message === "게시물이 존재하지 않습니다." ||
          res.data.boards.count === 0
        ) {
          console.log("존재하지 않습니다.");
          setEndPost(false);
        }
      } catch (err) {}
    }
  }

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    getPage(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && viewmore.current) {
          viewmore.current.click();
        }
      },
      { threshold: 1 }
    );

    if (viewmore.current) {
      observer.observe(viewmore.current);
    }
  }, [likePost]);

  return (
    <React.Fragment>
      {postEnd ? <Card LikePost={likePost} /> : null}

      <div ref={viewmore} onClick={loadMore}></div>
    </React.Fragment>
  );
}

export default LikePost;
