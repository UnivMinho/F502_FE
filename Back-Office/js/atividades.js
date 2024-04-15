$(document).ready(function() {
    var table1 = $('#atividades').DataTable({
        "ajax": {
            "url": "js/dados.txt",
            "dataSrc": "dados"
        },
        "columns": [
            { "data": "Codigo" },
            { "data": "Nome" },
            { "data": "Atividade" },
            { "data": "Organizador" },
            { "data": "Local" },
            { "data": "Status" },
            { "data": "Data" },
            {
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            }
        ],
        "order": [[1, 'asc']],
        "paging": false,
        "ordering": true,
        "info": false,
        "filter": false,
        
    });
});
