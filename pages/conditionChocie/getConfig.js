/**
 * Created by xiabingwu on 2016/11/21.
 */
export default function (canvasConfig, labels, data) {
  var chartConfig = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: "",
        backgroundColor: "#FFFAF0",
        borderColor: "#efb336",
        pointBackgroundColor: '#ffffff',
        pointHitRadius: 10,
        borderWidth: 2,
        data: data
      }]
    },
    options: {
      legend: {//
        displayFixed: false//如果隐藏legend请使用自定义的displayFixed: false，而不是display: false
      },
      layout: {
        padding: {
          right: 20//如果x轴最后一个坐标数字被部分隐藏的话 请把这个值调大
        }
      },
      scaleBeginAtZero: true,
      responsive: false,//自适应设置为false
      title: {
        display: false,
        text: ''
      },
      tooltips: {
        displayColors: true,//不显示小方框
        mode: 'x',
        callbacks: {
          title: function (tooltipItem) {
            //return tooltipItem[0].xLabel+':'+tooltipItem[0].yLabel;
            return tooltipItem[0].xLabel + "步数:" + tooltipItem[0].yLabel;
          },
          label: function (tooltipItem) {
            console.log(tooltipItem)
            //return tooltipItem.yLabel+'';
            return '';
          }
        }

      },
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            //display:false,
            //hideX:true,//这是自定义参数 业务需要添加隐藏X轴
          },
          scaleLabel: {
            display: false,
            labelString: '日期'
          },
          ticks: {
            maxTicksLimit: 7,
            fontColor: '#9E9E9E',
            fontFamily: "'Lucida Grande', 'Lucida Sans Unicode', Arial, Helvetica, sans-serif",
            //beginAtZero:true
          }
        }],
        yAxes: [{
          display: true,
          gridLines: {
            //display:false,
            // hideY:true,//这是自定义参数 业务需要添加隐藏y轴
          },
          ticks: {
            maxTicksLimit: 4,
            fontColor: 'transparent',
            fontFamily: "'Lucida Grande', 'Lucida Sans Unicode', Arial, Helvetica, sans-serif",
            beginAtZero: true
          },
          scaleLabel: {
            display: false,
            labelString: ''
          }
        }]
      }
    }
  }
  return {
    chartConfig: chartConfig,
    canvasConfig: canvasConfig
  }
}