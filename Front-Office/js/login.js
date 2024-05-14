function handleCredentialResponse(response) {

  }

  window.onload = function () {

    google.accounts.id.initialize({
      client_id: "10382157412-gqc4mt336cl69psamqja4v95knivl0p9.apps.googleusercontent.com", //COLOCAR CLIENT ID DAS CREDENCIAIS
      callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("buttonGoogle"),
      { theme: "outline", size: "large" }  // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
  }