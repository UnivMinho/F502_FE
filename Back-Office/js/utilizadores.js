$(document).ready(function () {
    // Inicializar DataTables
    var table = $('#utilizadores').DataTable({
      "data": getLocalStorageData(),
      "columns": [
        { "data": "Nome" },
        { "data": "Email" },
        {
          "data": null,
          "render": function (data, type, full, meta) {
            return '<i class="mdi mdi-pencil editar-icon" style="font-size: 24px; margin-right: 15px; cursor: pointer;"></i>' +
                   '<i class="mdi mdi-delete apagar-icon" style="font-size: 24px; cursor: pointer;"></i>';
          }
        }
      ]
    });
  
    // Função para obter dados do LocalStorage
    function getLocalStorageData() {
      return JSON.parse(localStorage.getItem('utilizadores')) || [];
    }
  
    // Função para salvar dados no LocalStorage
    function saveToLocalStorage(data) {
      localStorage.setItem('utilizadores', JSON.stringify(data));
    }
  
    // Função para preencher o modal de edição com os dados do usuário
    function fillEditModal(rowData) {
      $('#editarInputNomeUtilizador').val(rowData.Nome);
      $('#editarInputEmail').val(rowData.Email);
      $('#editarInputPassword').val(rowData.Password);
      $('#editarInputConfirmarPassword').val(rowData.Password);
    }
  
    // Capturar o clique no ícone de edição
    $('#utilizadores').on('click', '.editar-icon', function () {
      var rowData = table.row($(this).parents('tr')).data(); // Obter os dados da linha da tabela clicada
      console.log("Dados da linha:", rowData); // Depurar os dados para verificar se estão corretos
  
      fillEditModal(rowData);
  
      // Salvar o índice da linha sendo editada para uso posterior
      $('#editarUtilizadoresModal').data('rowIndex', table.row($(this).parents('tr')).index());
  
      // Abrir a modal
      $('#editarUtilizadoresModal').modal('show');
    });
  
    // Capturar o clique no ícone de criação
    $('#utilizadoresModal').on('show.bs.modal', function () {
      $('#exampleInputNomeUtilizador').val('');
      $('#exampleInputEmail').val('');
      $('#exampleInputPassword').val('');
      $('#exampleInputConfirmarPassword').val('');
    });
  
    // Submissão do formulário de criação
    $('#utilizadoresModal form').on('submit', function (e) {
      e.preventDefault();
  
      var nome = $('#exampleInputNomeUtilizador').val();
      var email = $('#exampleInputEmail').val();
      var password = $('#exampleInputPassword').val();
      var confirmarPassword = $('#exampleInputConfirmarPassword').val();
  
      if (password === confirmarPassword) {
        var newUser = {
          "Nome": nome,
          "Email": email,
          "Password": password
        };
  
        var data = getLocalStorageData();
        data.push(newUser);
        saveToLocalStorage(data);
  
        // Atualizar a tabela
        table.clear().rows.add(data).draw();
  
        // Fechar o modal
        $('#utilizadoresModal').modal('hide');
      } else {
        alert('As senhas não coincidem.');
      }
    });
  
    // Submissão do formulário de edição
    $('#editarUtilizadoresModal form').on('submit', function (e) {
      e.preventDefault();
  
      var nome = $('#editarInputNomeUtilizador').val();
      var email = $('#editarInputEmail').val();
      var password = $('#editarInputPassword').val();
      var confirmarPassword = $('#editarInputConfirmarPassword').val();
      var rowIndex = $('#editarUtilizadoresModal').data('rowIndex');
  
      if (password === confirmarPassword) {
        var data = getLocalStorageData();
        data[rowIndex].Nome = nome;
        data[rowIndex].Email = email;
  
        saveToLocalStorage(data);
  
        // Atualizar a tabela
        table.clear().rows.add(data).draw();
  
        // Fechar o modal
        $('#editarUtilizadoresModal').modal('hide');
      } else {
        alert('As senhas não coincidem.');
      }
    });
  
    // Capturar o clique no ícone de apagar
    $('#utilizadores').on('click', '.apagar-icon', function () {
      var rowData = table.row($(this).parents('tr')).data();
      if (confirm('Tem certeza que deseja excluir o usuário ' + rowData.Nome + '?')) {
        var data = getLocalStorageData();
        var newData = data.filter(function (user) {
          return user.Email !== rowData.Email;
        });
  
        saveToLocalStorage(newData);
  
        // Atualizar a tabela
        table.clear().rows.add(newData).draw();
      }
    });
  });
  