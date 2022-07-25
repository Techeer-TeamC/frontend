import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import CommonNavbar from "../components/CommonNavbar"
import { Button } from "react-bootstrap";

import {Link, useParams} from 'react-router-dom';


import Spinner from '../components/Spinner';
import ChangePassword from './ChangePassword';


function UserProfile() {    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const { id } = useParams();
  

    useEffect(() => {
        axios.get(`http://3.39.75.19:8080/api/v1/users/`,
        {
            headers: {
                'Authorization':
                'Bearer ' + localStorage.accessToken
            }
        })
        .then(response => {
            setUser(response.data);
            setLoading(false);
        });
    }, []);


    const userDetail = loading ? <Spinner /> : (
        <div>
            <div>Nickname : {user.memberName}</div>
            <div>Email : {user.email}</div>
        </div>
    )

   return (
        <section className="container">
            {
            <CommonNavbar></CommonNavbar>
            }

            {
            <div>
            <h2>회원 정보</h2>
            <hr />
            </div>
            }

            {userDetail}

            <div>
                {/* <button className="btn btn-outline-primary" type="button"  onClick={() => window.location.href="/changepassword"} > 비밀번호 변경 </button> */}
                <button><Link to= '/changepassword' className="links">비밀번호 변경</Link></button>
                {/* <Button>비밀번호 변경</Button> */}
            </div>

        </section>);





    // return (
    //     <section className="container">
    //         {
    //         <CommonNavbar></CommonNavbar>
    //         }

    //         {
    //         <div>
    //         <h2>회원 정보</h2>
    //         <hr />
    //         </div>
    //         }

            
    //         {
         
    //             totalCount ? (
    //                 <>
    //                 <div>
    //                 <div className="row">
    //                     {products && products.map(product => (<RegisterProduct key={product.productId} parentProp={setChange} productId={product.productId} desiredPrice={product.desiredPrice}/>))}
    //                 </div>
    //                 </div>
    //                 </>
    //             ) : 
    //                 '알림을 등록한 상품 내역이 없습니다.'

    //         }

    //     </section>);

}

export default UserProfile;