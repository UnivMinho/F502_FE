$(document).ready(function () {

    var table = $('#propostas').DataTable({
        "ajax": "js/propostas.txt",
        "columns": [
            { "data": "Nome" },
            { "data": "Atividade" },
            { "data": "Organizador" },
            { "data": "Local" },
            { "data": "Status"},
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
    $('#propostas').on('click', '.editar-icon', function () {
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
        $('#editarInputHora').val(rowData.Hora);
        $('#editarDescricao').val(rowData.Descricao);


        // Abrir a modal
        $('#reverPropostasModal').modal('show');
    });

});