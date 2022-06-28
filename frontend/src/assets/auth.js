import React from 'react';
import { useNavigate } from 'react-router-dom'

function Auth(props) {
const navigate = useNavigate();

let actoken = localStorage.getItem('access_token') || '';
let rftoken = localStorage.getItem('refresh_token') || '';





//access 토큰 재발급 요청
// export 
const GetAccessToken = () =>{
    console.log("ac토큰재발급 요청함수 동작");
    
    (fetch('http://3.39.75.19:8080/api/v1/auth/reissue', {
        method: 'POST',
        //토큰 재발급 요청에는 헤더 안 넣어도 되나?
        body: JSON.stringify({
            'accessToken': actoken,
            'refreshToken': rftoken
        })
    })

    .then(response => response.json())
    .then(response => {

        if (response.data.accessToken && response.data.refreshToken) {
            localStorage.setItem('access_token', response.data.accessToken);
            localStorage.setItem('refresh_token', response.data.refreshToken);
            // setIsLogin(true);    
            console.log('access_token 재발급:', response.data.accessToken);
            let actoken = localStorage.getItem('access_token') || '';
            let rftoken = localStorage.getItem('refresh_token') || '';
        }
    }))    
};






//refresh 토큰 재발급 요청
// export 
const GetRefreshToken = () =>{
    console.log("rf토큰 재발급 요청함수 동작");
    //auth 설정
    navigate('/login', {replace: true});
    //이후 로그인 모듈 통해 저장
};    





// function Auth()
//     if (actoken==true){

//     }

const onClickLogin = (e) => {
    //토큰만료시 처리 잘 되나 확인 중
    fetch('http://localhost:3000/assets/mockData.json', {
        // method: 'POST',
    //     headers: {
    //       'Authorization': 'Bearer '+ actoken,
    //   },
    //     body: JSON.stringify({
    //     'email': inputId,
    //     'password': inputPw
    //     })
    })

    .then(response => response.json())
    .then(response => {
    if (!response.success){
        if (response.code === "J004"){
            console.log("access토큰 만료")
            {GetAccessToken}
        }
        if (response.code === "J008"){
            console.log("refresh토큰 만료")
            {GetRefreshToken}
        }
    }
    })
}
return(
    <div>
    <button type='button' onClick={onClickLogin}>Login</button> </div>
);}    
export default Auth;