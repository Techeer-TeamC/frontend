import axios from "axios";

import React,  { useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom';


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
                <section className="container">
            {
                isLoading
                    ? (<div className="loader">
                        <span className="loader__text">Loading..</span>
                    </div>)
                    :  productData
                        ? (
                            <>

                            <div className="post-view-row">
                                <label>상품명</label>
                                <label>{ productData.data.name }</label>
                            </div>
                            <div className="post-view-row">
                                <label>가격</label>
                                <label>{ productData.data.price }</label>
                            </div>


                        </>
                    ) : '해당 게시글을 찾을 수 없습니다.'
            }
            <button className="post-view-go-list-btn" onClick={() => navigate('/search')}>>목록으로 돌아가기</button>
    </section>);




}

export default Detail;
