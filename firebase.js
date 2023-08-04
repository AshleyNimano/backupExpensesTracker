
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


//Api values


// Your web app's Firebase configuration




fetch('./server.json')
.then((response) => response.json())
.then((json) => {
  const apiKey = json.apiKey;
  const authDomain = json.authDomain;
  const databaseURL = json.databaseURL;
  const projectId = json.projectId;
  const storageBucket = json.storageBucket;
  const messagingSenderId = json.messagingSenderId;
  const appId = json.appId;
  const measurementId = json.measurementId;



  const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseURL,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
  };

  // Initialize Firebase
      


  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth(app);

  const signUp = document.getElementById("signUp");

  signUp.addEventListener("click", function() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var userName = document.getElementById("username").value;

    if (!validateEmail(email) || password === "" || userName === "") {
      alert("Please enter a valid email, username, and password.");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          return set(ref(database, 'users/' + user.uid), {
            username: userName,
            email: email
          });
        })
        .then(() => {
          localStorage.setItem("authenticated", "true");
          alert('User created successfully!');
          // Redirect to index.html
          window.location.href = 'main.html';
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  });


  const login = document.getElementById("login");
  login.addEventListener("click", function() {
  var email = document.getElementById("loginEmail").value;
  var password = document.getElementById("loginPassword").value;

  if (!validateEmail(email) || password === "") {
    alert("Please enter a valid email and password.");
  } else {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Logged in
        const user = userCredential.user;
        const dt = new Date();
        update(ref(database, 'users/' + user.uid), {
          last_login: dt,
        });
        // After successful login or sign-in
        localStorage.setItem("authenticated", "true");

        alert('User logged in!');
        window.location.href = 'main.html';
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }
  });

  function validateEmail(email) {
  // Email validation regex pattern
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
  }




  const activeD = document.getElementById("hlo");
  const h1lo = document.getElementById("h1lo");


  h1lo.addEventListener("click", function(){
    activeD.classList.toggle("active")
    signupD.classList.remove("active")
  });


  const signupD = document.getElementById("signupD");
  const h1si = document.getElementById("h1si");

  h1si.addEventListener("click", function() {
    signupD.classList.toggle("active");
    activeD.classList.remove("active")
  });


});
