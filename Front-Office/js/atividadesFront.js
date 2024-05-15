// atividadesFront.js

document.addEventListener('DOMContentLoaded', function() {
    exibirAtividades();
  });
  
  function getLocalStorage() {
    return JSON.parse(localStorage.getItem('atividade')) || [];
  }
  
  function exibirAtividades() {
    var container = document.getElementById('atividades-container');
    var atividades = getLocalStorage();
    container.innerHTML = ''; // Limpa o conteúdo anterior
  
    atividades.forEach(function(atividade, index) {
      var card = criarCard(atividade, index);
      container.appendChild(card);
    });
  
    // Adicionar manipulador de evento de clique aos botões "VER MAIS"
    var botoesVerMais = document.querySelectorAll('.ver-mais-btn');
    botoesVerMais.forEach(function(botao) {
      botao.addEventListener('click', function() {
        var index = botao.getAttribute('data-index');
        preencherModal(atividades[index]);
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
  }
  
  function criarCard(atividade, index) {
    var card = document.createElement('div');
    card.id = 'card-activities';
  
    var cardInnerHtml = `
      <div class="card" id="card-activities" style="width: 18rem;">
        <img src="images/img-walking.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <div class="card-title-price">
            <h5 class="card-title"><strong>${atividade.Nome}</strong></h5>
            <p class="price">${atividade.Preco}</p>
          </div>
          <p class="card-text"><strong>Localização:</strong> ${atividade.Local}</p>
          <p class="card-text"><strong>Data:</strong> ${atividade.Data}</p>
          <div class="text-center">
            <button type="button" class="btn btn-success ver-mais-btn" data-toggle="modal" data-target="#exampleModal" data-index="${index}">
              VER MAIS
            </button>
          </div>
        </div>
      </div>
    `;
  
    card.innerHTML = cardInnerHtml;
    return card;
  }
  