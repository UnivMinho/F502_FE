document.addEventListener('DOMContentLoaded', function () {
    renderCheckboxes();
    exibirAtividades();
});

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('atividade')) || [];
}

function getUniqueTypes() {
    const atividades = getLocalStorage();
    const types = new Set(atividades.map(atividade => atividade.Atividade));
    return Array.from(types);
}

function renderCheckboxes() {
    const dropdown = document.getElementById('dropdown-checkboxes');
    const types = getUniqueTypes();

    dropdown.innerHTML = ''; // Limpa o conteúdo anterior

    // Adiciona a checkbox para "Todas"
    const allCheckbox = document.createElement('div');
    allCheckbox.className = 'form-check';
    allCheckbox.innerHTML = `
        <input class="form-check-input" type="checkbox" id="all" value="all" checked>
        <label class="form-check-label" for="all">Todas</label>
    `;
    dropdown.appendChild(allCheckbox);

    types.forEach(type => {
        const checkbox = document.createElement('div');
        checkbox.className = 'form-check';
        checkbox.innerHTML = `
            <input class="form-check-input" type="checkbox" id="${type}" value="${type}" checked>
            <label class="form-check-label" for="${type}">${type}</label>
        `;
        dropdown.appendChild(checkbox);
    });

    const checkboxes = dropdown.querySelectorAll('.form-check-input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });
}

function handleCheckboxChange() {
    const allCheckbox = document.getElementById('all');
    const checkboxes = document.querySelectorAll('#dropdown-checkboxes .form-check-input');

    if (this.value === 'all') {
        if (this.checked) {
            checkboxes.forEach(checkbox => {
                if (checkbox.value !== 'all') {
                    checkbox.checked = false;
                }
            });
        } else {
            this.checked = true; // A checkbox "Todas" não pode ser desmarcada
        }
    } else {
        allCheckbox.checked = false;
        const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked && checkbox.value !== 'all');
        if (!anyChecked) {
            allCheckbox.checked = true; // Reativa a checkbox "Todas" se nenhuma outra estiver marcada
        }
    }
    exibirAtividades();
}

function exibirAtividades() {
    const container = document.getElementById('atividades-container');
    const atividades = getLocalStorage();
    const checkboxes = document.querySelectorAll('#dropdown-checkboxes .form-check-input');
    const selectedTypes = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked && checkbox.value !== 'all')
        .map(checkbox => checkbox.value);

    container.innerHTML = ''; // Limpa o conteúdo anterior

    atividades
        .filter(atividade => selectedTypes.length === 0 || selectedTypes.includes(atividade.Atividade))
        .forEach((atividade, index) => {
            const col = document.createElement('div');
            col.className = 'col-md-4'; // Classe de coluna do Bootstrap
            const card = criarCard(atividade, index);
            col.appendChild(card);
            container.appendChild(col);
        });

    // Adicionar manipulador de evento de clique aos botões "VER MAIS"
    const botoesVerMais = document.querySelectorAll('.ver-mais-btn');
    botoesVerMais.forEach(botao => {
        botao.addEventListener('click', function () {
            preencherModal(atividades[botao.dataset.index]);
        });
    });
}

function preencherModal(atividade) {
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');
    modalTitle.textContent = atividade.Nome;
    modalBody.innerHTML = `
        <p><strong>Descrição:</strong> ${atividade.Descricao}</p>
        <p><strong>Nome:</strong> ${atividade.Nome}</p>
        <p><strong>Tipo:</strong> ${atividade.Atividade}</p>
        <p><strong>Localização:</strong> ${atividade.Local}</p>
        <p><strong>Data:</strong> ${atividade.Data}</p>
        <p><strong>Horário:</strong> ${atividade.Horario}</p>
        <p><strong>Preço:</strong> ${atividade.Preco}</p>
        <p><strong>Participantes:</strong> ${atividade.maxParticipantes}</p>
    `;
}

$('#toggleButton').click(function () {
    $('#toggleIcon').toggleClass('rotated');
});

function criarCard(atividade, index) {
    const card = document.createElement('div');
    card.className = 'card'; // Classe do card Bootstrap
    card.style.width = '18rem';
  
    const imagem = atividade.Imagem ? atividade.Imagem : 'images/img-walking.jpg'; // Utiliza a imagem do localStorage ou uma imagem padrão
  
    card.innerHTML = `
        <img src="${imagem}" class="card-img-top" alt="Imagem da Atividade">
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
    `;
    return card;
  }
  


