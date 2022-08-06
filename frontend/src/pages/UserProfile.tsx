import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import CommonNavbar from "../components/CommonNavbar";

import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`users/`, {
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
        },
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      });
  }, []);

  const userDetail = loading ? (
    <Spinner />
  ) : (
    <div>
      <div>Nickname : {user.memberName}</div>
      <div>Email : {user.email}</div>
    </div>
  );

  return (
    <section className="container">
      {<CommonNavbar></CommonNavbar>}

      {
        <div>
          <h2>회원 정보</h2>
          <hr />
        </div>
      }

      {userDetail}

      <div>
        <button>
          <Link to="/change-password" className="links">
            비밀번호 변경
          </Link>
        </button>
      </div>
    </section>
  );
}

export default UserProfile;
