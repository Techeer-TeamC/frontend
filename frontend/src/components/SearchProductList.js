import React from "react";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";

function SearchProductList({title, url, imageUrl, minimumPrice}) {

  return (
    <div className="col-md-4 border-0">
    <Link to="/products/detail/" state={{url: url}}  className="link-dark product">
   
      <img className="img-fluid mx-auto" src={imageUrl} alt={title} title={title}></img>
      <h3 className="text-center">{
          title.replace(/<b>/gi,"").replace(/<\/b>/gi,"")
        }</h3>
      <h3 className="text-center">최저가 {minimumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
  </Link>
  </div>
  )
};

SearchProductList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SearchProductList;
