$(document).ready(function () {
    // Guardar em LocalStorage
    function saveToLocalStorage(data) {
        localStorage.setItem('propostas', JSON.stringify(data));
    }

    function getLocalStorage() {
        return JSON.parse(localStorage.getItem('propostas')) || [];
    }

    // Função para formatar a data (implementar conforme necessário)
    function formatDateToDisplay(dateString) {
        // Exemplo de formatação: de "2024-05-15" para "15/05/2024"
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-PT');
    }

    $('#propostasForm').on('submit', function (e) {
        e.preventDefault();

        var proposta = {
            "Nome": $('#inputPropostaNome').val(),
            "Organizador": $('#inputPropostaOrganizador').val(),
            "Local": $('#inputPropostaLocal').val(),
            "Atividade": $('#inputPropostaTipo').val(),
            "Data": formatDateToDisplay($('#inputPropostaData').val()), // Formatar data para exibição
            "Estado": "Por Aprovar",
            "Horario": $('#inputPropostaHorario').val(),
            "Descricao": $('#inputPropostaDescricao').val(),
            "maxParticipantes": $('#inputPropostaMaxParticipantes').val(),
            "Telemovel": $('#inputPropostaTelemovel').val(),
            "Email": $('#inputPropostaEmail').val()
        };

        var data = getLocalStorage();
        data.push(proposta);
        saveToLocalStorage(data);

        // Resetar o formulário após o envio
        $('#propostasForm')[0].reset();

        // Mostrar notificação de sucesso
        $('#successAlert').fadeIn();

        // Ocultar a notificação após 3 segundos
        setTimeout(function() {
            $('#successAlert').fadeOut();
        }, 3000);
    });
});
