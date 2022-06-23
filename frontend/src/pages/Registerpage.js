import React, { useState } from "react";

// import { withRouter } from "react-router-dom";

function RegisterPage(props) {
  
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (Password === ConfirmPassword) {
        if ((Email === "") || (Name === "") || (Password === "") || (ConfirmPassword === "") ) {
            alert("모든 항목을 입력하세요")
        }
        else{
            console.log('email',Email)
            console.log('password',Password)

            // let body = {
            //     email: Email,
            //     password: Password
            // }
            
            // dispatch(registerUser(body)).then((res) => {
            //     alert("가입 완료");
            //     props.history.push("/login");
            //   });
        }
        
    } 
    else {
          alert("비밀번호가 일치하지 않습니다");
        }


  };

  
  return ( //실제 화면에 출력할 내용들
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}>
      <form
        onSubmit={onSubmitHandler}
        style={{ display: "flex", flexDirection: "column" }}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="test" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>ConfirmPassword</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
}

export default RegisterPage;
// export default withRouter(RegisterPage);