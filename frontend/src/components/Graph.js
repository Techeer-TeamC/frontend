import React, {useState, useEffect} from 'react';
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";







function Graph(){

  
  const [chart, setChart] = useState({
    title: {
      text: '최저가 추이 그래프'
    },

    subtitle: {
      text: '(30분)'
    },
    

    yAxis: {
      title: {
        text: 'Price'
      }
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2009 to 2020'
      }
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2000

      }
    },

    series: [{
      name: "asd",
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
      name: 'bcd',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
      name: 'efg',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
      name: 'asdasd',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }],
    series: [],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  });

  
  
  
  
  useEffect( () => {
    const fetchData = async () => {
      const result = await axios(
          `https://ea27c19b-8e3f-4b60-a355-e4ef6cd5a1ee.mock.pstmn.io//chart`
      )
        .then(function (response) {
          response= response.data.data;
          console.log("성공");
          console.log(response);
          setChart({

            series: [{
              name: response[0].mallName,
              data: response[0].price
            }, {
              name: response[1].mallName,
              data: response[1].price
            }, {
              name: response[2].mallName,
              data: response[2].price
            }
          ]
        });


        })
        .catch(function (error) {
          console.log("에러");
        })
    }
    fetchData();
  },[]);
  
  return(
      <div>
        {/*<ui>*/}
        {/*  <li>*/}
        {/*    <a onClick={() => setChart("1") }>*/}
        {/*      <span>1번 차트</span>*/}
        {/*    </a>*/}
        {/*  </li>*/}
        {/*  <li>*/}
        {/*    <a onClick={() => setChart(option2) }>*/}
        {/*      <span> 2번 차트</span>*/}
        {/*    </a>*/}
        {/*  </li>*/}
        {/*</ui>*/}
        <HighchartsReact
            containerProps={{ className: "home_body-chart" }}
            highcharts={Highcharts}
            options={chart}
        />
      </div>
)
}





export default Graph;
