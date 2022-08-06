import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import MainPage from "./pages/Mainpage";
import LoginPage from "./pages/Loginpage";
import KakaoRedirectHandler from "./assets/OAuth/KakaoRedirectHandler";
import GoogleRedirectHandler from "./assets/OAuth/GoogleRedirectHandler";
import SignUp from "./pages/SignUp";
import Detail from "./pages/Detail";
import UserProfile from "./pages/UserProfile";
import ChangePassword from "./pages/ChangePassword";
import Search from "./pages/Search";
import ProductRegisterList from "./pages/ProductRegisterPage";
import axios from "./api/axios";
import RequireAuth from "./components/RequireAuth";

function App() {
  const nowDate = new Date().getTime();

  useEffect(() => {
    try {
      if (localStorage.accessToken) {
        if (nowDate > Number(localStorage.tokenValidTime) + 60) {
          axios({
            method: "post",
            url: `auth/reissue`,
            data: {
              accessToken: localStorage.accessToken,
              refreshToken: localStorage.refreshToken,
            },
          }) //userId값을 헤더로부터 가져와서 넣을 것
            .then(function (response) {
              localStorage.setItem("refreshToken", response.data.refreshToken);
              localStorage.setItem("accessToken", response.data.accessToken);
              console.log("토큰 갱신 처리 완료");
            })
            .catch(function (error) {
              console.error("refresh토큰 만료");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("accessToken");
            });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [nowDate]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/login"
          element={
            <RequireAuth isLogin={localStorage.accessToken == null}>
              {" "}
              <LoginPage />{" "}
            </RequireAuth>
          }
        />
        <Route path="/oauth/kakao" element={<KakaoRedirectHandler />} />
        <Route path="/oauth/google" element={<GoogleRedirectHandler />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/products/detail/" element={<Detail />} />
        <Route
          path="/products/list"
          element={
            <RequireAuth isLogin={localStorage.accessToken != null}>
              {" "}
              <ProductRegisterList />{" "}
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
