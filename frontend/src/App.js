import { BiUser } from 'react-icons/bi';
import Login from '@components/Loginbutton.js';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div>
      <header>
            <nav id="box">
              <ul id="loginbutton">
                <li><div><BiUser/></div></li>
                <li><span><Login/></span></li></ul></nav></header>
      


      
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
                




      <section class="section2">
        <div id="nav_article">
            <nav>
                <ul>
                    <li id="recent"><a href="recent.html" target="rightFrame">Recent</a></li>
                    <li>&nbsp;&nbsp;</li><li>&nbsp;&nbsp;</li>
                    <li id="bag"><a href="bag.html" target="rightFrame">What's In My Bag</a></li></ul></nav>    
            <article>
            <iframe name="rightFrame" src="recent.html" width="440"></iframe>
                 <iframe name="rightFrame" src="bag.html" width="440"></iframe></article></div></section>

    </div>
  );
}

export default App;
