import axios from "axios";

import React,  { useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom'
import './Detail.css';
import SearchBar from "../components/SearchBar";
import SearchProductList from "../components/SearchProductList";

function Detail(props) {
    let { id } = useParams();
    const navigate = useNavigate();
    const[isLoading, setLoading] = useState(true);
    const[productData , setData] = useState({});



    useEffect( () => {

        const fetchData = async () => {
            const result = await axios(`http://localhost:8080/api/v1/products/${id}`);
            setData(result.data);
            setLoading(false);
        };

        fetchData();

        }, []);





        return (
                <section className="detail-container">
            {
                isLoading
                    ? (<div className="loader">
                        <span className="loader__text">Loading..</span>
                    </div>)
                    :  productData
                        ? (
                            <>
                                <div className ="container">
                                    <SearchBar></SearchBar>
                                    <div className = "row">
                                        <div className ="product_image col-md-6">
                                            <img className="img-fluid" src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp14-spacegray-select-202110_GEO_KR?wid=1808&hei=1680&fmt=jpeg&qlt=90&.v=1647363032344" alt="product-image"/>
                                        </div>
                                        <div className="product-detail col-md-6">
                                            <div className="top-info">
                                                <h2>{ productData.name }</h2>
                                                <h3> 최저가 {productData.mallInfo[0].price}</h3>
                                            </div>
                                            <div className="mallInfo row justify-content-between">
                                                <table className="table">
                                                    <thead>
                                                    </thead>
                                                    <tbody>
                                                        {productData.mallInfo && productData.mallInfo.map(mall => (
                                                            <tr onClick={() => window.open("/"+mall.name ,'_blank')}>
                                                                <th>{ mall.name }</th>
                                                                <th>{ mall.price }</th>
                                                                <th>{ mall.delivery }</th>
                                                                <th>{ mall.paymentOption }</th>
                                                            </tr>
                                                        ))}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                        </>
                    ) : '해당 게시글을 찾을 수 없습니다.'
            }

    </section>);




}

export default Detail;
