// import React, { useEffect, useRef, useState} from 'react';
// import {Graph1 ,fetchData1, chart} from './Graph1';
// import axios from "axios";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";







// function Graph(){

//   const [act1, setAct1] = useState('')
//   // const [act2, setAct2] = useState('')

//   const handleAct1 = (e) => {
//     console.log(e.target.value)
//     setAct1(e.target.value)
//     }
//   // const handleAct2 = (e) => {
//   //   setAct2(e.target.value)
//   //   } 

//   const [chart, setChart] = useState({
//     title: {
//       text: '최저가 추이 그래프'
//     },

//     subtitle: {
//       text: '(30분)'
//     },

//     yAxis: {
//       title: {
//         text: 'Price'
//       }
//     },

//     xAxis: {
//       type: "datetime"
//     },

//     legend: {
//       layout: 'vertical',
//       align: 'right',
//       verticalAlign: 'middle'
//     },

//       plotOptions: {
//     },

//     series: [],

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


//   const mounted = useRef(false);
//   // const [isMounting, setMounting] = useState(false);



//   useEffect( () => {
//     mounted.current = false;
//     setAct1 = false;
//     if(!mounted.current){
//       //마운트 이전에 두 api 모두 미리 작동시켜 데이터 받아놓기
//       console.log("마운트 이전");
      
//       fetchData1();
//       fetchData2();
//       //라디오 버튼 관련
//       if (act1 ==='1' || '2')
//         mounted.current = true;
      
//     } 
//     else{
//       if (act1 ==='1'){
  
//       }
//       if (act1 ==='2')
//       // setMounting(true);
//       console.log('마운트 이후');
//     }      
   
//   },[]);



// const fetchData1 = async () => {
//     const result = axios(
//         `https://1336cead-8708-46cc-ad7a-9837f1bb282f.mock.pstmn.io//graph1`
//     )
//     //'http://3.39.75.19:8080/api/v1/crawler/product/history'
//       .then(function (response) {
//         response= response.data;
//         setChart({

//           series: [{
//             name: response.data[0].mallName,
//             data: response.data[0].price
//           }, {
//             name: response.data[1].mallName,
//             data: response.data[1].price
//           }, {
//             name: response.data[2].mallName,
//             data: response.data[2].price
//           }
//         ],

//           plotOptions: {
//             series: {
//               pointStart: new Date(response.date).getTime(),
//               pointInterval: 0.5 * 3600 * 1000 * 1

//             }  
//           }
          
//       });


//       })
//       .catch(function (error) {
//         console.log("에러");
//       })
//   };

// const fetchData2 = async () => {
//     const result = await axios(
//         `https://1336cead-8708-46cc-ad7a-9837f1bb282f.mock.pstmn.io//graph2`
//     )
//     //'http://3.39.75.19:8080/api/v1/crawler/product/history'
//       .then(function (response) {
//         response= response.data;
//         setChart({

//           series: [{
//             name: response.data[0].mallName,
//             data: response.data[0].price
//           }, {
//             name: response.data[1].mallName,
//             data: response.data[1].price
//           }, {
//             name: response.data[2].mallName,
//             data: response.data[2].price
//           }
//         ],

//           plotOptions: {
//             series: {
//               pointStart: new Date(response.date).getTime(),
//               pointInterval: 0.5 * 3600 * 1000 * 1

//             }  
//           }
          
//       });


//       })
//       .catch(function (error) {
//         console.log("에러");
//       })
//   };
    
 
  
  

//   return(
//       <div>
//         {
//           !mounted.current ? 
//           <div><input type='radio' name='act1' value="1" checked={ act1 === '1'} onChange={handleAct1} /> 선택지1 <br></br>
//           <input type='radio' name='act2' value="2" checked={ act1 === '2'}onChange={handleAct1} /> 선택지2</div>
//           :
//            <div><HighchartsReact
//             containerProps={{ className: "home_body-chart" }}
//             highcharts={Highcharts}
//             options={chart} />
//             <input type='radio' name='act1' value="1" checked={ act1 === '1'} onChange={handleAct1} /> 선택지1 <br></br>
//           <input type='radio' name='act2' value="2" checked={ act1 === '2'}onChange={handleAct1} /> 선택지2</div>
            


            
//         }
        
//       </div>
// )
// }





// export default Graph;
