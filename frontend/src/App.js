import React from 'react';
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { useEffect,useState } from 'react';
import MainPage from './pages/Mainpage';
import LoginPage from './pages/Loginpage';
import KakaoRedirectHandler from './assets/OAuth/KakaoRedirectHandler';
import GoogleRedirectHandler from './assets/OAuth/GoogleRedirectHandler';
import Test from './pages/Test.tsx';
import RegisterPage from './pages/Registerpage';
import Graph from './components/Graph/GraphHandler';
// import Tokenfunction from './assets/Tokenfunction';
import Detail from './pages/Detail'
import Search from './pages/Search'
import ProductRegisterList from './pages/ProductRegisterPage'
import axios from 'axios';
import RequireAuth from './components/RequireAuth'


function App() {
  const [isLogin , setIsLogin] = useState(false);
  const nowDate = new Date().getTime();


  useEffect(()=>{
    try{
      
      if(!localStorage.accessToken)
      {
        setIsLogin(false);
      }
      else {
        setIsLogin(true);
        if (nowDate > ((Number(localStorage.tokenValidTime)) + 60)) {
          axios({
            method: 'post',
            url: `http://3.39.75.19:8080/api/v1/auth/reissue`,
            data: {
              accessToken: localStorage.accessToken,
              refreshToken: localStorage.refreshToken
            }
          })//userId값을 헤더로부터 가져와서 넣을 것
          .then(function (response) {
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('accessToken', response.data.accessToken);
            console.log("토큰 갱신 처리 완료")
          })
          .catch(function (error) {
            console.error("refresh토큰 만료");
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            setIsLogin(false);
          })
        }
      }
 
    }catch(e){
      console.log(e);
    }
  },[nowDate]);


  
    return(
        
  <BrowserRouter>
    
    <Routes>
     
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={  <RequireAuth isLogin={localStorage.accessToken == null}>  <LoginPage />  </RequireAuth>} />
      <Route path="/oauth/kakao" element={<KakaoRedirectHandler/>} />
      <Route path="/oauth/google" element={<GoogleRedirectHandler/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/test" element={<Test />} />
      <Route path="/search/:keyword" element={<Search />} />

      <Route path="/products/detail/" element={<Detail />} />
      <Route path="/products/list" element={  <RequireAuth isLogin={localStorage.accessToken != null}>  <ProductRegisterList /> </RequireAuth>} />
      <Route path="/chart" element={<Graph/>} />






      {/* <AuthRoute exact isLogin={isLogin} path="/" element={<MainPage/>} />
      <Route path="/login"  render={(props)=> <LoginPage {...props} loginCallBack={loginCallBack}/>} /> */}
      {/* <AuthRoute path="/counter" isLogin={isLogin} component={Counnter} /> */}
      {/* <Route path="/auth" element={<Auth />} /> */}
      {/* <AuthRouth
        authenticated={authenticated}
        path="/mybag"
        render={props => <Profile user={user} {...props} />}
      />   */}
    </Routes>
  
  </BrowserRouter>
   

    );
};

export default App;
