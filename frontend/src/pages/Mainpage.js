import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Mainpage.css";
import CommonNavbar from "../components/CommonNavbar";

function Mainpage() {
  const [value, setValue] = useState("");

  return (
    //실제 화면에 출력할 내용들 설정 해주는 곳

    <div>
      <header>
        <CommonNavbar />
      </header>

      <section className="section1">
        <div id="name_search">
          <div id="webname">
            SEARCH.<span>IT</span>
          </div>

          <div id="container">
            <input
              type="search"
              placeholder="Search..."
              onChange={(event) => setValue(event.target.value)}
            />
            <button
              type="button"
              id="search_btn"
              onClick={() =>
                (window.location.href =
                  "/search/" +
                  (value.replace(/(\s*)/g, "")
                    ? value.replace(/(\s*)/g, "")
                    : "undefined"))
              }
            />
          </div>
          {/* <style>
                #search_btn {border-radius:50%}
              </style> */}
        </div>
      </section>

      <section className="section2">
        <div id="nav_article">
          <nav>
            <ul>
              <li id="recent">
                <Link to="/recent">Recent</Link>
              </li>
              <li>&nbsp;&nbsp;</li>
              <li>&nbsp;&nbsp;</li>
              <li id="bag">
                <Link to="/bag">Whats In My Bag</Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
}

export default Mainpage;
