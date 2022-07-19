// import React, { useState} from 'react';

// const [isLoggedin, setisLoggedin] = useState('');

// function Auth()
//     if (localStorage.getItem('refresh_token')===true){
//      setisLoggedin(true);
//      라우터 설정
//      

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
           // {GetAccessToken}
        }
        if (response.code === "J008"){
            console.log("refresh토큰 만료")
         //   {GetRefreshToken}
        }
    }
    })
}
return(
    <div>
    <button type='button' onClick={onClickLogin}>Login</button> </div>
);    
export default Auth;
