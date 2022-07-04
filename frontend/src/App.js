import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './pages/App';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { useEffect,useState } from 'react';
import MainPage from './pages/Mainpage';
import LoginPage from './pages/Loginpage';
import Test from './pages/Test.tsx';
import RegisterPage from './pages/Registerpage';
import Recent from './components/recent';
import Bag from './components/bag';
import Tokenfunction from './assets/Tokenfunction';
import Detail from './pages/Detail'
import Search from './pages/Search'
import ProductRegisterList from './pages/ProductRegisterPage'
import client from './util/client'
import axios from 'axios';
import RequireAuth from './components/RequireAuth'
//렌더링 할 페이지 설정해주는 곳

function App() {
  const [isLogin , setIsLogin] = useState(false);
  const [loading , setLoading] = useState(false);
  const nowDate = new Date().getTime();


  useEffect(()=>{
    try{
      if(!localStorage.accessToken)
      {
        setIsLogin(false);
      }
      else {
        if (nowDate > localStorage.tokenValidTime + 60) {
          axios({
            method: 'post',
            url: `http://localhost:8080/api/v1/auth/reissue`,
            data: {
              accessToken: localStorage.accessToken,
              refreshToken: localStorage.refreshToken
            }
          })//userId값을 헤더로부터 가져와서 넣을 것
          .then(function (response) {
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('accessToken', response.data.accessToken);
            console.log("refresh정상 처리")
          })
          .catch(function (error) {
            console.error("refresh에러");
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            setIsLogin(true);
          })
          .finally(() => {
            console.log("login request end");
            setLoading(true);
          });
        }
      }
  }catch(e){
      console.log(e);
    }
  },[]);


  function loginCallBack(login){
    setIsLogin(login);
  }

    return(
        
  <BrowserRouter>
    
    <Routes>
     
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/recent" element={<Recent />} />
      <Route path="/bag" element={<Bag />} />
      <Route path="/test" element={<Test />} />
      <Route path="/tf" element={<Tokenfunction />} />
      <Route path="/search/:keyword" element={<Search />} />

      <Route path="/products/detail/" element={<Detail />} />
      <Route path="/products/list" element={  <RequireAuth> <ProductRegisterList /> </RequireAuth>} />

 







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
