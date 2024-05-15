$(document).ready(function () {

  // Preencher a tabela com os dados
  var table = $('#atividades').DataTable({
    "data": getLocalStorage(),
    "columns": [
      { "data": "Codigo" },
      { "data": "Nome" },
      { "data": "Atividade" },
      { "data": "Organizador" },
      { "data": "Local" },
      { "data": "Estado" },
      { "data": "Data" },
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

  // Abrir modal de edição
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
    $('#editarInputData').val(rowData.Data);

    $('#editarAtividadesModal').modal('show');
  }

  //Captação de click no icon de editar
  $('#atividades').on('click', '.editar-icon', function () {
    var rowData = table.row($(this).parents('tr')).data();
    openEditModal(rowData);
    $('#editarAtividadesModal').data('rowIndex', table.row($(this).parents('tr')).index());
  });

  // Editar atividade
  $('#editarAtividadesModal form').on('submit', function (e) {
    e.preventDefault();

    var codigo = $('#editarInputCodigo').val();
    var nomeAtividade = $('#editarInputNomeAtividade').val();
    var organizador = $('#editarInputOrganizador').val();
    var local = $('#editarInputLocal').val();
    var tipo = $('#editarInputTipo').val();
    var data = $('#editarInputData').val().split("-").reverse().join("/");
    var horario = $('#editarInputHorario').val();
    var descricao = $('#editarInputDescricao').val();
    var preco = $('#editarInputPreco').val();
    var estado = "Programada";
    var maxParticipantes = $('#editarInputMaxParticipantes').val();
    var rowIndex = $('#editarAtividadesModal').data('rowIndex');

    var newData = {
      "Codigo": codigo,
      "Nome": nomeAtividade,
      "Organizador": organizador,
      "Local": local,
      "Atividade": tipo,
      "Data": data,
      "Horario": horario,
      "Descricao": descricao,
      "Preco": preco,
      "Estado": estado,
      "maxParticipantes": maxParticipantes
    };

    var data = getLocalStorage();
    data[rowIndex] = newData;

    saveToLocalStorage(data);
    table.clear().rows.add(data).draw();
    $('#editarAtividadesModal').modal('hide');
  });

  // Apresentar o formulário vazio
  $('#atividadesModal').on('show.bs.modal', function () {
    $('#exampleInputCodigo').val('');
    $('#exampleInputNomeAtividade').val('');
    $('#exampleInputOrganizador').val('');
    $('#exampleInputLocal').val('');
    $('#exampleInputTipo').val('');
    $('#exampleInputData').val('');
    $('#exampleInputMaxParticipantes').val('');
    $('#exampleInputPreco').val('');
    $('#exampleInputDescricao').val('');
    $('#exampleInputHorario').val('');

  });

  //Criar atividade
  $('#atividadesModal form').on('submit', function (e) {
    e.preventDefault();

    var codigo = $('#exampleInputCodigo').val();
    var nomeAtividade = $('#exampleInputNomeAtividade').val();
    var organizador = $('#exampleInputOrganizador').val();
    var local = $('#exampleInputLocal').val();
    var tipo = $('#exampleInputTipo').val();
    var data = $('#exampleInputData').val();
    var horario = $('#exampleInputHorario').val();
    var descricao = $('#exampleInputDescricao').val();
    var preco = $('#exampleInputPreco').val();
    var estado = "Programada";
    var maxParticipantes = $('#exampleInputMaxParticipantes').val();

    var atividade = {
      "Codigo": codigo,
      "Nome": nomeAtividade,
      "Organizador": organizador,
      "Local": local,
      "Atividade": tipo,
      "Data": data,
      "Estado": estado,
      "Horario": horario,
      "Descricao": descricao,
      "Preco": preco,
      "maxParticipantes": maxParticipantes
    };

    var data = getLocalStorage();
    data.push(atividade);
    saveToLocalStorage(data);

    table.clear().rows.add(data).draw();
    $('#atividadesModal').modal('hide');
  });

  // Apagar atividade
  function apagarAtividade(index) {
    var data = getLocalStorage();
    data.splice(index, 1);
    saveToLocalStorage(data);
    table.clear().rows.add(data).draw();
  }

  // Captar click do icon para apagar
  $('#atividades').on('click', '.apagar-icon', function () {
    var rowIndex = table.row($(this).parents('tr')).index();
    apagarAtividade(rowIndex);
  });
});
