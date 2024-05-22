$(document).ready(function () {
  var table = $('#dataBlog').DataTable({
    "data": getLocalStorage(),
    "columns": [
      { "data": "Codigo" },
      { "data": "Titulo" },
      { "data": "Autor" },
      { "data": "Estado" },
      { "data": "Data" },
      {
        "data": null,
        "render": function (data, type, full, meta) {
          return '<i class="mdi mdi-pencil editar-icon" style="font-size: 24px; margin-right: 15px; cursor: pointer;"></i>' +
            '<i class="mdi mdi-delete apagar-icon" style="font-size: 24px; cursor: pointer;"></i>'
        }
      }
    ]
  });

  function getLocalStorage() {
    return JSON.parse(localStorage.getItem('blog')) || [];
  }

  function saveToLocalStorage(data) {
    localStorage.setItem('blog', JSON.stringify(data));
  }

  $('#dataBlog').on('click', '#btn-cancel', function () {
    $('#editarblogsModal').modal('hide');
  });

  // Função para abrir o modal de edição com as informações do blog clicado
  function openEditModal(rowData) {
    // Preencher os campos do formulário de edição com as informações do blog clicado
    $('#editarInputCodigo').val(rowData.Codigo);
    $('#editarInputTitulo').val(rowData.Titulo);
    $('#editarInputAutor').val(rowData.Autor);
    $('#editarInputTextarea').val(rowData.Texto);
  
    // Formatar a data no formato esperado pelo input type="date"
    var dataFormatada = rowData.Data.split("/").reverse().join("-");
    $('#editarInputData').val(dataFormatada);
  
    // Abrir o modal de edição
    $('#editarblogsModal').modal('show');
  }

  // Capturar o clique no ícone de edição
  $('#dataBlog').on('click', '.editar-icon', function () {
    // Obter os dados da linha da tabela clicada
    var rowData = table.row($(this).parents('tr')).data();

    openEditModal(rowData);

    $('#editarblogsModal').data('rowIndex', table.row($(this).parents('tr')).index());
  });

  // Função para editar um blog
  function editarBlog(rowIndex, newData) {
    var data = getLocalStorage();

    data[rowIndex] = newData;

    saveToLocalStorage(data);

    // Atualizar a tabela
    table.clear().rows.add(data).draw();
  }

  // Submissão do formulário de edição
  $('#editarblogsModal form').on('submit', function (e) {
    e.preventDefault();

    var codigo = $('#editarInputCodigo').val();
    var titulo = $('#editarInputTitulo').val();
    var autor = $('#editarInputAutor').val();
    var data = $('#editarInputData').val();
    var texto = $('#editarInputTextarea').val();
    var estado = "Programada";
    var rowIndex = $('#editarblogsModal').data('rowIndex');

    var newData = {
      "Codigo": codigo,
      "Titulo": titulo,
      "Autor": autor,
      "Data": data,
      "Texto": texto,
      "Estado": estado,
    };

    console.log(newData);
    console.log(rowIndex);

    var data = getLocalStorage();

    data[rowIndex] = newData;

    saveToLocalStorage(data);

    // Atualizar a tabela
    table.clear().rows.add(data).draw();

    // Fechar o modal de edição
    $('#editarblogsModal').modal('hide');
  });



  $('blogsModal').on('show.bs.modal', function () {
    $('#exampleInputCodigo').val('');
    $('#exampleInputTitulo').val('');
    $('#exampleInputAutor').val('');
    $('#exampleInputData').val('');
    $('#exampleInputTextarea').val('');
  });

  // Submissão do formulário de criação
  $('#blogsModal form').on('submit', function () {

    var codigo = $('#exampleInputCodigo').val();
    var titulo = $('#exampleInputTitulo').val();
    var autor = $('#exampleInputAutor').val();
    var data = $('#exampleInputData').val();
    var texto = $('#exampleInputTextarea').val();
    var estado = "Programada";


    var blog = {
      "Codigo": codigo,
      "Titulo": titulo,
      "Autor": autor,
      "Data": data,
      "Texto": texto,
      "Estado": estado,
    };

    var data = getLocalStorage();
    data.push(blog);
    saveToLocalStorage(data);


    // Atualizar a tabela
    table.clear().rows.add(data).draw();

    $('#blogsModal').modal('hide');
  });

  function apagarBlog(index) {
    // Obter os dados do localStorage
    var data = getLocalStorage();

    // Remover o blog com o índice fornecido
    data.splice(index, 1);

    // Salvar os dados atualizados no localStorage
    saveToLocalStorage(data);

    // Atualizar a tabela
    table.clear().rows.add(data).draw();
  }

  // Capturar o clique no ícone de exclusão
  $('#dataBlog').on('click', '.apagar-icon', function () {
    // Obter o índice da linha que está sendo apagada
    var rowIndex = table.row($(this).parents('tr')).index();

    // Chamar a função para apagar o blog
    apagarBlog(rowIndex);
  });


});
