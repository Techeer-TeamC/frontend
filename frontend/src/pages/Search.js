import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import SearchProductList from '../components/SearchProductList';
import "./Search.css";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import SearchBar from "../components/SearchBar";
import {useParams} from "react-router-dom";
import CommonNavbar from "../components/CommonNavbar"

function Search() {

  let { keyword } = useParams();

  const[word, setWord] = useState(keyword);
  const[products, setDataList] =useState([]);
  const[value , setValue] = useState("");
  const mounted = useRef(false);
  const [pageSize, setPageSize] = useState(9);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect( () => {
    const fetchData = async () => {
      window.scrollTo(0, 0);
      const result = await axios(
        `http://localhost:8080/api/v1/products/search/?page=${currentPage-1}&keyword=${word}`
    )
      setDataList(result.data.data);
      console.log(products);
      setTotalCount(result.data.totalCount);
    }
    fetchData();
  },[word,currentPage]);




    return (
        <section className="container">
          {
            <CommonNavbar></CommonNavbar>
          }
          
          {
              <SearchBar></SearchBar>
          }
          
          {
                totalCount ? (
                <>
                <div className="row">
                  {products && products.map(product => (<SearchProductList key={product.productId} id={product.productId} year="year" title={product.name} poster="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp14-spacegray-select-202110_GEO_KR?wid=1808&hei=1680&fmt=jpeg&qlt=90&.v=1647363032344" />))}
                </div>
          </>
        ) : '검색된 상품내역이 존재하지 않습니다.'

      }
          <Pagination className = "page" total={totalCount} current={currentPage} pageSize={pageSize}
                      onChange={(page) => setCurrentPage(page)}></Pagination>
    </section>);



}

export default Search;
