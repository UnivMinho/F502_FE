function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential)
    console.log(data)
  }
  
  window.onload = function () {

    google.accounts.id.initialize({
      client_id: "10382157412-imiosvc5igoobkk6j0l4tbd8upta715u.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("buttonGoogle"),
      { type:"standard",
        shape:"pill",
        theme:"filled_black",
        text:"signin_with",
        size:"large",
        logo_alignment:"left",
        width:"270"
      }  // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
  };