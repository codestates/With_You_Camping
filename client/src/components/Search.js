import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

const Container = styled.div`
  display: flex;
  justify-content: center;
  select {
    width: 80px;
  }
`;

function Search() {
  return (
    <Container>
      <select name="types">
        <option value="title">제목</option>
        <option value="content">내용</option>
      </select>

      <input
        className="search_input"
        type="text"
        placeholder="검색어를 입력해주세요"
      />
      <FiSearch size={"1.5rem"} />
    </Container>
  );
}

export default Search;
