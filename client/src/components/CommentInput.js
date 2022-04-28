import axios from "axios";
import React, { useState } from "react";
// import { useDispatch } from 'react-redux';
// import { setLoginModal, setMessageModal } from '../actions';
import styled from "styled-components";

const CommentInputArea = styled.section`
  margin: {
    top: 1rem;
    bottom: 3rem;
  }
  width: 100%;
  height: 6rem;

  textarea {
    width: 96%;
    height: 6rem;
    padding: 1rem;
    background-color: #f6f3f2;
    outline: none;
    border: none;
    border-radius: 1rem;
    resize: none;
  }
  button {
    float: right;
    display: grid;
    place-items: center;
    margin-top: 10px;
    padding-top: 0.3rem;
    width: 5rem;
    height: 2rem;
    border-radius: 10px;
    border: 0;
    outline: 0;
    cursor: pointer;
    background-color: #ccf3cb;
    /* color: #c7c4ba;  */
    &:hover {
      transform:  translateY(-2px);
      box-shadow: 0px 5px 4px rgba(0,0,0,0.1);
    }
  }
`;

const CommentInput = ({ getCommentList, post, isLogin }) => {
  const [comment, setComment] = useState("");
  //   const dispatch = useDispatch();

  //   const sendCommentToServer = () => {
  //     if (!isLogin) {
  //       dispatch(setLoginModal(true));
  //       return;
  //     } else if (comment === '') {
  //       dispatch(setMessageModal(true, '댓글을 입력해주세요.'));
  //       return;
  //     }

  //     axios
  //       .post(
  //         `${process.env.REACT_APP_API_URL}/comments/${post.id}`,
  //         {
  //           comment: comment,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.accessToken}`,
  //             'Content-Type': 'application/json',
  //           },
  //         },
  //       )
  //       .then(() => {
  //         dispatch(setMessageModal(true, '댓글을 등록했습니다.'));
  //         getCommentList();
  //         setComment('');
  //       })
  //       .catch((err) => {
  //         if (err) throw err;
  //       });
  //   };

  return (
    <CommentInputArea>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 입력해주세요"
        maxLength="300"
      ></textarea>
      {/* <button className="btn" onClick={sendCommentToServer}> */}
      <button className="btn">등록하기</button>
    </CommentInputArea>
  );
};

export default CommentInput;
