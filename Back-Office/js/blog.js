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
  
    if (rowData.Imagem) {
      uploadedImageBase64 = rowData.Imagem;
      $('#editPreviewImage').attr('src', uploadedImageBase64).show();
    } else {
      uploadedImageBase64 = "";
      $('#editPreviewImage').hide();
    }
  
    // Formatar a data no formato esperado pelo input type="date"
    var dataFormatada = rowData.Data.split("/").reverse().join("-");
    $('#editarInputData').val(dataFormatada);
  
    $('#editarblogsModal').modal('show');
  }

  // Capturar o clique no ícone de edição
  $('#dataBlog').on('click', '.editar-icon', function () {
    var rowData = table.row($(this).parents('tr')).data();
    openEditModal(rowData);
    $('#editarblogsModal').data('rowIndex', table.row($(this).parents('tr')).index());
  });

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
      "Imagem": uploadedImageBase64
    };

    console.log(newData);
    console.log(rowIndex);

    var data = getLocalStorage();

    data[rowIndex] = newData;
    saveToLocalStorage(data);
    table.clear().rows.add(data).draw();

    $('#editarblogsModal').modal('hide');
  });

  $('blogsModal').on('show.bs.modal', function () {
    $('#exampleInputCodigo').val('');
    $('#exampleInputTitulo').val('');
    $('#exampleInputAutor').val('');
    $('#exampleInputData').val('');
    $('#exampleInputTextarea').val('');
    uploadedImageBase64 = "";
    $('#previewImage').hide();
    $('#imageUpload').siblings('.file-upload-info').val('');
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
      "Imagem": uploadedImageBase64
    };

    var data = getLocalStorage();
    data.push(blog);
    saveToLocalStorage(data);

    table.clear().rows.add(data).draw();

    $('#blogsModal').modal('hide');
  });

  function apagarBlog(index) {
    var data = getLocalStorage();
    data.splice(index, 1);
    saveToLocalStorage(data);
    table.clear().rows.add(data).draw();
  }

  // Capturar o clique no ícone de exclusão
  $('#dataBlog').on('click', '.apagar-icon', function () {
    var rowIndex = table.row($(this).parents('tr')).index();
    apagarBlog(rowIndex);
  });


  function readURL(input, previewElement) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        uploadedImageBase64 = e.target.result;
        $(previewElement).attr('src', e.target.result).show(); // Exibir a imagem
      };

      reader.readAsDataURL(input.files[0]);
    }
  }
  
  $("#imageUpload").change(function () {
    readURL(this, '#previewImage');
    var fileName = $(this).val().split('\\').pop();
    $(this).siblings('.file-upload-info').val(fileName); // Define o nome do arquivo carregado
  });

  $("#editImageUpload").change(function () {
    readURL(this, '#editPreviewImage');
    var fileName = $(this).val().split('\\').pop();
    $(this).siblings('.file-upload-info').val(fileName); // Define o nome do arquivo carregado
  });

  $(".file-upload-browse").on('click', function () {
    var file = $(this).parents().find('.file-upload-default');
    file.trigger('click');
  });

});
