import React from "react";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import "./searchProductList.css";

function SearchProductList({id, title, poster}) {

  return (
    <div className="col-md-4 border-0">
    <a className="link-dark product"
     href={"/products/detail/"+id} target="_blank">
      <img className="img-fluid mx-auto" src={poster} alt={title} titlt={title}></img>
      <h3 className="text-center">{
          title.replace(/<b>/gi,"").replace(/<\/b>/gi,"")
        }</h3>

  </a>
  </div>
  )
};

SearchProductList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SearchProductList;
