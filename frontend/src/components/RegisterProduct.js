import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import axios from 'axios';
import {AiOutlineSetting}  from 'react-icons/ai';
function RegisterProduct({productId, desiredPrice}) {

  const[productData , setData] = useState({});
  

  useEffect( () => {

    const fetchData = async () => {
      const result = await axios(`http://localhost:8080/api/v1/products/${productId}`);
      setData(result.data);
    };
    fetchData();
  }, []);





  return (
      <div className="col-md-4 border-0">
        <div>
          <button className="btn">
            <AiOutlineSetting />
          </button>
        <button className="btn-close"></button>
          </div>
        <img className="img-fluid " src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp14-spacegray-select-202110_GEO_KR?wid=1808&hei=1680&fmt=jpeg&qlt=90&.v=1647363032344" alt="" ></img>
        <p>현재 가격 : {productData.mallInfo[0].price}</p>
        <p>설정 가격 : {desiredPrice}</p>
      </div>
  )
};



export default RegisterProduct;

