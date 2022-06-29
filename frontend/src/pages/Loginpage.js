import './Loginpage.css';
import React, { useState , useEffect} from 'react';
// import {useDispatch} from 'react-redux';
// import {loginUser} from './_actions/user_action';
// import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom'
import imgA from '../assets/loginpage/IMG_9315.JPG';
import imgB from '../assets/loginpage/btn_google.png';
import imgC from '../assets/loginpage/kakao_login_large_narrow.png';
// {authenticated, login, location

function LoginPage(props) {
  // const dispatch = useDispatch();
  const [isLogin , setIsLogin] = useState(false);

  const [inputId, setInputId] = useState('')
  const [inputPw, setInputPw] = useState('')
  
  const navigate = useNavigate();

  const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
	// login 버튼 클릭 이벤트
    const onClickLogin = (e) => {
    
            fetch('http://3.39.75.19:8080/api/v1/auth/new', {
                method: 'POST',
                headers: { //get일 때는 없어도 됨
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'email': inputId,
                    'password': inputPw
                })
            })

            .then(response => response.json())
            .then(response => {

                if (response.data.accessToken && response.data.refreshToken) {
                localStorage.setItem('access_token', response.data.accessToken);
                localStorage.setItem('refresh_token', response.data.refreshToken);
                setIsLogin(true);    
                // console.log('access_token', response.data.accessToken);
                navigate('/', {replace: true});

                }
            });
        // console.log('ID',inputId)
        // console.log('PW',inputPw)

        // let body = { 
        //     ID: inputId,
        //     PW: inputPw
        // }
    
        // dispatch(loginUser(body))
        //     .then(response => {
        //         if(response.payload.success) {
        //             props.history.push('/')
        //         } else{
        //             alert('Error')
        //         }
                // .then(token => {
                //     localStorage.setItem("jwt",token.accessToken)
                // })
        //     })
     }
 

     
    
    return (
        

    <div className="App">
        <img src={ imgA} />
        <form className="cover">
            
            <h2>Login to your account</h2>
            
            <div className="blank">
            <div className="bar">
                <label htmlFor='input_id'>Email : </label>
                <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
            </div>
            <div className="bar">
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div><br></br><br></br><br></br><br></br>
                <div className="button">
                <button type='button' onClick={onClickLogin}>Login</button>
                <br></br><br></br>
                <a target="_self" href="https://accounts.google.com/o/oauth2/v2/auth"><img src={ imgB} /></a><br></br>
                <a target="_self" href="https://kauth.kakao.com/oauth/authorize"><img src={ imgC} /></a></div>
                </div>
        </form>
    </div>
    
  );
}

export default LoginPage;
