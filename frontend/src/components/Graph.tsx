import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Modal from "react-modal";

type GraphProps = {
  productId: string;
  modalVisible: (value: boolean) => void;
  productName: string;
};

function Graph({ productId, modalVisible, productName }: GraphProps) {
  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.45)",
      zIndex: 10,
    },
    content: {
      display: "flex",
      justifyContent: "center",
      background: "#ffffe7",
      overflow: "auto",
      padding: "3rem 3rem 0 3rem",
      top: "18vh",
      left: "20vw",
      right: "20vw",
      bottom: "30vh",
      WebkitOverflowScrolling: "touch",
      borderRadius: "14px",
      outline: "none",
      zIndex: 10,
    },
  };

  const [chart, setChart] = useState<any | null>({
    title: {
      text: "최저가 추이 그래프",
    },

    subtitle: {
      text: productName + "<br><b>(30분)</b>",
    },

    credits: {
      text: "",
      href: "#",
    },

    yAxis: {
      title: {
        text: "Price",
      },
    },

    xAxis: {
      type: "datetime",
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {},

    series: [],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://3.39.75.19:8080/api/v1/products/price-history/${productId}`
      )
        .then(function (response) {
          response = response.data;
          setChart({
            series: [
              {
                name: (response as any).mallHistoryInfoList[0].mallName,
                data: (response as any).mallHistoryInfoList[0].priceList,
              },
              {
                name: (response as any).mallHistoryInfoList[1].mallName,
                data: (response as any).mallHistoryInfoList[1].priceList,
              },
              {
                name: (response as any).mallHistoryInfoList[2].mallName,
                data: (response as any).mallHistoryInfoList[2].priceList,
              },
            ],

            plotOptions: {
              series: {
                pointStart: new Date((response as any).date).getTime(),
                pointInterval: 0.5 * 3600 * 1000 * 1,
              },
            },
          });
        })
        .catch(function (error) {
          console.log("에러");
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      <Modal
        isOpen="true"
        onRequestClose={() => modalVisible(false)}
        style={modalStyle}
      >
        <button
          className="btn-close closeModal"
          onClick={() => modalVisible(false)}
        ></button>
        <div className="w-100">
          <HighchartsReact
            containerProps={{
              className: "home_body-chart",
              style: { weight: "100%" },
            }}
            highcharts={Highcharts}
            options={chart}
          />
        </div>
      </Modal>
    </div>
  );
}

export default Graph;
