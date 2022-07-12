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
      type: "datetime"
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

      plotOptions: {
    },

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
          response= response.data;
          setChart({

            series: [{
              name: response.data[0].mallName,
              data: response.data[0].price
            }, {
              name: response.data[1].mallName,
              data: response.data[1].price
            }, {
              name: response.data[2].mallName,
              data: response.data[2].price
            }
          ],

            plotOptions: {
              series: {
                pointStart: new Date(response.date).getTime(),
                pointInterval: 0.5 * 3600 * 1000 * 1

              }  
            }
            
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
        <HighchartsReact
            containerProps={{ className: "home_body-chart" }}
            highcharts={Highcharts}
            options={chart}
        />
      </div>
)
}





export default Graph;