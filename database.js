import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

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

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);





  const expensesRef = ref(database, 'expenses');

  // Add a new expense to the database
  function addExpense(amount, description, date) {
    push(expensesRef, {
      amount: amount,
      description: description,
      date: date
    })
    .then(() => {
      console.log('Expense added successfully');
    })
    .catch((error) => {
      console.error('Error adding expense:', error);
    });
  }

  // Listen for changes in the expenses data
  onValue(expensesRef, (snapshot) => {
    const expenses = snapshot.val();
    console.log(expenses); // Log the expenses data to the console
  });

  // Log out the user
  const logoutButton = document.getElementById('logout');
  logoutButton.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
      console.log('User logged out');
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
  });

  push(expensesRef, {
    amount: 10,
    description: 'Test expense',
    date: '2022-07-14'
  })
  .then(() => {
    console.log('Expense added successfully');
  })
  .catch((error) => {
    console.error('Error adding expense:', error);
  });

});
