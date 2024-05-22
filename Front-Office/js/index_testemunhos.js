document.addEventListener('DOMContentLoaded', function () {
    // Buscar testemunhos do localStorage
    var testemunhosData = JSON.parse(localStorage.getItem('testemunhosData')) || [];
    var carouselInner = document.querySelector('.carousel-inner');
 
    // Renderizar testemunhos
    testemunhosData.forEach(function(testemunho, index) {
       var carouselItemClass = index === 0 ? 'carousel-item active' : 'carousel-item'; // Adicionar a classe 'active' apenas ao primeiro item
       var testemunhoHTML = `
          <div class="${carouselItemClass}">
             <div class="client_main">
                <div class="box_left">
                   <p class="lorem_text">${testemunho.texto}</p>
                </div>
                <div class="box_right">
                   <div class="client_taital_left">
                      <div class="client_img"><img src="${testemunho.imagem}" alt="${testemunho.nome}"></div>
                   </div>
                   <div class="client_taital_right">
                      <h4 class="client_name">${testemunho.nome}</h4>
                      <p class="customer_text">${testemunho.profissao}</p>
                   </div>
                </div>
             </div>
          </div>
       `;
       carouselInner.insertAdjacentHTML('beforeend', testemunhoHTML);
    });
 });
 