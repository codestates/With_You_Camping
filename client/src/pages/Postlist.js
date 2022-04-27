import React from "react";
import { NavLink } from "react-router-dom";

function Postlist() {



  return (
    <>
      <div>게시글 목록 페이지</div>
      <div>
        <NavLink to="/postdetail">게시글 상세페이지</NavLink>
      </div>
    </>
  );
}

export default Postlist;
