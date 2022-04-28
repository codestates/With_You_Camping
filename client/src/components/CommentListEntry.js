import axios from "axios";
import React, { useState } from "react";

import styled from "styled-components";

const CommmentAreaContainer = styled.section`
  padding: 0.5rem;
  .header {
    display: flex;
    justify-content: space-between;
    .nickname {
      font: {
        weight: 700;
        size: 1.2rem;
      }
    }
    i {
      padding-left: 0.4rem;
      cursor: pointer;
    }
  }
  .date {
    color: gray;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
  .hide {
    display: none;
  }
  textarea {
    width: 100%;
    height: 4rem;
    padding: 0.5rem;
    resize: none;
  }

  .content {
    padding-bottom: 0.8rem;
    margin-bottom: 0;
  }

  hr {
    margin: {
      top: 1rem;
      bottom: 1rem;
    }
  }
`;

const CommentListEntry = ({ comment, getCommentList, userId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [commentValue, setCommentValue] = useState(comment.comment);

  const editComment = () => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/comments/${comment.id}`,
        {
          comment: commentValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      )
      .then(() => {
        setIsEdit(false);
        getCommentList();
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  const deleteComment = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/comments/${comment.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then(() => {
        getCommentList();
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  return (
    <CommmentAreaContainer>
      <div className="header">
        <div className="nickname">{comment.User.nickname}</div>
        {comment.UserId === userId ? (
          <React.Fragment>
            <div className={isEdit ? null : "hide"}>
              <i className="fas fa-check" onClick={editComment}></i>
              <i
                className="fas fa-times"
                onClick={() => {
                  setIsEdit(false);
                  setCommentValue(comment.comment);
                }}
              ></i>
            </div>
            <div className={isEdit ? "hide" : null}>
              <i className="fas fa-edit" onClick={() => setIsEdit(true)}></i>
              <i className="fas fa-trash-alt" onClick={deleteComment}></i>
            </div>
          </React.Fragment>
        ) : null}
      </div>

      <div className="date">{"2022-01-03"}</div>
      <textarea
        className={isEdit ? null : "hide"}
        type="text"
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
        maxLength="300"
      ></textarea>
      <div className={isEdit ? "hide" : "content"}>{comment.comment}</div>
      {/* <hr /> */}
    </CommmentAreaContainer>
  );
};

export default CommentListEntry;
