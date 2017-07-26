'use strict';

(function () {
//   var addButton = document.querySelector('.btn-add');
//   var deleteButton = document.querySelector('.btn-delete');
   var openOnePoll = document.querySelector('.openPoll');
   var display = document.querySelector('#display');
   var apiUrlOption = 'polls/:id/options';
    var chart;
    var legend;
    
    var chartData = [
        {
            "country": "Czech Republic",
            "litres": 156.9
        },
        {
            "country": "Ireland",
            "litres": 131.1
        },
        {
            "country": "Germany",
            "litres": 115.8
        },
        {
            "country": "Australia",
            "litres": 109.9
        },
        {
            "country": "Austria",
            "litres": 108.3
        },
        {
            "country": "UK",
            "litres": 65
        },
        {
            "country": "Belgium",
            "litres": 50
        }
    ];
    
    AmCharts.ready(function () {
        // PIE CHART
        chart = new AmCharts.AmPieChart();
        chart.dataProvider = chartData;
        chart.titleField = "country";
        chart.valueField = "litres";
        chart.gradientRatio = [0, 0, 0 ,-0.2, -0.4];
        chart.gradientType = "radial";
    
        // LEGEND
        legend = new AmCharts.AmLegend();
        legend.align = "center";
        legend.markerType = "circle";
        chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
        chart.addLegend(legend);
    
        // WRITE
        chart.write("chartdiv");
    });
    
    // changes label position (labelRadius)
    function setLabelPosition() {
        if (document.getElementById("rb1").checked) {
            chart.labelRadius = 30;
            chart.labelText = "[[title]]: [[value]]";
        } else {
            chart.labelRadius = -30;
            chart.labelText = "[[percents]]%";
        }
        chart.validateNow();
    }
    
    
    // makes chart 2D/3D
    function set3D() {
        if (document.getElementById("rb3").checked) {
            chart.depth3D = 10;
            chart.angle = 10;
        } else {
            chart.depth3D = 0;
            chart.angle = 0;
        }
        chart.validateNow();
    }
    
    // changes switch of the legend (x or v)
    function setSwitch() {
        if (document.getElementById("rb5").checked) {
            legend.switchType = "x";
        } else {
            legend.switchType = "v";
        }
        legend.validateNow();
    }
    
//   function ready (fn) {
//       if (typeof fn !== 'function') {
//          return;
//       }

//       if (document.readyState === 'complete') {
//          return fn();
//       }

//       document.addEventListener('DOMContentLoaded', fn, false);
//   }

//   function ajaxRequest (method, url, callback) {
//       var xmlhttp = new XMLHttpRequest();

//       xmlhttp.onreadystatechange = function () {
//          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
//             callback(xmlhttp.response);
//          }
//       };

//       xmlhttp.open(method, url, true);
//       xmlhttp.send();
//   }
//   function getOption (data) {
//         var parseData = JSON.parse(data);

//         display.innerHTML = parseData;
//         console.log(apiUrlOption);
//   }
//   ready(ajaxRequest('GET', apiUrlOption, getOption));
   
})();