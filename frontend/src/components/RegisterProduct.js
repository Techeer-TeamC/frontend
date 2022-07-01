import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {AiOutlineSetting, AiOutlineClose}  from 'react-icons/ai';
import "./RegisterProduct.css"
import Alarm from "../components/Alarm";



function RegisterProduct({productId, desiredPrice}) {

  const[productData , setDataList] = useState([]);

  
  
  useEffect( () => {

    const fetchData = async () => {
      const result = await axios(`http://localhost:8080/api/v1/products/${productId}`)
      
      setDataList(result.data);
      
      if(productData.mallInfo){
        console.log(productData.mallInfo[0]);
      }
  
  
    }
    fetchData();
  }, []);

  

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
    axios.delete(`/api/v1/products/register/${productId}` , {
      headers: {
        Authorization:
           'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY1NjY0Mjk0OH0.Q9TE_YyX00nsELLkoPCD5jj4T8ACQIZ6SBVev-smm-s'
      }
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

  


  //<p>현재 가격 : {productData.mallInfo[0].price}</p>
  //         <p>설정 가격 : {desiredPrice}</p>



 
  
  return (
      <div className="registedCompoent col-md-4 border-0">

        {
          productData.mallInfo ? (
              <>
                <button className="btn" onClick={confirmDelete}>
                  <AiOutlineClose size='22' />
                </button>
                <button className="btn">
                  <AiOutlineSetting size='22' />
                </button>

                <img className="img-fluid mx-auto"  src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp14-spacegray-select-202110_GEO_KR?wid=1808&hei=1680&fmt=jpeg&qlt=90&.v=1647363032344" alt="" ></img>

                <p className="text-center">설정 가격 :  {desiredPrice}</p>
                <p className="text-center">현재 가격 : {productData.mallInfo[0].price}</p>
              </>
          ) : 'Loading. . .'

        }
        
      </div>
  )
};



export default RegisterProduct;

