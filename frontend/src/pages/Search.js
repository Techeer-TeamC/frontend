import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import SearchProductList from '../components/SearchProductList';
import "./Search.css";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import SearchBar from "../components/SearchBar";
import {useParams} from "react-router-dom";
import CommonNavbar from "../components/CommonNavbar"
import Loading from "../components/Loading"

function Search() {

  let { keyword } = useParams();

  const[word, setWord] = useState(keyword);
  const[products, setDataList] =useState([]);
  const[value , setValue] = useState("");
  const mounted = useRef(false);
  const [pageSize, setPageSize] = useState(9);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const[isLoading, setLoading] = useState(true);
  

  useEffect( () => {
    const fetchData = async () => {
      window.scrollTo(0, 0);
      const result = await axios(
        `http://3.39.75.19:8080/api/v1/crawler/search/products?word=${word}`
    )
      setDataList(result.data.productListDtoList);
      setTotalCount(result.data.totalNumber);
      setLoading(false);
    }
    fetchData();
  },[word,currentPage]);

  
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentPosts = (products) => {
    let currentPosts = 0;
    currentPosts = products.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };



    return (
        <section className="container">
          {
            <CommonNavbar></CommonNavbar>
          }
          
          {
              <SearchBar></SearchBar>
          }


          {
            isLoading
                ? <Loading/>
                : totalCount ? (
                    <>
                      <div className="row">
                        {products && currentPosts(products).map(product => (
                            <SearchProductList url={product.url}
                                               minimumPrice={product.minimumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                               title={product.title}
                                               imageUrl={product.imageUrl}/>))}
                      </div>
                    </>
                ) : '????????? ??????????????? ???????????? ????????????.'

          }

          {

            <Pagination className = "page" total={totalCount} current={currentPage} pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}></Pagination>
          }
    </section>);
          


}

export default Search;