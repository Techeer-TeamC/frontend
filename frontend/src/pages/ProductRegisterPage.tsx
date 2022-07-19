import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import SearchProductList from '../components/SearchProductList';
import "./Search.css";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import SearchBar from "../components/SearchBar";
import {useParams} from "react-router-dom";
import CommonNavbar from "../components/CommonNavbar"
import RegisterProduct from "../components/RegisterProduct"

function ProductRegisterList() {

  

  const[products, setDataList] =useState([]);
  const mounted = useRef(false);
  const [pageSize, setPageSize] = useState(9);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [change,setChange] = useState(true);


  useEffect( () => {
    const fetchData = async () => {
      window.scrollTo(0, 0);
      console.log(localStorage.accessToken);
      const result = await axios.get(
          `http://3.39.75.19:8080/api/v1/products/list`
      , {
        headers: {
          'Authorization':
          'Bearer ' +  localStorage.accessToken
        }

      })
      console.log(result.data);
      setDataList(result.data);
      setTotalCount(result.data.length);
      setChange(true);

    }
    fetchData();
  },[change]);




  return (
      <section className="container">
        {
          <CommonNavbar></CommonNavbar>
        }

        {
          <div>
          <h2>마이 페이지</h2>
          <hr />
          </div>
        }

        {
         
          totalCount ? (
              <>
                <div>
                <div className="row">
                  {products && products.map(product => (<RegisterProduct key={product.productId} parentProp={setChange} productId={product.productId} desiredPrice={product.desiredPrice}/>))}
                </div>
                </div>
              </>
          ) : 
              '알림을 등록한 상품 내역이 없습니다.'

        }
      </section>);



}

export default ProductRegisterList;