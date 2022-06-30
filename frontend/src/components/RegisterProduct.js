import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import axios from 'axios';
import {AiOutlineSetting, AiOutlineClose}  from 'react-icons/ai';
import "./RegisterProduct.css"




function RegisterProduct({productId, desiredPrice}) {

  const[productData , setData] = useState({});

  const useConfirm = (message = null, onConfirm) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      }
    };

    return confirmAction;
  };

  const deleteConfirm = () => {
    axios({
      method: 'delete',
      url: `/api/v1/products/register/${productId}`
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) { 
      console.error(error);
    })
  };

  const confirmDelete = useConfirm(
      "등록한 알림을 삭제하시겠습니까?",
      deleteConfirm,
   
  );

  useEffect( () => {

    const fetchData = async () => {
      const result = await axios(`http://localhost:8080/api/v1/products/${productId}`);
      setData(result.data);
    };
    fetchData();
  }, []);



  //<p>현재 가격 : {productData.mallInfo[0].price}</p>
  //         <p>설정 가격 : {desiredPrice}</p>


  return (
      <div className="registedCompoent col-md-4 border-0">
        
          <button className="btn" onClick={confirmDelete}>
            <AiOutlineClose size='22' />
          </button>
          <button className="btn">
            <AiOutlineSetting size='22' />
          </button>
          
        
        <img className="img-fluid mx-auto"  src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp14-spacegray-select-202110_GEO_KR?wid=1808&hei=1680&fmt=jpeg&qlt=90&.v=1647363032344" alt="" ></img>
        <p className="text-center">현재 가격 : 123</p>
        <p className="text-center">설정 가격 : 123</p>
      </div>
  )
};



export default RegisterProduct;

