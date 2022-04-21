import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "../Modal/LoginModal";

const Nav = styled.nav``;

const Div = styled.div`
  margin: 40px 30px;
`;

const Page = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 200px;
`;

const Button = styled.button``;

function Home() {
  const [onLogin, setLogin] = useState(false);

  const onClick = () => {
    setLogin(!onLogin);
  };

  return (
    <Nav>
      <Button type="button" onClick={onClick}>
        버튼
      </Button>
      {onLogin ? (
        <Page>
          <Div>
            <NavLink to="/mypage">마이페이지</NavLink>
          </Div>
          <Div>
            <NavLink to="/postdetail">상세 게시판</NavLink>
          </Div>
          <Div>
            <NavLink to="/postfrom">게시물 작성</NavLink>
          </Div>
          <Div>
            <NavLink to="/rank">이주의 랭킹</NavLink>
          </Div>
        </Page>
      ) : (
        <Page>
          <Div>
            <LoginModal />
          </Div>
          <Div>
            <NavLink to="/postdetail">상세 게시판</NavLink>
          </Div>
          <Div>
            <NavLink to="/postfrom">게시물 작성</NavLink>
          </Div>
          <Div>
            <NavLink to="/rank">이주의 랭킹</NavLink>
          </Div>
        </Page>
      )}
    </Nav>
  );
}

export default Home;
