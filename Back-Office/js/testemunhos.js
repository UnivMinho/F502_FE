$(document).ready(function () {
    // Carregar dados dos testemunhos do localStorage
    var testemunhosData = JSON.parse(localStorage.getItem('testemunhosData')) || [];
    var table = $('#testemunhos').DataTable({
      "data": testemunhosData,
      "columns": [
        { "data": "Nome" },
        { "data": "DataPublicacao" },
        {
          "data": null,
          "render": function (data, type, full, meta) {
            return '<i class="mdi mdi-pencil editar-icon" style="font-size: 24px; cursor: pointer; margin-right: 10px;"></i>' +
            '<i class="mdi mdi-delete apagar-icon" style="font-size: 24px; cursor: pointer;"></i>'
          }
        }
      ]
    });
  
    // Evento para abrir o modal de edição e preencher os campos
    $('#testemunhos tbody').on('click', '.editar-icon', function () {
      var data = table.row($(this).parents('tr')).data();
      $('#editarInputNome').val(data.Nome);
      $('#editarInputTexto').val(data.Texto);
      $('#editarInputProfissao').val(data.Profissao);
      $('#editarTestemunhosModal').modal('show');
    });
  
    // Evento para criar um novo testemunho
    $('#testemunhosModal form').on('submit', function (e) {
      e.preventDefault();
      var newTestemunho = {
        Nome: $('#exampleInputName').val(),
        DataPublicacao: new Date().toLocaleDateString(),
        Texto: $('#exampleTextarea').val(),
        Profissao: $('#exampleInputJob').val()
      };
      testemunhosData.push(newTestemunho);
      localStorage.setItem('testemunhosData', JSON.stringify(testemunhosData));
      table.clear().rows.add(testemunhosData).draw();
      $('#testemunhosModal').modal('hide');
    });
  
    // Evento para editar um testemunho existente
    $('#editarTestemunhosModal form').on('submit', function (e) {
      e.preventDefault();
      var row = table.row('.selected');
      var updatedTestemunho = {
        Nome: $('#editarInputNome').val(),
        DataPublicacao: row.data().DataPublicacao,
        Texto: $('#editarInputTexto').val(),
        Profissao: $('#editarInputProfissao').val()
      };
      var rowIndex = row.index();
      testemunhosData[rowIndex] = updatedTestemunho;
      localStorage.setItem('testemunhosData', JSON.stringify(testemunhosData));
      table.clear().rows.add(testemunhosData).draw();
      $('#editarTestemunhosModal').modal('hide');
    });
  
    // Evento para excluir um testemunho
    $('#testemunhos tbody').on('click', '.apagar-icon', function () {
      var row = table.row($(this).parents('tr'));
      var rowIndex = row.index();
      testemunhosData.splice(rowIndex, 1);
      localStorage.setItem('testemunhosData', JSON.stringify(testemunhosData));
      table.clear().rows.add(testemunhosData).draw();
    });
  
    // Evento para selecionar uma linha para edição
    $('#testemunhos tbody').on('click', 'tr', function () {
      if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
      } else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
      }
    });
  });
  