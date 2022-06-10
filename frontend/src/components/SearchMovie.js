import React from "react";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import "./Movie.css";

function SearchMovie({id, title, poster}) {
  return (
    <div className="product">
    <a href={"products/detail/"+id} target="_blank">
      <img src={poster} alt={title} titlt={title}></img>
    <div className="product__data">
      <h3 className="product__title">{
          title.replace(/<b>/gi,"").replace(/<\/b>/gi,"")
        }</h3>

    </div>
  </a>
  </div>
  )
};

SearchMovie.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SearchMovie;
