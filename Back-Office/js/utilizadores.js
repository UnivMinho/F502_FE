$(document).ready(function () {
    // Inicializar DataTables
    var table = $('#utilizadores').DataTable({
      "data": getLocalStorageData(),
      "columns": [
        { "data": "photoURL",
        "render": function(data, type, row) {
            return '<img src="' + data + '" alt="Imagem do usuário" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">';}
          },
        { "data": "displayName" },
        { "data": "email" },
        {
          "data": null,
          "render": function (data, type, full, meta) {
            return '<i class="mdi mdi-delete apagar-icon" style="font-size: 24px; cursor: pointer;"></i>';
                   
          }
        }
      ]
    });
  
       // Função para obter dados do LocalStorage
       function getLocalStorageData() {
        var users = JSON.parse(localStorage.getItem('utilizadores'));
        var userList = [];
        // Verificar se há usuários armazenados
        if (users) {
          // Iterar sobre os usuários e adicioná-los à lista
          Object.keys(users).forEach(function (key) {
            userList.push(users[key]);
          });
        }
        return userList;
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
      return user.email !== rowData.email;
    });

    saveToLocalStorage(newData);

    // Atualizar a tabela
    table.remove().rows.add(newData).draw();
  }
});
});

    // Get user details from localStorage
    var user = JSON.parse(localStorage.getItem('userSignIn'));

    // Update profile image
    $('.nav-link.dropdown-toggle img').attr('src', user.photoURL);
    
    // Update welcome message
    $('#nomeUtilizador').text(user.displayName);