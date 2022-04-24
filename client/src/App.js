import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ModifyMyinfo from "./pages/ModifyMyinfo";
import Mypage from "./pages/Mypage";
import Postdetail from "./pages/Postdetail";
import Postedit from "./pages/Postedit";
import Postfrom from "./pages/Postfrom";
import Postlist from "./pages/Postlist";

function Router() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/postlist" element={<Postlist />} />
        <Route path="/postdetail" element={<Postdetail />} />
        <Route path="/postfrom" element={<Postfrom />} />
        <Route path="/postedit" element={<Postedit />} />
        <Route path="/modifymyinfo" element={<ModifyMyinfo />} />
      </Routes>
    </>
  );
}

function App() {
  return <Router />;
}

export default App;
//dispatch로 message를 전달해서 action 넣고 action을 체크한다
