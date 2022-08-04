import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { AiOutlineSetting, AiOutlineClose } from "react-icons/ai";
import "./RegisterProduct.css";
import Alarm from "../components/Alarm";
import Graph from "../components/Graph";
import { registedProductDto } from "../utils/types";

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
  const [registedProductDatas, setRegistedProductDatas] =
    useState<registedProductDto | null>();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleChart, setIsVisibleChart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`products/${productId}`);
      setRegistedProductDatas(result.data);
    };
    fetchData();
  }, []);

  const useConfirm = (message: string, onConfirm) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }

    const confirmAction = () => {
      if (window.confirm(message!)) {
        onConfirm();
      }
    };

    return confirmAction;
  };

  const deleteConfirm = () => {
    axios
      .delete(`products/register/${productId}`, {
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
      {registedProductDatas && registedProductDatas.mallInfo ? (
        <>
          <button className="btn" onClick={confirmDelete}>
            <AiOutlineClose size="22" />
          </button>
          <button className="btn" onClick={() => setIsVisible(true)}>
            <AiOutlineSetting size="22" />
          </button>
          <img
            className="img-fluid mx-auto"
            src={registedProductDatas.image}
            alt=""
            onClick={() => setIsVisibleChart(true)}
          ></img>
          <h5 className="text-center">{registedProductDatas.name}</h5>
          <p className="text-center">
            설정 가격 :{" "}
            {desiredPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <p className="text-center">
            현재 가격 :{" "}
            {registedProductDatas.mallInfo[0].price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          {isVisible && (
            <Alarm
              type="patch"
              parentProp={parentProp}
              title={registedProductDatas.image}
              modalVisible={setIsVisible}
              productId={productId}
            />
          )}
          {isVisibleChart && (
            <Graph
              productId={registedProductDatas.productId}
              modalVisible={setIsVisibleChart}
              productName={registedProductDatas.name}
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
