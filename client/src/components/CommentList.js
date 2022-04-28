// import '../scss/CommentList.scss';
import React from 'react';
import CommentListEntry from './CommentListEntry';
import { useState } from "react";

import styled from "styled-components";

const CommentListContainer = styled.section`
    margin-bottom: 1rem;
`

// const CommentList = ({ comments, getCommentList, userId }) => {
const CommentList = () => {
    const userId = '1'
    const comments = [ 
        {UserId: '1', User: { nickname: "캠핑사랑"} ,comment: "좋은 정보 감사합니다" },
        {UserId: '2', User: { nickname: "보이지않는사람"}, comment: "2번 사용자니 수정 및 삭제 불가!!"}]


  if (comments === null) {
    return <></>;
  }
 
  return (
    <CommentListContainer>
      {comments.map((comment, i) => (
        <CommentListEntry
        //   key={comment.id}
          key={i}
          comment={comment}
        //   getCommentList={getCommentList}
          userId={userId}
        />
      ))}
    </CommentListContainer>
  );
};

export default CommentList;
