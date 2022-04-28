import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import axios from "axios";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Mypage from "./pages/Mypage";
import EditPost from "./pages/editPost";
import DetailPost from "./pages/DetailPost";
import AddPost from "./pages/AddPost";
import PostList from "./pages/PostList";
import ModifyMyinfo from "./pages/ModifyMyinfo";
import KakaoCallback from "./pages/KakaoCallback"
import Footer from "./components/Footer";

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
`;

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  height: max-content;
  min-height: 800px;

  margin-top: 100px;
  margin-bottom: 200px;
`;

function Router() {
  const serverPath = process.env.REACT_APP_SERVER_PATH;

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const sessionStorage = window.sessionStorage;

  const [isLogin, setIsLogin] = useState(false);


  useEffect(() => {
    // 로그인을 정상적으로 했다면 세션 스토리지에 loginToken, userId 존재
    if (
      sessionStorage.getItem("loginToken") &&
      sessionStorage.getItem("userId")
    ) {
      (async () => {
        // 해당 api로 발급받은 토큰과 인증 요청 보냄
        const res = await axios.post(`${serverPath}/auth/token/validate`, {
          token: sessionStorage.getItem("loginToken"),
        });
        // 정상적인 토큰이라면 로그인 처리 및 유지
        if (res.data.valid === true) {
          if (
            sessionStorage.getItem("loginToken") &&
            sessionStorage.getItem("userId")
          ) {
            setIsLogin(true);
          }
          // 배포 후 쿠키 설정 필요, 그게 아니라면 쿠키에 저장된 리프레쉬 토큰을 통해 새로운 Access토큰 발급받는다.
        } else if (res.data.valid === false) {
          const res = await axios.get(`${serverPath}/auth/token`);
          // 정상적인 리프레쉬 토큰이라면 다시 Access 토큰 발급
          if (res.status === 200) {
            sessionStorage.setItem("userId", res.data.userId);
            sessionStorage.setItem("loginToken", res.data.accessToken);
            sessionStorage.setItem("loginMethod", "common");
            setIsLogin(true);
            // 그게 아니라면 해당 토큰을 삭제하고 로그인 유지하지 않는다.
          } else {
            window.sessionStorage.clear();
            setIsLogin(false);
          }
        }
      })();
    }
  }, []);

  return (
    <Container>
      <GlobalStyles />
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <InnerContainer>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/postlist" element={<PostList />} />

          <Route path="/add_post" element={<AddPost />} />
          <Route path="/post" element={<DetailPost />} />
          <Route path="/edit_post" element={<EditPost />} />

          <Route path="/mypage" element={<Mypage />} />
          <Route path="/modifymyinfo" element={<ModifyMyinfo />} />

          {/* <Route path="callback/naver" element={<NaverCallback />} /> */}
          <Route path="callback/kakao" element={<KakaoCallback isLogin={isLogin} setIsLogin={setIsLogin} />} />
        </Routes>
      </InnerContainer>
      <Footer />
    </Container>
  );
}

function App() {
  return <Router />;
}

export default App;
//dispatch로 message를 전달해서 action 넣고 action을 체크한다
