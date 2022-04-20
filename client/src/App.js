import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mypage from "./pages/Mypage";
import Postdetail from "./pages/Postdetail";
import Postfrom from "./pages/Postfrom";
import Rank from "./pages/Rank";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/postdetail" element={<Postdetail />} />
        <Route path="/postfrom" element={<Postfrom />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return <Router />;
}

export default App;
