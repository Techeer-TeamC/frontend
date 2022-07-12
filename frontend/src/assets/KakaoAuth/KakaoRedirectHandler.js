import React, { useEffect,useState } from "react";
import KLoading from "../../components/KLoading";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { convertCompilerOptionsFromJson } from "typescript";



const KakaoRedirectHandler = () => {
    const[isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect( () => {        
          setLoading(true);
          api(code);
        },[]);

    // const nav=() =>{
    //     console.log('이동');
    //     if (!localStorage.accessToken)
    //       navigate('/', {replace: true});
        
    // };

    
    
        
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    console.log("인가코드:" + code);

    const api = async (code) => {
      console.log("api 작동 요청 중")
    	try {
            axios({
                method: "GET",
                url: `http://3.35.208.142/oauth/callback/kakao?code=${code}`,
              })
                .then((response) => {
                  
                  console.log(response.data.accessToken);
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

//     let grant_type = "authorization_code";
//     let client_id = "REST API 부분을 넣어준다.";

//     axios.post(`https://kauth.kakao.com/oauth/token?
//         grant_type=${grant_type}
//         &client_id=${client_id}
//         &redirect_uri=http://localhost:3000/oauth/callback/kakao
//         &code=${code}`
//         , {
//     headers: {
//         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
//     }
//   }).then((res) => {
//       console.log(res)
//       // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
//   })
//   }, 
//   [])

  return (<div>
    {
        isLoading? <KLoading/>: "페이지 이동"
      
  
    } 
    </div>);
}
export default KakaoRedirectHandler;