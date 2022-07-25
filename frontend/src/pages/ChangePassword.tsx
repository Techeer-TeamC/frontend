import React, { useEffect, useCallback, useState} from 'react';
import { Button } from "react-bootstrap";
import { useNavigate, Navigate } from 'react-router-dom'
import CommonNavbar from "../components/CommonNavbar"
import axios from 'axios';


const ChangePassword = () => {

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [renewPassword, setRenewPassword] = useState('')
  const [change, setChange] = useState(false);

  const handleInputPw = (e) => {
    setPassword(e.target.value);
  }

  const handleInputNewPassword = (e) => {
    setNewPassword(e.target.value);
  }

  const handleInputRenewPassword = (e) => {
    setRenewPassword(e.target.value);
  }

  const onClickChangePassword = (e) => {
    try{
      axios({
        method: 'put',
        url: `http://3.39.75.19:8080/api/v1/users/`,
        headers: {
          'Authorization':
          'Bearer ' + localStorage.accessToken
      },
        data: {
          oldPassword: password,
          newPassword: newPassword,
          reNewPassword: renewPassword
        }}
      )
      .then(response => {
        alert(`비밀번호 변경 완료`);
        setChange(true);
        // navigate("./userprofile");
        // return <Navigate to="/userprofile" />;
      })
      .catch(error => {
        const errorType = error.response.data.code;

        if(errorType=="P001"){  //NOT DUPLICATE PASSWORD
          window.alert("새 비밀번호의 값과 재입력한 비밀번호의 값이 일치하지 않습니다.");
        }
        else if(errorType=="P002"){  //duplicate passwords
          window.alert("새 비밀번호의 값은 이전 비밀번호와 다르게 입력해주세요.")
        }
        else {  //invalid password
          window.alert("기존 비밀번호를 다시 확인해주세요.");
          console.error(error);
        }
      })
    } catch(e){
      console.log(e);
    }

  }
  
  return (
    change ?
    <Navigate to="/userprofile" /> :

    <section className="container">
      <CommonNavbar></CommonNavbar>
      <div>
      <h2>비밀번호 변경</h2>
      <hr />
      </div>

      <form  className="form-change-password">

        <input
            name="currentPassword"
            type="password"
            placeholder="Current Password"
            className="form-control"
            value={password}
            onChange={handleInputPw}
        />

        <input
            name="newPassword"
            type="password"
            placeholder="New Password"
            className="form-control"
            value={newPassword}
            onChange={handleInputNewPassword}
        />

        <input
            name="newPasswordRepeated"
            type="password"
            placeholder="New Password Repeated"
            className="form-control"
            value={renewPassword}
            onChange={handleInputRenewPassword}
        />

        <Button type="button"
                color="success"
                onClick={onClickChangePassword}
        >
        Change Password
        </Button>
      </form>
    </section>
  );
};
  
  export default ChangePassword;