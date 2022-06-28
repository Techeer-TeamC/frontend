import React from 'react';
import { BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import './Mainpage.css';



function Mainpage() {
  
  //변수, 이벤트 등등 설정 해주는 곳

  //로그아웃 버튼 이벤트
//   const onClickHandler = () => {
//     axios.get('주소')
//     .then(response => {
//         if (response.data.success) {
//             props.history.push('/');
//         } else {
//             alert('로그아웃 실패');
//         }
        
//     })
// }  

  return ( //실제 화면에 출력할 내용들 설정 해주는 곳
    <div>
      <header>
            <nav id="box">
              <ul id="loginbutton">
                <li><div><BiUser/></div></li>
                <li><Link to="/login"><button>Login</button></Link></li>
              </ul></nav></header>
      


      
      <section className="section1">
        <div id="name_search">
              <div id="webname">
                  SEARCH.<span>IT</span>
                </div>
            
              <div id="container">
                  <input type="search" placeholder="Search..."/> 
                  <button type="button" id="search_btn"/></div></div></section>

                




      <section className="section2">
        <div id="nav_article">
              <nav>
                  <ul>
                      <li id="recent"><Link to="/recent">Recent</Link></li>
                      <li>&nbsp;&nbsp;</li><li>&nbsp;&nbsp;</li>
                      <li id="bag"><Link to="/bag">What's In My Bag</Link></li></ul>
              </nav>    
        </div></section>

    </div>
  );
}

export default Mainpage;