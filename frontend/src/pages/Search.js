import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import SearchProductList from '../components/SearchProductList';
import "./Search.css";
import { useParams , useNavigate} from 'react-router-dom';


function Search(props) {

  const[word, setWord] = useState("");
  const[products, setDataList] =useState([]);
  const[value , setValue] = useState("");
  const mounted = useRef(false);

  useEffect( () => {
    const fetchData = async () => {
    const result = await axios(
        `http://localhost:8080/api/v1/products/search/?page=0&keyword=${word}`
    )
      setDataList(result.data.data);
    };
    if(!mounted.current){
      mounted.current=true;
    }
    else{
  fetchData();
      }
  },[word]);


  // state = {
  //   isLoading: true,
  //   products: [],
  //   value: "",
  //   name: ""
  // };




    return (<section className="container">
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
    </section>);

}

export default Search;
