import React from 'react';
import { BiUser } from 'react-icons/bi';
// import Login from '@components/Loginbutton.js';
import { Link } from 'react-router-dom';
// import Recent from '../components/recent';
// import Bag from '../components/bag';
// import LoginButton from '../components/Loginbutton';
// import { useNavigate } from "react-router-dom";
import './Mainpage.css';



function Mainpage() {
  
  //변수, 이벤트 등등 설정 해주는 곳

  const handleClick = (e) => {
    <Link to="/login"></Link>}

  return ( //실제 화면에 출력할 내용들 설정 해주는 곳
    <div>
      <header>
            <nav id="box">
              <ul id="loginbutton">
                <li><div><BiUser/></div></li>
                <li><button onClick={handleClick}><BiUser/>Login</button></li>
              </ul></nav></header>
      


      
      <section className="section1">
        <div id="name_search">
              <div id="webname">
                {/* 새로고침 <a href=“teamc_mainpage.html” target="_self"> */}
                  SEARCH.<span>IT</span>
                  {/* </a> */}
                </div>
            
              <div id="container">
                  <input type="search" placeholder="Search..."/> 
                  {/* onChange={onChange}/>  */}
                  <button type="button" id="search_btn"/></div></div></section>
                  {/* onClick={onClick}/> */}
                




      <section className="section2">
        <div id="nav_article">
            {/* <BrowserRouter> */}
              <nav>
                  <ul>
                      <li id="recent"><Link to="recent">Recent</Link></li>
                      <li>&nbsp;&nbsp;</li><li>&nbsp;&nbsp;</li>
                      <li id="bag"><Link to="bag">What's In My Bag</Link></li></ul>
              </nav>    
                {/* <article>
                  <Routes>
                    <Route path="recent" element={<Recent />} />
                    <Route path="bag" element={<Bag />} />
                  </Routes>
                </article> */}
            {/* </BrowserRouter> */}
        </div></section>

    </div>
  );
}

export default Mainpage;
