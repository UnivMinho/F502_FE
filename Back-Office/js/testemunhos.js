$(document).ready(function () {
    function limparFormularioCriacao() {
        $('#exampleInputName').val('');
        $('#exampleTextarea').val('');
        $('#exampleInputJob').val('');
        $('#exampleInputImage').val('');
        $('.file-upload-info').val('');
        $('#exampleInputImage').closest('.form-group').find('.file-upload-info').val('');
        $('#testemunhosModal form')[0].reset(); // Limpar o formulário
        $('#exampleInputImage').closest('.form-group').find('.file-upload-info').val(''); // Limpar o nome do arquivo
    }

    // Função para converter imagem em Base64
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

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
                    return '<div class="icon-container">' +
                        '<i class="mdi mdi-pencil editar-icon" style="font-size: 24px; cursor: pointer; margin-right: 10px;"></i>' +
                        '<i class="mdi mdi-delete apagar-icon" style="font-size: 24px; cursor: pointer;"></i>' +
                        '</div>';
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
        if (data.Imagem) {
            $('#editarImagemPreview img').attr('src', data.Imagem);
        } else {
            $('#editarImagemPreview img').attr('src', '');
        }
        $('#editarTestemunhosModal').modal('show');
    });



    // Evento para criar um novo testemunho
    $('#testemunhosModal form').on('submit', async function (e) {
        e.preventDefault();
        var file = document.getElementById('exampleInputImage').files[0];
        var base64Image = file ? await getBase64(file) : '';
        var newTestemunho = {
            Nome: $('#exampleInputName').val(),
            DataPublicacao: new Date().toLocaleDateString(),
            Texto: $('#exampleTextarea').val(),
            Profissao: $('#exampleInputJob').val(),
            Imagem: base64Image
        };
        testemunhosData.push(newTestemunho);
        localStorage.setItem('testemunhosData', JSON.stringify(testemunhosData));
        table.clear().rows.add(testemunhosData).draw();
        $('#testemunhosModal').modal('hide');
    });

    // Evento para editar um testemunho existente
    $('#editarTestemunhosModal form').on('submit', async function (e) {
        e.preventDefault();
        var row = table.row('.selected');
        var file = document.getElementById('editarInputImagem').files[0];
        var base64Image = file ? await getBase64(file) : row.data().Imagem;
        var updatedTestemunho = {
            Nome: $('#editarInputNome').val(),
            DataPublicacao: row.data().DataPublicacao,
            Texto: $('#editarInputTexto').val(),
            Profissao: $('#editarInputProfissao').val(),
            Imagem: base64Image
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

    // Abrir seletor de arquivos ao clicar no botão de upload
    $('.file-upload-browse').on('click', function () {
        var fileInput = $(this).closest('.form-group').find('.file-upload-default');
        fileInput.trigger('click');
    });

    // Atualizar o campo de texto com o nome do arquivo selecionado
    $('.file-upload-default').on('change', function () {
        var fileName = $(this).val().split('\\').pop();
        $(this).closest('.input-group').find('.file-upload-info').val(fileName);
    });

    $('#testemunhosModal').on('show.bs.modal', function () {
        limparFormularioCriacao();
    });

    $(document).ready(function () {
        // Evento para exibir a pré-visualização da imagem e atualizar o campo "Upload Image" ao selecionar um arquivo
        $('#editarInputImagem').on('change', function () {
            var input = this;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#editarImagemPreview img').attr('src', e.target.result);
                    $('#editarImagemPreview').show(); // Exibe a pré-visualização da imagem
                }
                reader.readAsDataURL(input.files[0]);
                // Atualizar o campo "Upload Image" com o nome do arquivo selecionado
                $('.file-upload-info').val(input.files[0].name);
            }
        });
    });




});