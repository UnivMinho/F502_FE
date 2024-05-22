(function ($) {
  'use strict';
  $(function () {

    function getLocalStorage() {
      return JSON.parse(localStorage.getItem('atividade')) || [];
    }
    
   
    if ($("#entity-details-chart").length) {
  var SalesChartCanvas = $("#entity-details-chart").get(0).getContext("2d");
  
  // Recuperar os dados do LocalStorage
  var activitiesData = JSON.parse(localStorage.getItem('atividade')) || [];

  // Organizar os dados por organizador e tipo de atividade
  var aggregatedData = {};
  activitiesData.forEach(function(activity) {
    var organizer = activity.Organizador;
    var type = activity.Atividade;
    
    if (!aggregatedData[organizer]) {
      aggregatedData[organizer] = {};
    }

    if (!aggregatedData[organizer][type]) {
      aggregatedData[organizer][type] = 0;
    }

    aggregatedData[organizer][type]++;
  });

  // Extrair os organizadores como labels
  var labels = Object.keys(aggregatedData);

  // Extrair os tipos de atividade
  var activityTypes = [];
  activitiesData.forEach(function(activity) {
    if (!activityTypes.includes(activity.Atividade)) {
      activityTypes.push(activity.Atividade);
    }
  });

  // Montar os datasets para o gráfico
  var datasets = [];
  activityTypes.forEach(function(type) {
    var data = labels.map(function(organizer) {
      return aggregatedData[organizer][type] || 0;
    });

    datasets.push({
      label: type,
      data: data,
      backgroundColor: getRandomColor(), // Função para obter cores aleatórias
    });
  });

  var SalesChart = new Chart(SalesChartCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: datasets
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
          barPercentage: 0.8
        }]
      },
      legend: {
        display: true,
        position: 'top'
      },
      elements: {
        point: {
          radius: 0
        }
      }
    },
  });
}

// Função para gerar cores aleatórias
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

if ($("#detailed-activities-chart").length) {
  // Recuperar os dados do LocalStorage
  var activitiesData = JSON.parse(localStorage.getItem('atividade')) || [];

  // Contar o número total de atividades por tipo
  var activityCounts = {};
  var totalActivities = 0;
  activitiesData.forEach(function(activity) {
    var type = activity.Atividade;
    if (!activityCounts[type]) {
      activityCounts[type] = 0;
    }
    activityCounts[type]++;
    totalActivities++;
  });

  // Extrair os tipos de atividade e seus contadores
  var activityTypes = Object.keys(activityCounts);
  var activityTotals = Object.values(activityCounts);

  var areaData = {
    labels: activityTypes,
    datasets: [{
      data: activityTotals,
      backgroundColor: getRandomColors(activityTypes.length), // Função para obter cores aleatórias
      borderColor: "rgba(0,0,0,0)"
    }]
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
    legendCallback: function(chart) {
      // Aqui você pode adicionar uma legenda personalizada, se necessário
    },
  };

  var detailedActivitiesChartPlugins = {
    beforeDraw: function(chart) {
      var width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx,
          fontSize = 3.125,
          text = totalActivities.toString(), // Converter o total de atividades para string
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
  
      ctx.restore();
      ctx.font = "500 " + fontSize + "em sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#FFFFFF"; // Cor do texto (branco)
      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  };
  

  var detailedActivitiesChartCanvas = $("#detailed-activities-chart").get(0).getContext("2d");
  var detailedActivitiesChart = new Chart(detailedActivitiesChartCanvas, {
    type: 'doughnut',
    data: areaData,
    options: areaOptions,
    plugins: detailedActivitiesChartPlugins
  });

  // Exibir o total de atividades
  $("#detailed-activities-chart-total").text("Total de atividades: " + totalActivities);

  // document.getElementById('detailed-activities-legend').innerHTML = detailedActivitiesChart.generateLegend(); // Se quiser adicionar legenda
}

// Função para gerar cores aleatórias
function getRandomColors(count) {
  var colors = [];
  for (var i = 0; i < count; i++) {
    var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(color);
  }
  return colors;
}



    function format(d) {
      // `d` is the original data object for the row
      return '<table cellpadding="5" cellspacing="0" border="0" style="width:100%;">' +
        '<tr class="expanded-row">' +
        '<td colspan="8" class="row-bg"><div><div class="d-flex justify-content-between"><div class="cell-hilighted"><div class="d-flex mb-2"><div class="mr-2 min-width-cell"><p>Policy start date</p><h6>25/04/2020</h6></div><div class="min-width-cell"><p>Policy end date</p><h6>24/04/2021</h6></div></div><div class="d-flex"><div class="mr-2 min-width-cell"><p>Sum insured</p><h5>$26,000</h5></div><div class="min-width-cell"><p>Premium</p><h5>$1200</h5></div></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Quote no.</p><h6>Incs234</h6></div><div class="mr-2"><p>Vehicle Reg. No.</p><h6>KL-65-A-7004</h6></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Policy number</p><h6>Incsq123456</h6></div><div class="mr-2"><p>Policy number</p><h6>Incsq123456</h6></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-3 d-flex"><div class="highlighted-alpha"> A</div><div><p>Agent / Broker</p><h6>Abcd Enterprices</h6></div></div><div class="mr-2 d-flex"> <img src="../../images/faces/face5.jpg" alt="profile"/><div><p>Policy holder Name & ID Number</p><h6>Phillip Harris / 1234567</h6></div></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Branch</p><h6>Koramangala, Bangalore</h6></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Channel</p><h6>Online</h6></div></div></div></div></td>'
      '</tr>' +
        '</table>';
    }

    function getLocalStorage() {
      return JSON.parse(localStorage.getItem('atividade')) || [];
    }
    
    var table = $('#example').DataTable({
      "data": getLocalStorage(), // Utilize a função getLocalStorage() para buscar os dados
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
    
    // Atualizar a tabela com os dados do LocalStorage
    function updateTable() {
      var data = getLocalStorage();
      table.clear().rows.add(data).draw();
    }
    
    // Chame a função updateTable() para popular a tabela com os dados do LocalStorage
    updateTable();

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

  document.addEventListener('DOMContentLoaded', function() {
    atualizarEstatisticas();
  });
  
  function getLocalStorage() {
    return JSON.parse(localStorage.getItem('atividade')) || [];
  }
  
  function atualizarEstatisticas() {
    const atividades = getLocalStorage();
    const hoje = new Date().toISOString().split('T')[0];
    let atividadesHoje = 0;
    let capacidadeAtividades = 0;
    let participantesTotais = 52;
  
    atividades.forEach(atividade => {
      if (formatarData(atividade.Data) === hoje) {
        atividadesHoje++;
      }
      capacidadeAtividades += parseInt(atividade.maxParticipantes, 10);
      participantesTotais += atividade.participantes ? parseInt(atividade.participantes, 10) : 0;
    });
  
    document.getElementById('atividadesHoje').textContent = atividadesHoje;
    document.getElementById('atividadesTotais').textContent = atividades.length;
    document.getElementById('capacidadeAtividades').textContent = capacidadeAtividades;
    document.getElementById('participantesTotais').textContent = participantesTotais;
  
    // Aqui você pode calcular e atualizar o percentual de 30 dias, se necessário
    const percentual30Dias = calcularPercentual30Dias(atividades);
    document.getElementById('percentual30Dias').textContent = `${percentual30Dias.toFixed(2)}% (30 dias)`;
  
    const percentualParticipantes = calcularPercentualParticipantes(participantesTotais);
    document.getElementById('percentualParticipantes').textContent = `${percentualParticipantes.toFixed(2)}% (30 dias)`;
  }
  
  function formatarData(data) {
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
  }
  
  function calcularPercentual30Dias(atividades) {
    // Implemente a lógica para calcular o percentual de 30 dias, se necessário
    // Aqui está um exemplo simples de como isso pode ser feito
    const hoje = new Date();
    const trintaDiasAtras = new Date(hoje.setDate(hoje.getDate() - 30)).toISOString().split('T')[0];
    let atividadesUltimos30Dias = 0;
  
    atividades.forEach(atividade => {
      if (formatarData(atividade.Data) >= trintaDiasAtras) {
        atividadesUltimos30Dias++;
      }
    });
  
    return (atividadesUltimos30Dias / atividades.length) * 100;
  }
  
  function calcularPercentualParticipantes(participantesTotais) {
    // Implemente a lógica para calcular o percentual de participantes, se necessário
    // Aqui está um exemplo simples de como isso pode ser feito
    const participantesUltimos30Dias = 10; // Suponha um valor fixo para exemplo
    return (participantesUltimos30Dias / participantesTotais) * 100;
  }
  
  


  document.addEventListener('DOMContentLoaded', function() {
    atualizarEstatisticas();
  });
  
  function getLocalStorage() {
    return JSON.parse(localStorage.getItem('atividade')) || [];
  }
  
  function atualizarEstatisticas() {
    const atividades = getLocalStorage();
    const hoje = new Date().toISOString().split('T')[0];
    let atividadesHoje = 0;
    let capacidadeAtividades = 0;
    let participantesTotais = 52;
  
    atividades.forEach(atividade => {
      if (formatarData(atividade.Data) === hoje) {
        atividadesHoje++;
      }
      capacidadeAtividades += parseInt(atividade.maxParticipantes, 10);
      participantesTotais += atividade.participantes ? parseInt(atividade.participantes, 10) : 0;
    });
  
    document.getElementById('atividadesHoje').textContent = atividadesHoje;
    document.getElementById('atividadesTotais').textContent = atividades.length;
    document.getElementById('capacidadeAtividades').textContent = capacidadeAtividades;
    document.getElementById('participantesTotais').textContent = participantesTotais;
  
    // Aqui você pode calcular e atualizar o percentual de 30 dias, se necessário
    const percentual30Dias = calcularPercentual30Dias(atividades);
    document.getElementById('percentual30Dias').textContent = `${percentual30Dias.toFixed(2)}% (30 dias)`;
  
    const percentualParticipantes = calcularPercentualParticipantes(participantesTotais);
    document.getElementById('percentualParticipantes').textContent = `${percentualParticipantes.toFixed(2)}% (30 dias)`;
  }
  
  function formatarData(data) {
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
  }
  
  function calcularPercentual30Dias(atividades) {
    // Implemente a lógica para calcular o percentual de 30 dias, se necessário
    // Aqui está um exemplo simples de como isso pode ser feito
    const hoje = new Date();
    const trintaDiasAtras = new Date(hoje.setDate(hoje.getDate() - 30)).toISOString().split('T')[0];
    let atividadesUltimos30Dias = 0;
  
    atividades.forEach(atividade => {
      if (formatarData(atividade.Data) >= trintaDiasAtras) {
        atividadesUltimos30Dias++;
      }
    });
  
    return (atividadesUltimos30Dias / atividades.length) * 100;
  }
  
  function calcularPercentualParticipantes(participantesTotais) {
    // Implemente a lógica para calcular o percentual de participantes, se necessário
    // Aqui está um exemplo simples de como isso pode ser feito
    const participantesUltimos30Dias = 10; // Suponha um valor fixo para exemplo
    return (participantesUltimos30Dias / participantesTotais) * 100;
  }
  
  

  
  

})(jQuery);