import React, {useState} from 'react';
import "../pages/Search"
import axios from "axios";
import Modal from 'react-modal';
import "./Alarm.css"
Modal.setAppElement('#root');

function Alarm({type, title, modalVisible , urlValue, productId}) {

  const apiType = type;
  const [price, setPrice] = useState(0);
 

  const onSubmitBtn = () => {
    modalVisible(false);
  }
  
  
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
        method: 'post',
        url: `http://localhost:8080/api/v1/products/register?product=${title}`,
        data: {
          desiredPrice: parseInt(price),
          url: urlValue,
        },
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY1Njc3MzExNn0.MsD679cI3koOJZH6Bfc3PUQanZP5ckE6apac6t1vJ1Y'}
      })//userId값을 헤더로부터 가져와서 넣을 것
      .then(function (response) {
        window.alert("정상적으로 알림 등록이 완료되었습니다.");
        modalVisible(false);
      })
      .catch(function (error) {
      
        const errorType = error.response.data.code;
        
        if(errorType=="I003"){
          window.alert("이미 알림이 등록된 상품입니다.");
        }
        else { 
          window.alert("알림 등록 중 오류가 발생하였습니다.");
        }
        modalVisible(false);
      })
    }

    else{
      axios({
        method: 'patch',
        url: `http://localhost:8080/api/v1/products/register/${productId}`,
        data: {
          desiredPrice: parseInt(price)
        },
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY1Njg2ODc2MH0.rSggJi3S27g2ZIz99JjnsGpsUFPmcUgybHXgm-Ia3Os'}
      })//userId값을 헤더로부터 가져와서 넣을 것
      .then(function (response) {
        window.alert("정상적으로 알림 등록이 완료되었습니다.");
      })
      .catch(function (error) {
        modalVisible(false);
      })
    }
    
  }
  

  return (
      <div>
        <Modal isOpen="true" onRequestClose={() => modalVisible(false)}
        style={modalStyle}>
        <div className="row">
          <div className="Alarm">

            <button className="btn-close closeModal" onClick={()=> modalVisible(false)}>
            </button>

            <div>


            <label htmlFor="">알림 희망 가격</label>
            <input className = "form-control"  type="number" placeholder="$" aria-label="Search" aria-describedby="search-addon"
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








  )
};

export default Alarm;
