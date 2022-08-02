import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Detail.css";
import SearchBar from "../components/SearchBar";
import Alarm from "../components/Alarm";
import CommonNavbar from "../components/CommonNavbar";
import Loading from "../components/Loading";
// import Graph from "../components/Graph"

type detailProductDataProps = {
  title: string;
  minimumPrice: string;
  url: string;
  image: string;
  mallDtoInfo: mallInfoProps[];
};

type mallInfoProps = {
  delivery: number;
  interestFree: string;
  link: string;
  name: string;
  paymentOption: string;
  price: number;
};

function Detail() {
  const navigate = useNavigate();
  const location = useLocation();

  const id = (location as any).state.url;
  const [isLoading, setLoading] = useState(true);
  const [productData, setData] = useState<detailProductDataProps | null>();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://3.39.75.19:8080/api/v1/crawler/search/product?url=${id}`
      );
      setData(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className="container">
      {<CommonNavbar />}
      {isLoading ? (
        <Loading />
      ) : productData ? (
        <>
          <div className="container">
            <SearchBar></SearchBar>
            <div className="row">
              <div className="product_image col-md-6">
                <img
                  className="img-fluid  mx-auto"
                  src={productData.image}
                  alt="product-image"
                />

                <button
                  type="button"
                  className=" btn-primary text-center"
                  onClick={() => setIsVisible(true)}
                >
                  알림 등록
                </button>
              </div>
              <div className="product-detail col-md-6">
                <div className="top-info">
                  <h2>{productData.title}</h2>
                  <h3>
                    {" "}
                    최저가{" "}
                    {productData.mallDtoInfo[0].price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </h3>
                </div>
                <div className="mallInfo row justify-content-between">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>쇼핑몰</th>
                        <th>가격</th>
                        <th>배송비</th>
                        <th>할부</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productData.mallDtoInfo &&
                        productData.mallDtoInfo.map((mall) => (
                          <tr
                            onClick={() => window.open(mall.link, "_blank")}
                            key={mall.link}
                          >
                            <th>{mall.name}</th>
                            <th>
                              {mall.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </th>
                            <th>{mall.delivery}</th>
                            <th>{mall.interestFree}</th>
                            <th>{mall.paymentOption}</th>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <hr />
            {/* <Graph /> */}
            {isVisible && (
              <Alarm
                type="post"
                title={productData.title}
                urlValue={id}
                modalVisible={setIsVisible}
              />
            )}
          </div>
        </>
      ) : (
        "해당 게시글을 찾을 수 없습니다."
      )}
    </section>
  );
}

export default Detail;
