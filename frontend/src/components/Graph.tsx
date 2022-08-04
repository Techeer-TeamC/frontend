import React, { useState, useEffect } from "react";
import axios from "../api/axios";
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
      overflow: "visible",
      padding: "3rem 3rem 0 3rem",
      top: "18vh",
      left: "20vw",
      right: "20vw",
      bottom: "19vh",
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

  const [chartDate, setChartDate] = useState<number>(0);

  useEffect(() => {
    const fetchData_30m = async () => {
      const result = await axios(`products/price-history/${productId}`)
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

    const fetchData_time = async () => {
      let timeRequestDto = {
        day: chartDate,
        month: 0,
      };
      const result = await axios
        .post(`products/price-history/${productId}/month-time`, timeRequestDto)
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

            subtitle: {
              text: productName + `<br><b>${chartDate}일</b>`,
            },

            plotOptions: {
              series: {
                pointStart: new Date((response as any).date).getTime(),
                pointInterval: 1 * 24 * chartDate * 3600 * 1000 * 1,
              },
            },
          });
        })
        .catch(function (error) {
          console.log("에러");
        });
    };

    if (chartDate == 0) {
      fetchData_30m();
    } else {
      fetchData_time();
    }
  }, [chartDate]);

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
          <div className=" text-center mt-2 ">
            <button className="w-10 btn " onClick={() => setChartDate(0)}>
              30m
            </button>
            <button className="w-10 btn " onClick={() => setChartDate(1)}>
              1Day
            </button>
            <button className="w-10 btn " onClick={() => setChartDate(7)}>
              1Week
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Graph;
