import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

type RegisterProps = {
  (userInfo: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  });
};

function SignUp() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
    // console.log(userInfo);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: userInfo.email,
      password: userInfo.password,
      memberName: userInfo.username,
    };
    // console.log(data);

    if (userInfo.password === userInfo.confirmPassword) {
      if (
        userInfo.email === "" ||
        userInfo.username === "" ||
        userInfo.password === "" ||
        userInfo.confirmPassword === ""
      ) {
        alert("모든 항목을 입력하세요");
      } else {
        axios
          .post("users/new", {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userInfo.email,
              password: userInfo.password,
              memberName: userInfo.username,
            }),
          })
          .then((response) => {
            if (response.status === 204) {
              navigate("/login", { replace: true });
              alert(`${response.status} : 가입 완료`);
            } else {
              alert(`Request Failed: reponse state ${response.status} `);
            }
          })
          .catch((err) => {
            alert("error");
            navigate("/register", { replace: true });
          });
      }
    } else {
      alert("비밀번호가 일치하지 않습니다");
    }
  }; // 초기화

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>Name</label>
        <input
          type="text"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
        />

        <label>ConfirmPassword</label>
        <input
          type="password"
          name="confirmPassword"
          value={userInfo.confirmPassword}
          onChange={handleChange}
        />
        <br />
        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
}

export default SignUp;
// export default withRouter(RegisterPage);
