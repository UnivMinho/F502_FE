document.addEventListener('DOMContentLoaded', function() {
    exibirBlog();
});

function obterDados() {
    return JSON.parse(localStorage.getItem('blog')) || [];
}

function exibirBlog() {
    const container = document.getElementById('blog-container');
    const blog = obterDados();
    container.innerHTML = ' ';

    blog.forEach(function(blog, index) {
        const col = document.createElement('div');
        col.className = 'col-md-6';
        const card = criarCardBlog(blog, index);
        col.appendChild(card);
        container.appendChild(col);
    });

    // Adicionar manipulador de evento de clique aos botões "Ler Mais"
    const botoesVerMais = document.querySelectorAll('.ver-mais');
    botoesVerMais.forEach(function(botao) {
        botao.addEventListener('click', function() {
            const index = botao.getAttribute('data-index');
            preencherModalBlog(blog[index]);
        });
    });
}

function preencherModalBlog(blog) {
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');
    modalTitle.textContent = blog.Titulo;
    modalBody.innerHTML = `
        <p>${blog.Texto}</p>
    `;
}

function criarCardBlog(blog, index) {
    const maxWords = 20; // Defina aqui o número máximo de palavras

    // Trunca o texto se tiver mais palavras que maxWords e adiciona "..." no final
    let truncatedText = blog.Texto.split(' ').slice(0, maxWords).join(' ');
    if (blog.Texto.split(' ').length > maxWords) {
        truncatedText += '...';
    }

    const card = document.createElement('div');
    card.className = 'card-blog'; // Classe do card Bootstrap
    card.style.width = '35rem';
    card.innerHTML = `
        <img src="images/Blog-1.png" class="card-img-top" alt="Imagem Evento" style="border-radius: 15px">
        <div class="card-body">
            <h5 class="card-title-blog"><strong>${blog.Titulo}</strong></h5>
            <div class="d-flex justify-content-between">
                <p class="card-text mr-3">${truncatedText}</p>
                <div class="text-right">
                    <button type="button" class="btn btn-dark ver-mais" data-toggle="modal" data-target="#exampleModal" data-index="${index}">
                        Ler Mais
                    </button>
                </div>
            </div>
        </div>
    `;
    return card;
}
