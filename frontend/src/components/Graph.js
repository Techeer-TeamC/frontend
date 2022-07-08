import React, {useState} from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";







function Graph(){

  const option2 = {
    chart: {
      type: 'spline',
      animation: Highcharts.svg, // don't animate in old IE
      marginRight: 10,
      events: {
        load: function () {
          // set up the updating of the chart each second
          var series = this.series[0];
          setInterval(function () {
            var x = (new Date()).getTime(), // current time
                y = Math.random();
            series.addPoint([x, y], true, true);
          }, 1000);
        }
      }
    },

    time: {
      useUTC: false
    },

    title: {
      text: 'Live random data'
    },

    accessibility: {
      announceNewData: {
        enabled: true,
        minAnnounceInterval: 15000,
        announcementFormatter: function (allSeries, newSeries, newPoint) {
          if (newPoint) {
            return 'New point added. Value: ' + newPoint.y;
          }
          return false;
        }
      }
    },

    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150
    },

    yAxis: {
      title: {
        text: 'Value'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },

    tooltip: {
      headerFormat: '<b>{series.name}</b><br/>',
      pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
    },

    legend: {
      enabled: false
    },

    exporting: {
      enabled: false
    },

    series: [{
      name: 'Random data',
      data: (function () {
        // generate an array of random data
        var data = [],
            time = (new Date()).getTime(),
            i;

        for (i = -19; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            y: Math.random()
          });
        }
        return data;
      }())
    }]


  };



  const option1 = {
    title: {
      text: '최저가 추이 그래프'
    },

    // subtitle: {
    //   text: '최저가 추이 그래프'
    // },

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
        pointStart: 2020
      }
    },

    series: [{
      name: '최저가',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
      name: '쿠팡',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
      name: '옥션',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
      name: '11번가',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }],

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

  };
  
  const [chart, setChart] = useState(option1);
  
  return(
      <div>
        <ui>
          <li>
            <a onClick={() => setChart(option1) }>
              <span>1번 차트</span>
            </a>
          </li>
          <li>
            <a onClick={() => setChart(option2) }>
              <span> 2번 차트</span>
            </a>
          </li>
        </ui>
        <HighchartsReact
            containerProps={{ className: "home_body-chart" }}
            highcharts={Highcharts}
            options={chart}
        />
      </div>
)
}





export default Graph;
