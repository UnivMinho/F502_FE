$(document).ready(function() {
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
        ]
    });
});
