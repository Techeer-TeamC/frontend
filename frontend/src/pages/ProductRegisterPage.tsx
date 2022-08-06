import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import "./Search.css";
import "rc-pagination/assets/index.css";
import CommonNavbar from "../components/CommonNavbar";
import RegisterProduct from "../components/RegisterProduct";

type RegistedroductProps = {
  productRegisterId: number;
  productId: string;
  desiredPrice: number;
  minimumPrice: number;
  userId: number;
};

function ProductRegisterList() {
  const [products, setDataList] = useState<RegistedroductProps[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [change, setChange] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      window.scrollTo(0, 0);
      console.log(localStorage.accessToken);
      const result = await axios.get(`products/list`, {
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
        },
      });

      setDataList(result.data);
      setTotalCount(result.data.length);
      setChange(true);
    };
    fetchData();
  }, [change]);

  return (
    <section className="container">
      {<CommonNavbar></CommonNavbar>}

      {
        <div>
          <h2>마이 페이지</h2>
          <hr />
        </div>
      }

      {totalCount ? (
        <>
          <div>
            <div className="row">
              {products &&
                products.map((product) => (
                  <RegisterProduct
                    key={product.productId}
                    parentProp={setChange}
                    productId={product.productId}
                    desiredPrice={product.desiredPrice}
                  />
                ))}
            </div>
          </div>
        </>
      ) : (
        "알림을 등록한 상품 내역이 없습니다."
      )}
    </section>
  );
}

export default ProductRegisterList;
