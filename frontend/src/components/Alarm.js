import React, {useState} from 'react';
import "./SearchProductList.css";
import "../pages/Search"
import axios from "axios";
import Modal from 'react-modal';
import "./Alarm.css"
Modal.setAppElement('#root');

function Alarm({type}) {

  const apiType = type;
  const [desirePrice, setPrice] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
      bottom: "20vh",
      WebkitOverflowScrolling: "touch",
      borderRadius: "14px",
      outline: "none",
      zIndex: 10,
    },
  };

  const handleResult = () => {
    const fd = new FormData();
    fd.append("desiredPrice", desirePrice);
    axios
      .post('http://localhost:8080/api/v1/products/register/1') //userId값을 헤더로부터 가져와서 넣을 것
      .then((res) => {
        window.alert("정상적으로 알림 등록이 완료되었습니다.");
      })
    .catch((err) => {
      console.log(err);
      window.alert("알림 등록 중 오류가 발생하였습니다.");
    })
  }

  return (
      <div>
        <button type="button" className=" btn-primary"  aria-label="Close"  onClick={()=> setModalIsOpen(true)}>
          알림 아이콘(임시)
        </button>

        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)
        }
        style={modalStyle}>
        <div className="row">

          <div className="Alarm">
            <button className="btn-close close" onClick={()=> setModalIsOpen(false)}>
            </button>
            <p>알림 희망 가격: </p>
            <input className = "form-control rounded"  type="text" placeholder="Search" aria-label="Search" aria-describedby="search-addon"
                   onChange={(event) => setPrice(event.target.value)}
            />

            <button
                className="rounded-full  "
                type="button"
                onClick={handleResult}
            >
              알림 등록
            </button>
        </div>


          </div>
        </Modal>

              </div>








  )
};

export default Alarm;
