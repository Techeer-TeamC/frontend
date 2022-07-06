import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {AiOutlineSetting, AiOutlineClose}  from 'react-icons/ai';
import "./RegisterProduct.css"
import Alarm from "../components/Alarm";



function RegisterProduct({productId, desiredPrice, parentProp}) {

  const[productData , setDataList] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  
  
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
            'Bearer ' +  localStorage.accessToken
      }
    })
    .then(function (response) {
      parentProp(false);
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
                <button className="btn" onClick={()=> setIsVisible(true)}>
                  <AiOutlineSetting size='22' />
                </button>

                <img className="img-fluid mx-auto"  src={productData.image} alt="" ></img>

                <p className="text-center">설정 가격 : {desiredPrice}</p>

                {isVisible && <Alarm type="patch" parentProp={parentProp} title={productData.image} urlValue={productData.url} modalVisible={setIsVisible} productId={productId}/>}
              </>
          ) : 'Loading. . .'

        }
        
      </div>
  )
};



export default RegisterProduct;

