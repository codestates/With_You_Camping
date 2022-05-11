/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Card from "../Card";

function MyPost() {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const accessToken = window.sessionStorage.getItem("loginToken");

  const [page, setPage] = useState(0);
  const [userPost, setUserPost] = useState([]);
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
    //setUserPost([]);
    setPage(1);
    console.log("첫번째");
    try {
      const res = await axios.get(
        `${serverPath}/users/boards?pages=${1}&limit=12`,
        headers
      );
      setUserPost(res.data.boards.rows);
    } catch (err) {}
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getPage(pages) {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    console.log("getPage 실행");
    if (pages < page) {
      try {
        const res = await axios.get(
          `${serverPath}/users/boards?pages=${pages}&limit=12`,
          headers
        );

        if (
          res.data.message === "내가 쓴 게시물을 불러왔습니다," ||
          res.data.boards.count > 0
        ) {
          console.log("게시물을 불러왔습니다", pages);
          setUserPost([...userPost, ...res.data.boards.rows]);
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
          console.log("viewmore", entries[0].isIntersecting);
          viewmore.current.click();
        }
      },
      { threshold: 1 }
    );

    if (viewmore.current) {
      observer.observe(viewmore.current);
    }
  }, [userPost]);

  return (
    <React.Fragment>
      {postEnd ? <Card post={userPost} /> : null}
      <div ref={viewmore} onClick={loadMore}></div>
    </React.Fragment>
  );
}

export default MyPost;
