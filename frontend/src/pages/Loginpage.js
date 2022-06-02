import './Loginpage.css';
import React, { useState } from 'react';
// import {useDispatch} from 'react-redux';
// import {loginUser} from './_actions/user_action';
// import axios, { Axios } from 'axios';
import imgA from '../assets/loginpage/IMG_9315.JPG';
import imgB from '../assets/loginpage/btn_google.png';
import imgC from '../assets/loginpage/kakao_login_large_narrow.png';


function LoginPage(props) {
  // const dispatch = useDispatch();

  const [inputId, setInputId] = useState('')
  const [inputPw, setInputPw] = useState('')
   
  const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
	// login 버튼 클릭 이벤트
    const onClickLogin = (e) => {
        
        e.preventDefault(); //새로고침 막기 위함

        console.log('ID',inputId)
        console.log('PW',inputPw)

        let body = { 
            ID: inputId,
            PW: inputPw
        }
    
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
                <img src={ imgB} /><br></br>
                <img src={ imgC} /></div>
                </div>
        </form>
    </div>
    
  );
}

export default LoginPage;