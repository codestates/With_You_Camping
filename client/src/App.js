import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ModifyMyinfo from "./pages/ModifyMyinfo";
import Mypage from "./pages/Mypage";
import Postdetail from "./pages/Postdetail";
import Postedit from "./pages/Postedit";
import AddPost from "./pages/addPost";
import Postlist from "./pages/Postlist";

const GlobalStyles = createGlobalStyle`

    /* font-family: 'Noto Sans KR', sans-serif; */
    

    a {
      color : black;
    }
    
    ${reset}
    .main{
      /* overflow: hidden; */
      /* 모달이 열린 경우 뒤의 화면의 스크롤이 생기지 않게 하려면 위의 내용을 추가시켜 줘야한다. */
      /* 모달이 열린 경우를 상태로 저장하여 클래스이름을 조건부 렌더링하면 해결 가능할 듯 */
      /* true ? className="main activeModal" : className="main"*/
    }
`;

const Container = styled.div`
position: relative;
width: 100vw;
min-height: 100vh;
`

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  
  height: max-content;
  min-height: 800px;
  
  margin-top: 100px;
  margin-bottom: 200px;
`



function Router() {

  const { pathname } = useLocation();
useEffect(() => {
  window.scrollTo(0, 0)
}, [pathname])


  return (
    <Container>
      <GlobalStyles />
      <Navbar />
      <InnerContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/postlist" element={<Postlist />} />
        <Route path="/postdetail" element={<Postdetail />} />
        <Route path="/post" element={<AddPost />} />
        <Route path="/postedit" element={<Postedit />} />
        <Route path="/modifymyinfo" element={<ModifyMyinfo />} />
      </Routes>
      </InnerContainer>
    </ Container>
  );
}

function App() {
  return <Router />;
}

export default App;
//dispatch로 message를 전달해서 action 넣고 action을 체크한다
