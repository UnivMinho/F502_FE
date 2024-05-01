// atividadesFront.js

document.addEventListener('DOMContentLoaded', function() {
  carregarAtividades();
});

function carregarAtividades() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var atividades = JSON.parse(this.responseText).data;
          exibirAtividades(atividades);
      }
  };
  xhttp.open("GET", "../Back-Office/js/data.txt", true);
  xhttp.send();
}


function exibirAtividades(atividades) {
  var container = document.getElementById('atividades-container');
  container.innerHTML = ''; // Limpa o conteúdo anterior

  atividades.forEach(function(atividade) {
      var card = criarCard(atividade);
      container.appendChild(card);
  });

  // Adicionar manipulador de evento de clique aos botões "VER MAIS"
  var botoesVerMais = document.querySelectorAll('.ver-mais-btn');
  botoesVerMais.forEach(function(botao) {
      botao.addEventListener('click', function() {
          preencherModal(atividades[botao.dataset.index]);
      });
  });
}

function preencherModal(atividade) {
  var modalTitle = document.querySelector('.modal-title');
  var modalBody = document.querySelector('.modal-body');
  modalTitle.textContent = atividade.Nome;
  modalBody.innerHTML = `
      <p><strong>Nome:</strong> ${atividade.Nome}</p>
      <p><strong>Localização:</strong> ${atividade.Local}</p>
      <p><strong>Data:</strong> ${atividade.Data}</p>
      <p><strong>Horário:</strong> ${atividade.horario}</p>
      <p><strong>Preço:</strong> ${atividade.Preco}</p>
      <p><strong>Participantes:</strong> ${atividade.Nparticipantes}</p>
      
  `;
  return;
}


function criarCard(atividade) {
  var card = document.createElement('div');
  card.className = 'col-md-4';

  var cardInnerHtml = `
      <div class="card" style="width: 18rem;">
          <img src="${atividade.imagem}" class="card-img-top" alt="...">
          <div class="card-body">
              <div class="card-title-price">
                  <h5 class="card-title"><strong>${atividade.Nome}</strong></h5>
                  <p class="price">${atividade.Preco}</p>
              </div>
              <p class="card-text"><strong>Localização:</strong> ${atividade.Local}</p>
              <p class="card-text"><strong>Data:</strong> ${atividade.Data}</p>
              <div class="text-center">
                  <button type="button" class="btn btn-success ver-mais-btn" data-toggle="modal" data-target="#exampleModal">
                      VER MAIS
                  </button>
              </div>
          </div>
      </div>
  `;

  card.innerHTML = cardInnerHtml;
  return card;
}
