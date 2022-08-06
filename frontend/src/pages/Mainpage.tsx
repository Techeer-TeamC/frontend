import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import "./Mainpage.css";
import CommonNavbar from "../components/CommonNavbar";

function Mainpage() {
  const [value, setValue] = useState("");

  return (
    <div>
      <CommonNavbar />
      <section className="section1">
        <div id="name_search">
          <div id="name-box">
            Fish-<span>IT</span>
          </div>
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
        </div>
      </section>
    </div>
  );
}

export default Mainpage;
