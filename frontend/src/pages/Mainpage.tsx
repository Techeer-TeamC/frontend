import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Mainpage.css";
import CommonNavbar from "../components/CommonNavbar";

function Mainpage() {
  const [value, setValue] = useState("");

  return (
    <div>
      <header>
        <CommonNavbar />
      </header>

      <section className="section1">
        <div id="name_search">
          <div id="name-box">
            Fish-<span>IT</span>
          </div>

          {/* 여기 */}
          <div id="search-box">
            <input
              className="search-txt"
              type="text"
              placeholder="Search whatever you want"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
            />
            <button
              className="search-btn"
              type="button"
              onClick={() => (window.location.href = "/search/" + value)}
            >
              {<BiSearchAlt />}
            </button>
          </div>
          {/* <style>
                #search_btn {border-radius:50%}
              </style> */}

          {/* 여기 */}

          {/* 여디 */}
        </div>
      </section>

      <section className="section2">
        {/* <div id="nav_article">
          <nav>
            <ul>
              <li id="recent">
                <Link to="/recent">Recent</Link>
              </li>
              <li>&nbsp;&nbsp;</li>
              <li>&nbsp;&nbsp;</li>
              <li id="bag">
                <Link to="/bag">What&#39;s In My Bag</Link>
              </li>
            </ul>
          </nav>
        </div> */}
      </section>
    </div>
  );
}

export default Mainpage;
