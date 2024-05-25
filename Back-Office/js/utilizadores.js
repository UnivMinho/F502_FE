$(document).ready(function () {
    // Inicializar DataTables
    var table = $('#utilizadores').DataTable({
      "data": getLocalStorageData(),
      "columns": [
        { "data": "displayName" },
        { "data": "email" },
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

    // Get user details from localStorage
    var user = JSON.parse(localStorage.getItem('utilizadores'));

    // Update profile image
    $('.nav-link.dropdown-toggle img').attr('src', user.photoURL);
    
    // Update welcome message
    $('#nomeUtilizador').text(user.displayName);