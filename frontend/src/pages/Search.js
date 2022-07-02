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
        `http://localhost:8080/api/v1/crawler/search/products?word=${word}`
    )
      setDataList(result.data.productListDtoList);
      setTotalCount(result.data.totalNumber);
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
                  {products && products.map(product => (<SearchProductList  url={product.url} minimumPrice={product.minimumPrice} title={product.title} imageUrl={product.imageUrl} />))}
                </div>
          </>
        ) : '검색된 상품내역이 존재하지 않습니다.'

      }
          <Pagination className = "page" total={totalCount} current={currentPage} pageSize={pageSize}
                      onChange={(page) => setCurrentPage(page)}></Pagination>
    </section>);



}

export default Search;
