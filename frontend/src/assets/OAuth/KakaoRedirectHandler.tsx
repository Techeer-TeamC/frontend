import React, { useEffect, useState, useRef } from "react";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { any } from "prop-types";

const KakaoRedirectHandler = () => {
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const mounted = useRef(false);

  const params = new URL(document.location.toString()).searchParams;
  const code: any = params.get("code"); // 인가코드 받는 부분

  useEffect(() => {
    if (!mounted.current) {
      // console.log("인가코드:  " + code);
      setLoading(true);
      mounted.current = true;
    } else {
      api(code);
    }
  }, [code]);

  const api = async (code: string): Promise<void> => {
    console.log("api 작동 요청 중");
    try {
      axios({
        method: "GET",
        url: `http://3.39.75.19:8080/api/v1/auth/token/kakao?code=${code}`,
      }).then((response) => {
        // console.log(response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem(
          "tokenValidTime",
          response.data.accessTokenExpiresIn
        );
        console.log("카카오 로그인 성공");
        setLoading(false);
        navigate("/", { replace: true });
      });
    } catch (error) {
      console.log("소셜로그인 에러");
      alert("로그인에 실패하였습니다.");
      setLoading(false);
      navigate("/login", { replace: true });
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading text="로그인 중 입니다!" />
      ) : (
        "페이지 이동 중 입니다 !"
      )}
    </div>
  );
};
export default KakaoRedirectHandler;
