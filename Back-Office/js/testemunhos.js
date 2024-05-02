$(document).ready(function () {
  var table = $('#testemunhos').DataTable({
      "ajax": "js/testemunhos.txt",
      "columns": [
          { "data": "Nome" },
          { "data": "DataPublicacao" },
          {
          "data": null,
          "render": function (data, type, full, meta) {
              return '<i class="mdi mdi-pencil editar-icon" style="font-size: 24px; margin-right: 15px; cursor: pointer;"></i>' +
              '<i class="mdi mdi-delete apagar-icon" style="font-size: 24px;"></i>';
          }
          }
      ]
  });
});