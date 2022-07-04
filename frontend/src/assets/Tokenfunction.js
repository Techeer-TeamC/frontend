import React from 'react';
import { useNavigate } from 'react-router-dom'

function Tokenfunction(props) {

    const navigate = useNavigate();

    let actoken = localStorage.getItem('access_token') || '';
    let rftoken = localStorage.getItem('refresh_token') || '';

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + actoken);



    //토큰 있을 때의 통신(토큰만료처리 포함)
    const onClickTokenTest = (e) => {
        
        //알림 상품 등록등 토큰을 헤더에 넣어야 하는 기능들
        fetch('http://3.39.75.19:8080/api/v1/auth/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // myHeaders
            },
            body: JSON.stringify({
                'email': 'q@naver.com',
                'password': 'q'
            })
        })

        .then(response => response.json())
        .then(response => {
            console.log("api작동ㅇㅋ");
        
            //토큰 만료판단, 이후 토큰 갱신 처리
        if (!response.grantType){
                
                //access토큰 만료
            if (response.code === "J002"){
                console.log("access토큰 만료");
                GetAccessToken();
                console.log("access토큰 갱신ㅇㅋ");
                //해당 컴포넌트 재실행
            }
                //refresh토큰 만료
            if (response.code === "J008"){
                console.log("refresh토큰 만료");
                GetRefreshToken();
            }
            
            //토큰 유효, 응답 처리
        } else
            console.log("토큰 유효");
            //응답처리
    }); 
    }





        //access 토큰 재발급 요청
        function GetAccessToken () {
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

                if (response.accessToken && response.refreshToken) {
                    localStorage.setItem('access_token', response.accessToken);
                    localStorage.setItem('refresh_token', response.refreshToken);
                    // setIsLogin(true);    
                    console.log('access_token 재발급:', response.accessToken);
                    let actoken = localStorage.getItem('access_token') || '';
                    let rftoken = localStorage.getItem('refresh_token') || '';
                }
            }))    
        };

        //refresh 토큰 재발급 요청
        // export 
        function GetRefreshToken (){
            console.log("rf토큰 재발급 요청함수 동작");
            //auth 설정
            navigate('/login', {replace: true});
            //이후 로그인 모듈 통해 토큰은 알아서 저장됨
        };    








return(
    <form>
    <button type='button' onClick={onClickTokenTest}>Test</button> </form>
);}    
export default Tokenfunction;