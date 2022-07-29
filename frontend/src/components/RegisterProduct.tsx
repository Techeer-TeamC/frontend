import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineSetting, AiOutlineClose } from "react-icons/ai";
import "./RegisterProduct.css";
import Alarm from "../components/Alarm";
import Graph from "../components/Graph";

type RegisterProductProps = {
  productId: string;
  desiredPrice: number;
  parentProp: (value: boolean) => void;
};

function RegisterProduct({
  productId,
  desiredPrice,
  parentProp,
}: RegisterProductProps) {
  const [productData, setDataList] = useState<any | null>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleChart, setIsVisibleChart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://3.39.75.19:8080/api/v1/products/${productId}`
      );

      setDataList(result.data);

      if (productData.mallInfo) {
        console.log(productData.mallInfo[0]);
      }
    };
    fetchData();
  }, []);

  const useConfirm = (message = null, onConfirm) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      }
    };

    return confirmAction;
  };

  const deleteConfirm = () => {
    axios
      .delete(`/api/v1/products/register/${productId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
        },
      })
      .then(function (response) {
        parentProp(false);
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const confirmDelete = useConfirm(
    "등록한 알림을 삭제하시겠습니까?",
    deleteConfirm
  );

  //<p>현재 가격 : {productData.mallInfo[0].price}</p>
  //         <p>설정 가격 : {desiredPrice}</p>

  return (
    <div className="registedCompoent col-md-4 border-0">
      {productData.mallInfo ? (
        <>
          <button className="btn" onClick={confirmDelete}>
            <AiOutlineClose size="22" />
          </button>
          <button className="btn" onClick={() => setIsVisible(true)}>
            <AiOutlineSetting size="22" />
          </button>
          <img
            className="img-fluid mx-auto"
            src={productData.image}
            alt=""
            onClick={() => setIsVisibleChart(true)}
          ></img>
          <h5 className="text-center">{productData.name}</h5>
          <p className="text-center">
            설정 가격 :{" "}
            {desiredPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <p className="text-center">
            현재 가격 :{" "}
            {productData.mallInfo[0].price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          {isVisible && (
            <Alarm
              type="patch"
              parentProp={parentProp}
              title={productData.image}
              urlValue={productData.url}
              modalVisible={setIsVisible}
              productId={productId}
            />
          )}
          {isVisibleChart && (
            <Graph
              productId={productData.productId}
              modalVisible={setIsVisibleChart}
              productName={productData.name}
            />
          )}
        </>
      ) : (
        "Loading. . ."
      )}
    </div>
  );
}

export default RegisterProduct;
