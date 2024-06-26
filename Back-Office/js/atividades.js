$(document).ready(function () {
  var uploadedImageBase64 = "";

  // Inicializa a tabela com dados do LocalStorage
  var table = $('#atividades').DataTable({
    "data": getLocalStorage(),
    "columns": [
      { "data": "Codigo" },
      { "data": "Nome" },
      { "data": "Atividade" },
      { "data": "Organizador" },
      { "data": "Local" },
      { "data": "Estado" },
      {
        "data": "Data",
        "render": function (data, type, row) {
          return formatDateToDisplay(data);
        }
      },
      {
        "data": null,
        "render": function (data, type, full, meta) {
          return '<i class="mdi mdi-pencil editar-icon" style="font-size: 24px; margin-right: 15px; cursor: pointer;"></i>' +
                 '<i class="mdi mdi-delete apagar-icon" style="font-size: 24px; cursor: pointer;"></i>';
        }
      }
    ]
  });

  // Receber dados do LocalStorage
  function getLocalStorage() {
    return JSON.parse(localStorage.getItem('atividade')) || [];
  }

  // Guardar em LocalStorage
  function saveToLocalStorage(data) {
    localStorage.setItem('atividade', JSON.stringify(data));
  }

  // Função para formatar data para o input de tipo date (YYYY-MM-DD)
  function formatDateToInput(dateStr) {
    if (dateStr.includes('/')) { // Formato DD/MM/YYYY
      const [dd, mm, yyyy] = dateStr.split('/');
      return `${yyyy}-${mm}-${dd}`;
    } else if (dateStr.includes('-')) { // Formato YYYY-MM-DD
      return dateStr;
    }
    return dateStr;
  }

  // Função para formatar data para exibição (DD/MM/YYYY)
  function formatDateToDisplay(dateStr) {
    if (dateStr.includes('-')) { // Formato YYYY-MM-DD
      const [yyyy, mm, dd] = dateStr.split('-');
      return `${dd}/${mm}/${yyyy}`;
    } else if (dateStr.includes('/')) { // Formato DD/MM/YYYY
      return dateStr;
    }
    return dateStr;
  }

  // Abrir modal de edição com dados preenchidos
  function openEditModal(rowData) {
    $('#editarInputCodigo').val(rowData.Codigo);
    $('#editarInputNomeAtividade').val(rowData.Nome);
    $('#editarInputOrganizador').val(rowData.Organizador);
    $('#editarInputLocal').val(rowData.Local);
    $('#editarInputTipo').val(rowData.Atividade);
    $('#editarInputMaxParticipantes').val(rowData.maxParticipantes);
    $('#editarInputHorario').val(rowData.Horario);
    $('#editarInputPreco').val(rowData.Preco);
    $('#editarInputDescricao').val(rowData.Descricao);
    $('#editarInputData').val(formatDateToInput(rowData.Data)); // Formatar data corretamente

    if (rowData.Imagem) {
      uploadedImageBase64 = rowData.Imagem;
      $('#editPreviewImage').attr('src', uploadedImageBase64).show();
    } else {
      uploadedImageBase64 = "";
      $('#editPreviewImage').hide();
    }

    $('#editarAtividadesModal').modal('show');
  }

  // Evento de click no ícone de editar
  $('#atividades').on('click', '.editar-icon', function () {
    var rowData = table.row($(this).parents('tr')).data();
    openEditModal(rowData);
    $('#editarAtividadesModal').data('rowIndex', table.row($(this).parents('tr')).index());
  });

  // Submeter o formulário de edição de atividade
  $('#editarAtividadesModal form').on('submit', function (e) {
    e.preventDefault();

    var newData = {
      "Codigo": $('#editarInputCodigo').val(),
      "Nome": $('#editarInputNomeAtividade').val(),
      "Organizador": $('#editarInputOrganizador').val(),
      "Local": $('#editarInputLocal').val(),
      "Atividade": $('#editarInputTipo').val(),
      "Data": formatDateToDisplay($('#editarInputData').val()), // Formatar data para exibição
      "Horario": $('#editarInputHorario').val(),
      "Descricao": $('#editarInputDescricao').val(),
      "Preco": $('#editarInputPreco').val(),
      "Estado": "Programada",
      "maxParticipantes": $('#editarInputMaxParticipantes').val(),
      "Imagem": uploadedImageBase64
    };

    var data = getLocalStorage();
    var rowIndex = $('#editarAtividadesModal').data('rowIndex');
    data[rowIndex] = newData;

    saveToLocalStorage(data);
    table.clear().rows.add(data).draw();
    $('#editarAtividadesModal').modal('hide');
  });

  // Limpar o formulário de criação ao abrir o modal
  $('#atividadesModal').on('show.bs.modal', function () {
    $('#atividadesModal form')[0].reset();
    uploadedImageBase64 = "";
    $('#previewImage').hide();
    $('#imageUpload').siblings('.file-upload-info').val(''); // Limpa o nome do arquivo carregado
  });

  // Submeter o formulário de criação de atividade
  $('#atividadesModal form').on('submit', function (e) {
    e.preventDefault();

    var atividade = {
      "Codigo": $('#exampleInputCodigo').val(),
      "Nome": $('#exampleInputNomeAtividade').val(),
      "Organizador": $('#exampleInputOrganizador').val(),
      "Local": $('#exampleInputLocal').val(),
      "Atividade": $('#exampleInputTipo').val(),
      "Data": formatDateToDisplay($('#exampleInputData').val()), // Formatar data para exibição
      "Estado": "Programada",
      "Horario": $('#exampleInputHorario').val(),
      "Descricao": $('#exampleInputDescricao').val(),
      "Preco": $('#exampleInputPreco').val(),
      "maxParticipantes": $('#exampleInputMaxParticipantes').val(),
      "Imagem": uploadedImageBase64
    };

    var data = getLocalStorage();
    data.push(atividade);
    saveToLocalStorage(data);

    table.clear().rows.add(data).draw();
    $('#atividadesModal').modal('hide');
  });

  // Função para apagar uma atividade
  function apagarAtividade(index) {
    var data = getLocalStorage();
    data.splice(index, 1);
    saveToLocalStorage(data);
    table.clear().rows.add(data).draw();
  }

  // Evento de click no ícone para apagar
  $('#atividades').on('click', '.apagar-icon', function () {
    var rowIndex = table.row($(this).parents('tr')).index();
    apagarAtividade(rowIndex);
  });

  // Função para carregar a imagem e convertê-la para base64
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

  // Evento de mudança no input de arquivo
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

  // Evento de click no botão de upload
  $(".file-upload-browse").on('click', function () {
    var file = $(this).parents().find('.file-upload-default');
    file.trigger('click');
  });
});
    // Get user details from localStorage
    var user = JSON.parse(localStorage.getItem('userSignIn'));

    // Update profile image
    $('.nav-link.dropdown-toggle img').attr('src', user.photoURL);
    
    // Update welcome message
    $('#nomeUtilizador').text(user.displayName);
