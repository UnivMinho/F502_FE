$(document).ready(function () {
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
            '<i class="mdi mdi-delete apagar-icon" style="font-size: 24px; cursor: pointer;"></i>'
        }
      }
    ]
  });

  function getLocalStorage() {
    return JSON.parse(localStorage.getItem('atividade')) || [];
  }

  function saveToLocalStorage(data) {
    localStorage.setItem('atividade', JSON.stringify(data));
  }


  // Função para abrir o modal de edição com as informações da atividade clicada
  function openEditModal(rowData) {
    // Preencher os campos do formulário de edição com as informações da atividade clicada
    $('#editarInputCodigo').val(rowData.Codigo);
    $('#editarInputNomeAtividade').val(rowData.Nome);
    $('#editarInputOrganizador').val(rowData.Organizador);
    $('#editarInputLocal').val(rowData.Local);
    $('#editarInputTipo').val(rowData.Atividade);
    $('#editarInputMaxParticipantes').val(rowData.maxParticipantes);

    // Formatar a data no formato esperado pelo input type="date"
    var dataFormatada = rowData.Data.split("/").reverse().join("-");
    $('#editarInputData').val(dataFormatada);

    // Abrir o modal de edição
    $('#editarAtividadesModal').modal('show');
  }

  // Capturar o clique no ícone de edição
  $('#atividades').on('click', '.editar-icon', function () {
    // Obter os dados da linha da tabela clicada
    var rowData = table.row($(this).parents('tr')).data();

    openEditModal(rowData);

    $('#editarAtividadesModal').data('rowIndex', table.row($(this).parents('tr')).index());
  });

  // Submissão do formulário de edição
  $('#editarAtividadesModal form').on('submit', function (e) {
    e.preventDefault();

    var codigo = $('#editarInputCodigo').val();
    var nomeAtividade = $('#editarInputNomeAtividade').val();
    var organizador = $('#editarInputOrganizador').val();
    var local = $('#editarInputLocal').val();
    var tipo = $('#editarInputTipo').val();
    var data = $('#editarInputData').val();
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
      "Estado": estado,
      "maxParticipantes": maxParticipantes
    };

    var data = getLocalStorage();
    data[rowIndex] = newData;

    saveToLocalStorage(data);
    // Atualizar a tabela
    table.clear().rows.add(data).draw();

    // Fechar o modal de edição
    $('#editarAtividadesModal').modal('hide');
  });



  $('atividadesModal').on('show.bs.modal', function () {
    $('#exampleInputCodigo').val('');
    $('#exampleInputNomeAtividade').val('');
    $('#exampleInputOrganizador').val('');
    $('#exampleInputLocal').val('');
    $('#exampleInputTipo').val('');
    $('#exampleInputData').val('');
    $('#exampleInputMaxParticipantes').val('');
  });

  // Submissão do formulário de criação
  $('#atividadesModal form').on('submit', function () {

    var codigo = $('#exampleInputCodigo').val();
    var nomeAtividade = $('#exampleInputNomeAtividade').val();
    var organizador = $('#exampleInputOrganizador').val();
    var local = $('#exampleInputLocal').val();
    var tipo = $('#exampleInputTipo').val();
    var data = $('#exampleInputData').val();
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
      "maxParticipantes": maxParticipantes
    };

    var data = getLocalStorage();
    data.push(atividade);
    saveToLocalStorage(data);


    // Atualizar a tabela
    table.clear().rows.add(data).draw();

    $('#atividadesModal').modal('hide');
  });

  function apagarAtividade(index) {
    // Obter os dados do localStorage
    var data = getLocalStorage();

    // Remover a atividade com o índice fornecido
    data.splice(index, 1);

    // Salvar os dados atualizados no localStorage
    saveToLocalStorage(data);

    // Atualizar a tabela
    table.clear().rows.add(data).draw();
  }

  // Capturar o clique no ícone de exclusão
  $('#atividades').on('click', '.apagar-icon', function () {
    // Obter o índice da linha que está sendo apagada
    var rowIndex = table.row($(this).parents('tr')).index();

    // Chamar a função para apagar a atividade
    apagarAtividade(rowIndex);
  });





});







/*
var table = $('#atividades').DataTable({
  "ajax": "js/data.txt",
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
        '<i class="mdi mdi-delete apagar-icon" style="font-size: 24px;"></i>'
      }
    }
  ]
});



// Capturar o clique no ícone de edição
$('#atividades').on('click', '.editar-icon', function () {
  var rowData = table.row($(this).parents('tr')).data(); // Obter os dados da linha da tabela clicada
  console.log("Dados da linha:", rowData); // Depurar os dados para verificar se estão corretos
  var dataFormatada = rowData.Data.split("/").reverse().join("-");

  $('#editarInputCodigo').val(rowData.Codigo);
  $('#editarInputNomeAtividade').val(rowData.Nome);
  $('#editarInputOrganizador').val(rowData.Organizador);
  $('#editarInputLocal').val(rowData.Local);
  $('#editarInputTipo').val(rowData.Atividade);
  $('#editarInputMaxParticipantes').val(rowData.Nparticipantes);
  $('#editarInputData').val(dataFormatada);


  // Abrir a modal
  $('#editarAtividadesModal').modal('show');
});
*/

