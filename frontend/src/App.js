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

//렌더링 할 페이지 설정해주는 곳

export default function() {
//  App = ({isLoggedin}) => {

    useEffect(()=>{
     
    },[]);

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
      {/* {isLoggedin ? (<Route exact path="/" element={<MainPage/>} />
      ):(
        <Route exact path="/" element={<Test/>} />
      )} */}


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
