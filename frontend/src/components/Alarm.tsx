import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../pages/Search";
import axios from "../api/axios";
import Modal from "react-modal";
import "./Alarm.css";
Modal.setAppElement("#root");

type AlarmProps = {
  type: string;
  title: string;
  modalVisible: (value: boolean) => void;
  urlValue?: string;
  productId?: string;
  parentProp?: (value: boolean) => void;
};

function Alarm({
  type,
  title,
  modalVisible,
  urlValue,
  productId,
  parentProp,
}: AlarmProps) {
  const apiType = type;
  const [price, setPrice] = useState<string>();

  const onSubmitBtn = () => {
    modalVisible(false);
  };

  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.45)",
      zIndex: 10,
    },
    content: {
      display: "flex",
      justifyContent: "center",
      background: "#ffffe7",
      overflow: "auto",
      top: "20vh",
      left: "50vw",
      right: "20vw",
      bottom: "50vh",
      WebkitOverflowScrolling: "touch",
      borderRadius: "14px",
      outline: "none",
      zIndex: 10,
    },
  };

  const handleResult = () => {
    if (apiType == "post") {
      axios({
        method: "post",
        url: `products/register?product=${title}`,
        data: {
          desiredPrice: parseInt(price!),
          url: urlValue,
        },
        headers: { Authorization: "Bearer " + localStorage.accessToken },
      }) //userId값을 헤더로부터 가져와서 넣을 것
        .then(function (response) {
          window.alert("정상적으로 알림 등록이 완료되었습니다.");
          modalVisible(false);
        })
        .catch(function (error) {
          const errorType = error.response.data.code;

          if (errorType == "I004") {
            window.alert("이미 알림이 등록된 상품입니다.");
          } else if (errorType == "J001") {
            window.alert("로그인이 필요한 기능입니다.");
            <Navigate to="/login" />;
          } else {
            window.alert("알림 등록 중 오류가 발생하였습니다.");
          }
          modalVisible(false);
        });
    } else {
      axios({
        method: "patch",
        url: `http://3.39.75.19:8080/api/v1/products/register/${productId}`,
        data: {
          desiredPrice: parseInt(price!),
        },
        headers: { Authorization: "Bearer " + localStorage.accessToken },
      }) //userId값을 헤더로부터 가져와서 넣을 것
        .then(function (response) {
          parentProp!(false);
          window.alert("정상적으로 알림 수정이 완료되었습니다.");
          modalVisible(false);
        })
        .catch(function (error) {
          const errorType = error.response.data.code;

          if (errorType == "J001") {
            window.alert("로그인이 필요한 기능입니다.");
          }
          modalVisible(false);
        });
    }
  };

  return (
    <div>
      <Modal
        isOpen="true"
        onRequestClose={() => modalVisible(false)}
        style={modalStyle}
      >
        <div className="row">
          <div className="Alarm">
            <button
              className="btn-close closeModal"
              onClick={() => modalVisible(false)}
            ></button>

            <div>
              <label htmlFor="">알림 희망 가격</label>
              <input
                className="form-control"
                type="number"
                placeholder="$"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <div>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleResult}
              >
                알림 등록
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Alarm;
