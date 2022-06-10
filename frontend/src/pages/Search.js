import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import SearchProductList from '../components/SearchProductList';
import "./Search.css";
import { useParams , useNavigate} from 'react-router-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
function Search(props) {

  const[word, setWord] = useState("");
  const[products, setDataList] =useState([]);
  const[value , setValue] = useState("");
  const mounted = useRef(false);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(115);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect( () => {
    const fetchData = async () => {
    const result = await axios(
        `http://localhost:8080/api/v1/products/search/?page=${currentPage-1}&keyword=${word}`
    )
      setDataList(result.data.data);
      setTotalCount(result.data.data.length);
    };
    if(!mounted.current){
      mounted.current=true;
    }
    else{
  fetchData();
      }
  },[word,currentPage]);


  // state = {
  //   isLoading: true,
  //   products: [],
  //   value: "",
  //   name: ""
  // };




    return (
        <section className="container">
      {

            (

              <div>
                <div className="input_div">
                  <h1>상품 검색</h1>
                  <input className="input_search" type="text" value={value} onChange={(event) => setValue(event.target.value)} placeholder="Search Something"/>
                  <button type="button" onClick={() => setWord(value)}> Search </button>
                </div>
                <div className="products">
                  {products && products.map(product => (<SearchProductList key={product.id} id={product.id} year="year" title={product.name} poster="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp14-spacegray-select-202110_GEO_KR?wid=1808&hei=1680&fmt=jpeg&qlt=90&.v=1647363032344" rating="rating" director="director" actor="actor"/>))}
                </div>
              </div>
           )
      }
          <Pagination total={totalCount} current={currentPage} pageSize={pageSize}
                      onChange={(page) => setCurrentPage(page)}></Pagination>
    </section>);



}

export default Search;
