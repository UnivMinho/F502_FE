$(document).ready(function () {
  var table = $('#dataBlog').DataTable({
    "ajax": "js/blog.txt",
    "columns": [
      { "data": "Codigo" },
      { "data": "Título" },
      { "data": "Autor" },
      { "data": "Status" },
      { "data": "Data de publicação" },
      {
        "data": null,
        "render": function (data, type, full, meta) {
          return '<i class="mdi mdi-pencil editar-icon" style="font-size: 24px; margin-right: 15px; cursor: pointer;"></i>' +
          '<i class="mdi mdi-delete apagar-icon" style="font-size: 24px;"></i>';
        }
      }
    ]
  });

  // Capturar o clique no ícone de edição
  $('#dataBlog').on('click', '.editar-icon', function () {
    var rowData = table.row($(this).closest('tr')).data(); // Obter os dados da linha da tabela clicada
    console.log("Dados da linha:", rowData); // Depurar os dados para verificar se estão corretos
    var dataFormatada = rowData['Data de publicação'].split("/").reverse().join("-");

    $('#editarInputCodigo').val(rowData['Codigo']);
    $('#editarInputTítulo').val(rowData['Título']);
    $('#editarInputAutor').val(rowData['Autor']);

    // Abrir a modal
    $('#editarblogsModal').modal('show');
  });
});