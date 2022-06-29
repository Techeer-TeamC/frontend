import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
// import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from "react-router-dom"
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/Mainpage';
import LoginPage from './pages/Loginpage';
import Test from './pages/Test.tsx';
import RegisterPage from './pages/Registerpage';
import Recent from './components/recent';
import Bag from './components/bag';
import Auth from './assets/auth';
import Search from "./pages/Search";
import Detail from "./pages/Detail";


//렌더링 할 페이지 설정해주는 곳

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/recent" element={<Recent />} />
      <Route path="/bag" element={<Bag />} />
      <Route path="/search/:keyword" element={<Search />} />
      <Route path="/test" element={<Test />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="products/detail/:id" element={<Detail />} />
    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
