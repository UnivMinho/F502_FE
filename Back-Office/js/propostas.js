$(document).ready(function () {

    // Inicializa a tabela com dados do LocalStorage
    var table = $('#propostas').DataTable({
        "data": getLocalStorage(),
        "columns": [
            { "data": "Nome" },
            { "data": "Atividade" },
            { "data": "Organizador" },
            { "data": "Local" },
            { "data": "Estado" },
            { "data": "Data" },
            { "data": "Horario" },
            {
                "data": null,
                "render": function (data, type, full, meta) {
                    return '<i class="mdi mdi-pencil editar-icon" style="font-size: 24px; margin-right: 15px; cursor: pointer;"></i>' +
                        '<i class="mdi mdi-delete apagar-icon" style="font-size: 24px; cursor: pointer;"></i>'
                }
            }
        ]
    });

    // Receber dados do LocalStorage das propostas
    function getLocalStorage() {
        return JSON.parse(localStorage.getItem('propostas')) || [];
    }
    // Receber dados do LocalStorage das atividades
    function getLocalStorageAtividades() {
        return JSON.parse(localStorage.getItem('atividade')) || [];
    }

    // Guardar em LocalStorage das propostas
    function saveToLocalStorage(data) {
        localStorage.setItem('propostas', JSON.stringify(data));
    }

    // Guardar em LocalStorage das atividades
    function saveToLocalStorageAtividades(data) {
        localStorage.setItem('atividade', JSON.stringify(data));
    }

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
        $('#editarInputMaxParticipantes').val(rowData.maxParticipantes);
        $('#editarInputData').val(dataFormatada);
        $('#editarInputHorario').val(rowData.Horario);
        $('#editarInputDescricao').val(rowData.Descricao);
        $('#editarInputTelemovel').val(rowData.Telemovel);
        $('#editarInputPreco').val(rowData.Preco);
        $('#editarInputEmail').val(rowData.Email);

        // Salvar o índice da linha na modal
        $('#reverPropostasModal').data('rowIndex', table.row($(this).parents('tr')).index());

        // Abrir a modal
        $('#reverPropostasModal').modal('show');
    });

    // Capturar o clique no botão Aprovar
    $('#reverPropostasModal form').on('submit', function (e) {
        e.preventDefault();

        var novaAtividade = {
            "Codigo": $('#editarInputCodigo').val(),
            "Nome": $('#editarInputNomeAtividade').val(),
            "Organizador": $('#editarInputOrganizador').val(),
            "Local": $('#editarInputLocal').val(),
            "Atividade": $('#editarInputTipo').val(),
            "Data": $('#editarInputData').val(),
            "Horario": $('#editarInputHorario').val(),
            "Descricao": $('#editarInputDescricao').val(),
            "Preco": $('#editarInputPreco').val(),
            "Estado": "Programada",
            "maxParticipantes": $('#editarInputMaxParticipantes').val()
        };

        var propostaAtualizada = {
            "Codigo": $('#editarInputCodigo').val(),
            "Nome": $('#editarInputNomeAtividade').val(),
            "Organizador": $('#editarInputOrganizador').val(),
            "Local": $('#editarInputLocal').val(),
            "Atividade": $('#editarInputTipo').val(),
            "Data": $('#editarInputData').val(),
            "Horario": $('#editarInputHorario').val(),
            "Descricao": $('#editarInputDescricao').val(),
            "Preco": $('#editarInputPreco').val(),
            "Estado": "Aprovada",
            "Email": $('#editarInputEmail').val(),
            "Telemovel": $('#editarInputTelemovel').val(),
            "maxParticipantes": $('#editarInputMaxParticipantes').val()
        };

        var dataP = getLocalStorage();
        var rowIndex = $('#reverPropostasModal').data('rowIndex');
        var dataA = getLocalStorageAtividades();
        

        if(dataP[rowIndex].Estado == "Por aprovar"){

            dataP[rowIndex] = propostaAtualizada;
            dataA.push(novaAtividade);

            saveToLocalStorage(dataP);
            saveToLocalStorageAtividades(dataA);
            table.clear().rows.add(dataP).draw();
        }else if (dataP[rowIndex].Estado == "Aprovada"){
            alert("Esta atividade já foi aprovada!");
        }else{
            alert("Esta atividade já foi rejeitada!");
        }
        
        $('#reverPropostasModal').modal('hide');
    });

    // Capturar o clique no botão Rejeitar
    $('#btn-cancel').on('click', function (e) {
        e.preventDefault(); // Impedir que o botão "Rejeitar" envie o formulário

        var rowIndex = $('#reverPropostasModal').data('rowIndex');
        var dataP = getLocalStorage();
        
        if(dataP[rowIndex].Estado == "Por Aprovar"){
            dataP[rowIndex].Estado = "Rejeitada";
            saveToLocalStorage(dataP);
            table.clear().rows.add(dataP).draw();
        }else if (dataP[rowIndex].Estado == "Aprovada"){
            alert("Esta atividade já foi aprovada!");
        }else{
            alert("Esta atividade já foi rejeitada!");
        }
        $('#reverPropostasModal').modal('hide');
    });

    // Função para apagar uma atividade
    function apagarAtividade(index) {
        var data = getLocalStorage();
        data.splice(index, 1);
        saveToLocalStorage(data);
        table.clear().rows.add(data).draw();
    }

    // Evento de click no ícone para apagar
    $('#propostas').on('click', '.apagar-icon', function () {
        var rowIndex = table.row($(this).parents('tr')).index();
        apagarAtividade(rowIndex);
    });

});
