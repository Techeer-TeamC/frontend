import "./Loginpage.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL } from "../assets/OAuth/OAuth";
import imgA from "../assets/loginpage/IMG_9315.png";
import imgB from "../assets/loginpage/btn_google.png";
import imgC from "../assets/loginpage/kakao_login_large_narrow.png";
import axios from "../api/axios";

type LoginProps = {
  (userInfo: { id: string; password: string });
};

function LoginPage() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    console.log(userInfo);
    e.preventDefault();

    try {
      axios({
        method: "post",
        url: `auth/new`,
        data: {
          email: userInfo.id,
          password: userInfo.password,
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
                name="id"
                value={userInfo.id}
                onChange={handleChange}
              />
            </div>
            <div className="bar">
              <label htmlFor="input_pw">PW : </label>
              <input
                type="password"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="button-set">
            <button type="button" id="bt" onClick={handleSubmit}>
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
