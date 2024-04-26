$(document).ready(function () {
var table = $('#utilizadores').DataTable({
    "ajax": "js/utilizadores.txt",
    "columns": [
        { "data": "Nome" },
        { "data": "Email" },
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
$('#utilizadores').on('click', '.editar-icon', function () {
    var rowData = table.row($(this).parents('tr')).data(); // Obter os dados da linha da tabela clicada
    console.log("Dados da linha:", rowData); // Depurar os dados para verificar se estão corretos

    $('#editarInputNomeUtilizador').val(rowData.Nome);
    $('#editarInputEmail').val(rowData.Email);


    // Abrir a modal
    $('#editarUtilizadoresModal').modal('show');
});

});