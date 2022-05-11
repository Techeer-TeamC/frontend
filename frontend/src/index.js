import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import './App.css';
import Bag from '.components/bag';
import Recent from '.components/recent';
import Blank from '.components/blank';

// import App from './App';
import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

function App(){
  return(
    <div>
      <header>
            <nav id="box">
              <ul id="loginbutton">
                <li><div><BiUser/></div></li>
                <li></li></ul></nav></header>
      


      
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
                    <li id="recent"><Link to="/components/recent">Recent</Link></li>
                    <li>&nbsp;&nbsp;</li><li>&nbsp;&nbsp;</li>
                    <li id="bag"><Link to="/components/bag">What's In My Bag</Link></li></ul></nav>    
            <article>
              <Routes>
                <Route exact path="/" element={<Blank />}/>
                <Route path="/component/recent" element={<Recent/>} />
                <Route path="/component/bag" element={<Bag/>}/>
                <Route path="/" element={"Not Found"}/>
          
              </Routes></article></div></section>

    </div>
  )
}

ReactDOM. render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
ServiceWorker.unregister();
