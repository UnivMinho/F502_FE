document.addEventListener('DOMContentLoaded', function () {
    // Buscar testemunhos do localStorage
    var testemunhosData = JSON.parse(localStorage.getItem('testemunhosData')) || [];
    var carouselIndicators = document.getElementById('testemunhos-carousel-indicators');
    var carouselInner = document.getElementById('testemunhos-carousel-inner');

    // Limpar conteúdo existente do carrossel
    carouselIndicators.innerHTML = '';
    carouselInner.innerHTML = '';

    // Renderizar testemunhos
    testemunhosData.forEach(function(testemunho, index) {
        var carouselItemClass = index === 0 ? 'carousel-item active' : 'carousel-item'; // Adicionar a classe 'active' apenas ao primeiro item
        var testemunhoHTML = `
            <div class="${carouselItemClass}">
                <div class="client_main">
                    <div class="box_left">
                        <p class="lorem_text">${testemunho.Texto}</p>
                    </div>
                    <div class="box_right">
                        <div class="client_taital_left">
                            <div class="client_img"><img src="${testemunho.Imagem}" alt="${testemunho.Nome}"></div>
                        </div>
                        <div class="client_taital_right">
                            <h4 class="client_name">${testemunho.Nome}</h4>
                            <p class="customer_text">${testemunho.Profissao}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        carouselInner.insertAdjacentHTML('beforeend', testemunhoHTML);
    });
});






 