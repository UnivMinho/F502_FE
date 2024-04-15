(function ($) {
  'use strict';
  $(function () {
   
    if ($("#entity-details-chart").length) {
      var SalesChartCanvas = $("#entity-details-chart").get(0).getContext("2d");
      var SalesChart = new Chart(SalesChartCanvas, {
        type: 'bar',
        data: {
          labels: ["Rafael Alves", "Mariana Neiva", "Bruno Alves", "Miguel Miranda", "José Barreirinho","André Esteves"],
          datasets: [
          {
            label: 'Corrida',
            data: [480, 230, 470, 210, 330,500],
            backgroundColor: '#70DE70'
          },
          {
            label: 'Natação',
            data: [400, 340, 550, 480, 170,500],
            backgroundColor: '#FFC100'
          },
          {
            label: 'Ciclismo',
            data: [480, 230, 470, 210, 330,500],
            backgroundColor: '#FF4747'
          },
          {
            label: 'Futebol',
            data: [400, 340, 550, 480, 170,500],
            backgroundColor: '#248AFD'
          },
          {
            label: 'Jiu-Jitsu',
            data: [480, 230, 470, 210, 330,500],
            backgroundColor: '#151285'
          },
          {
            label: 'Trail',
            data: [400, 340, 550, 480, 170,500],
            backgroundColor: '#FF9898'
          },
          {
            label: 'Pilates',
            data: [480, 230, 470, 210, 330,500],
            backgroundColor: '#3A6A36'
          }
          ]
        },
        options: {
          cornerRadius: 5,
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 20,
              bottom: 0
            }
          },
          scales: {
            yAxes: [{
              display: true,
              gridLines: {
                display: true,
                drawBorder: false,
                color: "#F2F2F2"
              },
              ticks: {
                display: true,
                min: 0,
                max: 560,
                callback: function (value, index, values) {
                  return value;
                },
                autoSkip: true,
                maxTicksLimit: 10,
                fontColor: "#6C7383"
              }
            }],
            xAxes: [{
              stacked: false,
              ticks: {
                beginAtZero: true,
                fontColor: "#6C7383"
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                display: false
              },
              barPercentage: 1
            }]
          },
          legend: {
            display: false
          },
          elements: {
            point: {
              radius: 0
            }
          }
        },
      });
      document.getElementById('entity-details-legend').innerHTML = SalesChart.generateLegend();
    }
    
    if ($("#detailed-activities-chart").length) {
      var areaData = {
        labels: ["Corrida", "Natação", "Ciclismo","Futebol", "Jiu-Jitsu", "Trail", "Pilates"],
        datasets: [{
          data: [100, 50, 50,200,400,30,150],
          backgroundColor: [
            "#70DE70","#FFC100","#FF4747","#248AFD","#151285","#FF9898","#3A6A36"
          ],
          borderColor: "rgba(0,0,0,0)"
        }
        ]
      };
      var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        segmentShowStroke: false,
        cutoutPercentage: 78,
        elements: {
          arc: {
            borderWidth: 4
          }
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        legendCallback: function (chart) {
          var text = [];
          text.push('<div class="report-chart">');
          text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[0] + '"></div><p class="mb-0">Offline sales</p></div>');
          text.push('<p class="mb-0">88333</p>');
          text.push('</div>');
          text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[1] + '"></div><p class="mb-0">Online sales</p></div>');
          text.push('<p class="mb-0">66093</p>');
          text.push('</div>');
          text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[2] + '"></div><p class="mb-0">Returns</p></div>');
          text.push('<p class="mb-0">39836</p>');
          text.push('</div>');
          text.push('</div>');
          return text.join("");
        },
      }
      var detailedActivitiesChartPlugins = {
        beforeDraw: function (chart) {
          var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;

          ctx.restore();
          var fontSize = 3.125;
          ctx.font = "500 " + fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#13381B";

          var text = "5440",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }
      var detailedActivitiesChartCanvas = $("#detailed-activities-chart").get(0).getContext("2d");
      var detailedActivitiesChart = new Chart(detailedActivitiesChartCanvas, {
        type: 'doughnut',
        data: areaData,
        options: areaOptions,
        plugins: detailedActivitiesChartPlugins
      });
    // document.getElementById('detailed-activities-legend').innerHTML = detailedActivitiesChart.generateLegend();     Se quiser adicionar legenda 
    }

    function format(d) {
      // `d` is the original data object for the row
      return '<table cellpadding="5" cellspacing="0" border="0" style="width:100%;">' +
        '<tr class="expanded-row">' +
        '<td colspan="8" class="row-bg"><div><div class="d-flex justify-content-between"><div class="cell-hilighted"><div class="d-flex mb-2"><div class="mr-2 min-width-cell"><p>Policy start date</p><h6>25/04/2020</h6></div><div class="min-width-cell"><p>Policy end date</p><h6>24/04/2021</h6></div></div><div class="d-flex"><div class="mr-2 min-width-cell"><p>Sum insured</p><h5>$26,000</h5></div><div class="min-width-cell"><p>Premium</p><h5>$1200</h5></div></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Quote no.</p><h6>Incs234</h6></div><div class="mr-2"><p>Vehicle Reg. No.</p><h6>KL-65-A-7004</h6></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Policy number</p><h6>Incsq123456</h6></div><div class="mr-2"><p>Policy number</p><h6>Incsq123456</h6></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-3 d-flex"><div class="highlighted-alpha"> A</div><div><p>Agent / Broker</p><h6>Abcd Enterprices</h6></div></div><div class="mr-2 d-flex"> <img src="../../images/faces/face5.jpg" alt="profile"/><div><p>Policy holder Name & ID Number</p><h6>Phillip Harris / 1234567</h6></div></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Branch</p><h6>Koramangala, Bangalore</h6></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Channel</p><h6>Online</h6></div></div></div></div></td>'
      '</tr>' +
        '</table>';
    }
    var table = $('#example').DataTable({
      "ajax": "js/data.txt",
      "columns": [
        { "data": "Codigo" },
        { "data": "Nome" },
        { "data": "Atividade" },
        { "data": "Organizador" },
        { "data": "Local" },
        { "data": "Estado" },
        { "data": "Data" },
      ]
    });
    $('#example tbody').on('click', 'td.details-control', function () {
      var tr = $(this).closest('tr');
      var row = table.row(tr);

      if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
        tr.removeClass('shown');
      }
      else {
        // Open this row
        row.child(format(row.data())).show();
        tr.addClass('shown');
      }
    });

  });
})(jQuery);