import axios from "axios";

import React,  { useEffect, useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom'
import './Detail.css';
import SearchBar from "../components/SearchBar";
import Alarm from "../components/Alarm";
import SearchProductList from "../components/SearchProductList";
import CommonNavbar from "../components/CommonNavbar"
import Loading from "../components/Loading"

function Detail(props) {
    
    const navigate = useNavigate();
    const location = useLocation();

    const id = location.state.url;
    const[isLoading, setLoading] = useState(true);
    const[productData , setData] = useState({});
    const [isVisible, setIsVisible] = useState(false);

    
    useEffect( () => {

        const fetchData = async () => {
            const result = await axios(` http://localhost:8080/api/v1/crawler/search/product?url=${id}`);
            setData(result.data);
            setLoading(false);
         
        };

        fetchData();

        }, []);





        return (
                <section className="container">
                    {
                        <CommonNavbar />
                    }
            {
                isLoading
                    ? <Loading />
                    :  productData
                        ? (
                            
                            <>
                                <div className ="container">
                                    <SearchBar></SearchBar>
                                    <div className = "row">
                                        <div className ="product_image col-md-6">
                                            <img className="img-fluid" src={productData.image} alt="product-image"/>
                                        </div>
                                        <div className="product-detail col-md-6">
                                            <div className="top-info">
                                                <h2>{ productData.title }</h2>
                                                <h3> 최저가 {productData.mallDtoInfo[0].price}</h3>
                                            </div>
                                            <div className="mallInfo row justify-content-between">
                                                <table className="table">
                                                    <thead>
                                                    </thead>
                                                    <tbody>
                                                        {productData.mallDtoInfo && productData.mallDtoInfo.map(mall => (
                                                            
                                                            <tr onClick={() => window.open(mall.link ,'_blank')}>
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
                                    <button type="button" className=" btn-primary"  onClick={()=> setIsVisible(true)}>
                                        알림 등록
                                    </button>
                                    {isVisible && <Alarm type="post" title={productData.title} urlValue={id} modalVisible={setIsVisible} />}
                                </div>
                              

                        </>
                    ) : '해당 게시글을 찾을 수 없습니다.'
            }

    </section>);




}

export default Detail;
