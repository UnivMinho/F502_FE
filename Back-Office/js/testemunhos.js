$(document).ready(function() {
    var table = $('#testemunhos').DataTable({
        "ajax": "js/testemunhos.txt",
        "columns": [
          { "data": "Nome" },
          { "data": "DataPublicacao" },
        ]
    });
});