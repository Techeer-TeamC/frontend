import "./Loginpage.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL } from "../assets/OAuth/OAuth";
import imgA from "../assets/loginpage/IMG_9315.jpg";
import imgB from "../assets/loginpage/btn_google.png";
import imgC from "../assets/loginpage/kakao_login_large_narrow.png";
import axios from "axios";

function LoginPage() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const navigate = useNavigate();

  const handleInputId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPw(e.target.value);
  };

  const onClickLogin = () => {
    try {
      axios({
        method: "post",
        url: `http://3.39.75.19:8080/api/v1/auth/new`,
        data: {
          email: inputId,
          password: inputPw,
        },
      })
        .then(function (response) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem(
            "tokenValidTime",
            response.data.accessTokenExpiresIn
          );
          navigate("/");
        })
        .catch(function (error) {
          const errorType = error.response.data.code;

          if (errorType == "M003") {
            window.alert("가입하지 않은 이메일 입니다.");
          } else if (errorType == "M004") {
            window.alert("비밀번호가 틀렸습니다.");
          } else {
            window.alert("로그인에 실패하였습니다.");
            console.error(error);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <img src={imgA} />
      <form className="cover">
        <div id="info">Login to your account</div>

        <div className="blank">
          <div className="input-set">
            <div className="bar">
              <label htmlFor="input_id">Email : </label>
              <input
                type="text"
                name="input_id"
                value={inputId}
                onChange={handleInputId}
              />
            </div>
            <div className="bar">
              <label htmlFor="input_pw">PW : </label>
              <input
                type="password"
                name="input_pw"
                value={inputPw}
                onChange={handleInputPw}
              />
            </div>
          </div>
          <div className="button-set">
            <button type="button" id="bt" onClick={onClickLogin}>
              Login
            </button>
            <br></br>
            <a target="_self" href={GOOGLE_AUTH_URL}>
              <img src={imgB} />
            </a>
            <br></br>
            <a target="_self" href={KAKAO_AUTH_URL}>
              <img src={imgC} />
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
