import React, {useState} from 'react';
import "./searchProductList.css";
import "../pages/Search"

function SearchBar({keyword}) {

  const[value , setValue] = useState(keyword);

  return (
      <div className = "search-container">
        <div className="input-group rounded">
          <input className = "form-control rounded"  type="text" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={value}
                 onChange={(event) => setValue(event.target.value)}
          />
          <button className="btn btn-outline-primary" type="button"  onClick={() => window.location.href="/search/"+value} > SEARCH </button>
        </div>
      </div>
  )
};


export default SearchBar;
