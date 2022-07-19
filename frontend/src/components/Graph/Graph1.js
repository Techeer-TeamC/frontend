// import axios from "axios";
// import React, {useState, useEffect} from 'react';
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

//  const Graph1 = () =>{

//  //그래프 사전 설정
//  const [chart, setChart] = useState({
//     title: {
//       text: '최저가 추이 그래프'
//     },

//     subtitle: {
//       text: 'useState 넣어 시간 보여주기'
//     },

//     //y축 이름
//     yAxis: {
//       title: {
//         text: 'Price'
//       }
//     },

//     //x축 이름
//     xAxis: {
//       type: "datetime"
//     },

//     //그래프-마켓 각주
//     legend: {
//       layout: 'vertical',
//       align: 'left',
//       verticalAlign: 'middle'
//     },

//       plotOptions: {
//     },
    
//     series: [], //api통해 데이터 받아옴

//     responsive: {
//       rules: [{
//         condition: {
//           maxWidth: 500
//         },
//         chartOptions: {
//           legend: {
//             layout: 'horizontal',
//             align: 'center',
//             verticalAlign: 'bottom'
//           }
//         }
//       }]
//     }
//   }); 

  

//     const fetchData1 = async () => {
//       const result = await axios(
//           `https://1336cead-8708-46cc-ad7a-9837f1bb282f.mock.pstmn.io//graph1`
//       )
//         .then(function (response) {
//           response= response.data;
//           setChart({

//             series: [{
//               name: response.data[0].mallName,
//               data: response.data[0].price
//             }, {
//               name: response.data[1].mallName,
//               data: response.data[1].price
//             }, {
//               name: response.data[2].mallName,
//               data: response.data[2].price
//             }
//           ],

//             plotOptions: {
//               series: {
//                 pointStart: new Date(response.date).getTime(),
//                 pointInterval: 0.5 * 3600 * 1000 * 1

//               }  
//             }
            
//         });


//         })
//         .catch(function (error) {
//           console.log("에러");
//         })
//     }

//  }
// export default Graph1();



