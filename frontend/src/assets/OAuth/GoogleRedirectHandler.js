import React, { useEffect,useState } from "react";
import KLoading from "../../components/KLoading";
// import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { convertCompilerOptionsFromJson } from "typescript";


const GoogleRedirectHandler = () => {
  const[isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect( () => {        
    setLoading(true);
    console.log();
    api(code);
  },[]);


  let params = new URL(document.location.toString()).searchParams;
  let code = params.get("code"); // 인가코드 받는 부분
  console.log("인가코드:" + code);
  

  const api = async (code) => {
    console.log("api 작동 요청 중")
    try {
        axios({
          method: "GET",
          url: `http://3.39.75.19:8080/api/v1/auth/token/google?code=${code}`,
        })
        
        .then((response) => {            
          console.log(response);
          localStorage.setItem('refreshToken',response.data.refreshToken);
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('tokenValidTime', response.data.accessTokenExpiresIn);
                    
          setLoading(false);                
          navigate('/', {replace: true});
  
        })    
    } 
    catch(err) {
        console.log("소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        setLoading(false); 
        navigate('/login', {replace: true}); // 로그인 실패하면 로그인화면으로 돌려보냄
    }
  }
  
  
  
  return (<div>
    {
        isLoading? <KLoading/>: "페이지 이동"
      
  
    } 
    </div>);

}
export default GoogleRedirectHandler;   