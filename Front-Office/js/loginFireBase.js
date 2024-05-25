
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDW_GNXdhgn4mE--JTjH8zIM4gG1rdsdYg",
    authDomain: "gohelpf502.firebaseapp.com",
    projectId: "gohelpf502",
    storageBucket: "gohelpf502.appspot.com",
    messagingSenderId: "357781013252",
    appId: "1:357781013252:web:1746e431a0733dd81e4651",
    measurementId: "G-MNEGNN8L1Z"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'pt';
const analytics = getAnalytics(app);

const googleLogin = document.getElementById("google-login-btn");
const provider = new GoogleAuthProvider(); // Definindo o provedor Google
googleLogin.addEventListener("click", function() {  
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
 // Verificar se já existem usuários armazenados no localStorage
 let users = localStorage.getItem('utilizadores');
 users = users ? JSON.parse(users) : {}; // Se não houver nenhum usuário, inicializa como um objeto vazio
 
  const userObject = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    uid: user.uid,
    accessToken: credential.accessToken // Pode ser opcional, dependendo do seu uso
  };

  localStorage.setItem('userSignIn', JSON.stringify(userObject));
 
 
  // Verificar se o usuário atual já está armazenado
 if (!users[user.uid]) {
   // Se o usuário não existe, adicione-o ao objeto de usuários
   users[user.uid] = {
     displayName: user.displayName,
     email: user.email,
     photoURL: user.photoURL,
     accessToken: credential.accessToken
   };
 }

 // Armazenar o objeto de usuários atualizado no localStorage
 localStorage.setItem('utilizadores', JSON.stringify(users));
 
 window.location.href = "../Back-Office/index.html";
}).catch((error) => {
 const errorCode = error.code;
 const errorMessage = error.message;
});
});


