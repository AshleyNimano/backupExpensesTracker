import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, child, ref, set, push, update, onValue, remove } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getFirestore, doc, query, setDoc, getDocs, where, getDoc, arrayRemove, updateDoc, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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
  const auth = getAuth(app);

  // Rest of your code...

  // Get the currently signed-in user
  console.log(app);
  const firestore = getFirestore(app);
  console.log(database);



  //Sign In function
  const signUp = document.getElementById("signUp");
  let user;
  signUp.addEventListener("click", function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var userName = document.getElementById("username").value;

    if (!validateEmail(email) || password === "" || userName === "") {
      alert("Please enter a valid email, username, and password.");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          user = userCredential.user;
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


  //log In function

  const login = document.getElementById("login");
  login.addEventListener("click", function () {
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


  h1lo.addEventListener("click", function () {
    activeD.classList.toggle("active")
    signupD.classList.remove("active")
  });


  const signupD = document.getElementById("signupD");
  const h1si = document.getElementById("h1si");

  h1si.addEventListener("click", function () {
    signupD.classList.toggle("active");
    activeD.classList.remove("active")
  });


  const logout = document.getElementById("logout");

  logout.addEventListener("click", function () {
    auth.signOut()
      .then(() => {
        // User signed out
        alert('User logged out!');
        // After successful login or sign-in
        localStorage.setItem("authenticated", "false");

      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });

    window.location.href = "index.html"
  });

  const expensesRef = ref(database, 'expenses');

  function addExpense(amount, description, date) {
    const div = document.createElement('div');
    div.classList.add('expenses--div');
    div.textContent = description + ': ' + amount;
    document.body.appendChild(div);
  }

  // Listen for changes in the expenses data
  onValue(expensesRef, (snapshot) => {
    const expenses = snapshot.val();
    // Remove all existing div elements with the class "expenses--div"
    const existingDivs = document.querySelectorAll('.expenses--div');
    existingDivs.forEach((div) => {
      div.remove();
    });
    // Create the div elements based on the data
    for (const key in expenses) {
      const expenseData = expenses[key];
      addExpense(expenseData.amount, expenseData.description, expenseData.date);
    }
  });

  // Get the currently signed-in user
  console.log(app)
  console.log(database)
  //reset Database
  const resetButton = document.getElementById("deletd");
  resetButton.addEventListener("click", function () {
    // Get a reference to the specific folder in the database
    const folderRef = ref(database, 'expenses');

    // Remove all the data from the folder in the database
    remove(folderRef)
      .then(() => {
        console.log('All data removed from the folder');
      })
      .catch((error) => {
        console.error('Error removing data from the folder:', error);
      });
  })




  // Listen for changes in the user authentication state
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, log user information
      console.log(`User ${user.uid} is signed in`);
      console.log(`User email: ${user.email}`);

      // Get a reference to the "users" node in the database
      const usersRef = ref(database, 'users');

      // Store the user information in the database
      set(child(usersRef, user.uid), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: new Date().toISOString()
      });
    } else {
      // User is signed out, log user information
      console.log('User is signed out');
    }
  });


  const storeD = document.getElementById("create");
  storeD.addEventListener('click', function () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Assuming you have already initialized Firebase and have a reference to the Firestore database
        const firestore = getFirestore(app);

        // Get all the div elements with the class "expenses--div"
        const expensesDivs = document.querySelectorAll(".expenses--div");

        // Create an object to store the inner text with their corresponding IDs
        const innerTexts = {};

        // Extract and store the inner text with their corresponding IDs
        expensesDivs.forEach((div) => {
          const innerText = div.innerText.trim();
          const divId = parseInt(div.id);
          if (!isNaN(divId) && !innerTexts[divId]) {
            innerTexts[divId] = innerText;
          }
        });

        // Here, you can save the inner text to Firestore or any other storage mechanism
        // For example, saving to Firestore:
        const collectionRef = doc(firestore, "div_contents", user.uid); // Replace "div_contents" with the desired collection name

        // Convert the object to an array to maintain the order based on the IDs
        const dataArray = Object.keys(innerTexts).map((key) => innerTexts[key]);

        // Get the existing data from the document or initialize an empty array
        getDoc(collectionRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const existingData = docSnapshot.data().content || [];

              // Filter out duplicates by comparing the existingData with dataArray
              const newDataArray = dataArray.filter((newText) => !existingData.includes(newText));

              // Concatenate the existing data with the new data (without duplicates)
              const updatedData = [...existingData, ...newDataArray];

              // Update the document with the updated data array
              updateDoc(collectionRef, { content: updatedData })
                .then(() => {
                  console.log("Inner text updated successfully!");
                })
                .catch((error) => {
                  console.error("Error updating inner text:", error);
                });
            } else {
              // Document doesn't exist, create it with the content array containing the new inner text
              setDoc(collectionRef, { content: dataArray })
                .then(() => {
                  console.log("Inner text saved successfully!");
                })
                .catch((error) => {
                  console.error("Error saving inner text:", error);
                });
            }
          })
          .catch((error) => {
            console.error("Error checking document existence:", error);
          });
      }
    });

    

  });


  //decrementation of spentTillNow
  const storeI = document.getElementById("create")
  let i;
  storeI.addEventListener("click", function(){
    i = 1 + i;
  });
  const delet2List = document.querySelectorAll(".button-data");
    
  const delet2 = document.getElementById("delet");  
  if(delet2List.length > 1){
    delet2.addEventListener("click", function() {
      const expensesDivList = document.querySelectorAll(".expenses--div");
      const expensDivArray = expensesDivList.length - 1;
      const decrementValue = -parseFloat(document.getElementById("expensesSpan" + expensDivArray).innerText);
    
      auth.onAuthStateChanged((user) => {
        if (user) {
          const collectionRef = doc(firestore, "div_contents", user.uid);
    
          // Fetch the document from Firestore
          getDoc(collectionRef)
            .then((docSnapshot) => {
              if (docSnapshot.exists()) {
                const data = docSnapshot.data(); // Extract the data from the Firestore document
                let spentTillNow = data.spentTillNow || 0; // Default to 0 if spentTillNow field doesn't exist
    
                if (typeof spentTillNow === 'number' && !isNaN(spentTillNow)) {
                  // Decrement the value inside the Firestore document
                  spentTillNow += decrementValue;
                  console.log(spentTillNow);
    
                  const spendings = document.getElementById("spendings");
                  spendings.innerHTML = "Till now you have spent: <br>" + spentTillNow;
    
                  // Update the Firestore document with the new value of spentTillNow
                  updateDoc(collectionRef, { spentTillNow })
                    .then(() => {
                      console.log("Document updated successfully.");
                    })
                    .catch((error) => {
                      console.log("Error updating document:", error);
                    });
                } else {
                  console.log("The value of spentTillNow in Firestore is invalid.");
                }
              } else {
                // If the document doesn't exist, create a new document with spentTillNow set to decrementValue
                setDoc(collectionRef, { spentTillNow: decrementValue })
                  .then(() => {
                    console.log("New document created successfully.");
                  })
                  .catch((error) => {
                    console.log("Error creating new document:", error);
                  });
              }
            })
            .catch((error) => {
              console.log("Error fetching document:", error);
            });
          } else {
            console.error("No user currently logged in!");
        } 
        console.log("The eventListener Works")
      }); 
    });
  } else{
    console.log("Div array less than 1")
  }
  





    storeD.addEventListener("click", function(){
      
      const deletDivHElements = document.querySelectorAll(".expenses--div");

      deletDivHElements.forEach((deletDivH) => {
        deletDivH.addEventListener("click", function() {
          auth.onAuthStateChanged((user) => {
            if (user) {
              const pathDoc = doc(firestore, "div_contents", user.uid);

              // Make sure to use getElementById to get the element, not just its ID string
              const decrementValueElement = document.getElementById("expensesSpan" + (deletDivHElements.length - 1));
              console.log(deletDivHElements.length);

              getDoc(pathDoc)
                .then((docSnapshot) => {
                  if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    const spentTillNow = data.spentTillNow || 0;

                    // Make sure to parse the innerText to a float value
                    const updateData = spentTillNow - parseFloat(decrementValueElement.innerText);

                    const spending = document.getElementById("spendings");
                    const currency = document.getElementById("currency-select");
                    spending.innerHTML = "Till now you have spent: <br> " + updateData + " " + currency.value;

                    // Make sure to update the field properly
                    updateDoc(pathDoc, { spentTillNow: updateData })
                      .then(() => {
                        console.log("Document updated successfully.");
                      })
                      .catch((error) => {
                        console.log("Error updating document:", error);
                      });
                      
                    




                  const documentData = docSnapshot.data();
      
                  if (documentData.hasOwnProperty("content") && Array.isArray(documentData.content)) {
      
                    // Find the index of the element that matches the 'innerTextDivH'
                    const indexToRemove = documentData.content.findIndex((item) => item === divHInnerText);
      
                    if (indexToRemove !== -1) {
                      // Remove the specific element from the array
                      documentData.content.splice(indexToRemove, 1);
      
                      // Update the document in Firestore with the modified array
                      updateDoc(pathDoc, { content: documentData.content })
                        .then(() => {
                          // Element removed successfully from Firestore, now remove from DOM
                        })
                        .catch((error) => {
                          console.log("Error updating document:", error);
                        });
                    } else {
                      console.log("The element does not exist in the array.");
                    }
                  } else {
                    console.log("The 'content' field does not exist or is not an array.");
                  }
                } else {
                  console.log("The document does not exist.");
                }
              })
              .catch((error) => {
                console.log("Error fetching document:", error);
              });
          }
        });  
      });
      })
      
      deletDivHElements.forEach((deletDivH) => {
        deletDivH.addEventListener("click", function(){

          event.stopPropagation(); // Prevent event from propagating to parent elements
          deletDivH.remove();
          
        });
      })
        

      });

  //decrementation of spentTillNow:
 
    

  let x = 0;
  let xs = 0;
  function getColorBasedOnLastNumber(goalValue, dateString) {
    const dateParts = dateString.split(" ");
    const lastNumber = parseInt(dateParts[dateParts.length - 1]);
    const red = "rgba(34, 166, 153, 0.5)";
    const green = "rgba(34, 166, 153, 0.5)";
    return lastNumber > goalValue ? red : green;
  }

  window.addEventListener("mouseover", function () {
    xs = xs + 1;
    if (xs === 1) {
      auth.onAuthStateChanged((user) => {
        const collectionRef = doc(firestore, "div_contents", user.uid);

        getDoc(collectionRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const dataArray = docSnapshot.data().content || [];
              const arrayLength = dataArray.length;
              console.log(`The length of the "content" array is: ${arrayLength}`);

              const container = document.getElementById("container");
              container.innerHTML = ""; // Clear existing elements before adding new ones

              dataArray.forEach((currentString) => {
                const divH = document.createElement("div");
                divH.className = "expenses--div";
                divH.id = "2";
                divH.innerText = currentString;

                const goalValue = 30; // Replace this with your actual goal value
                const divColor = getColorBasedOnLastNumber(goalValue, currentString);
                divH.style.backgroundColor = divColor;

                container.appendChild(divH);

                const delet = document.createElement("button");
                delet.id = "delet";
                delet.className = "button-data-x";
                const innerDelet = document.createElement("i");
                innerDelet.className = "fa-solid fa-xmark";
                delet.appendChild(innerDelet);
                divH.appendChild(delet);





                // Add a click event listener to each 'delet' button
                delet.addEventListener("click", function () {
                  const pathDoc = doc(firestore, "div_contents", user.uid);

                  getDoc(pathDoc)
                    .then((docSnapshot) => {
                      if (docSnapshot.exists()) {
                        const documentData = docSnapshot.data();

                        if (documentData.hasOwnProperty("content") && Array.isArray(documentData.content)) {
                          const divHInnerText = divH.innerText;

                          // Find the index of the element that matches the 'innerText'
                          const indexToRemove = documentData.content.findIndex((item) => item === divHInnerText);

                          if (indexToRemove !== -1) {
                            // Remove the specific element from the array
                            documentData.content.splice(indexToRemove, 1);

                            // Update the document in Firestore with the modified array
                            updateDoc(pathDoc, { content: documentData.content })
                              .then(() => {
                                // Element removed successfully from Firestore, now remove from DOM
                                divH.remove();
                              })
                              .catch((error) => {
                                console.log("Error updating document:", error);
                              });
                          } else {
                            console.log("The element does not exist in the array.");
                          }
                        } else {
                          console.log("The 'content' field does not exist or is not an array.");
                        }
                      } else {
                        console.log("The document does not exist.");
                      }
                    })
                    .catch((error) => {
                      console.log("Error fetching document:", error);
                    });
                });
              });
            } else {
              console.log("Document with the given UID does not exist.");
            }
          })
          .catch((error) => {
            console.error("Error retrieving document:", error);
          });
      });
    }

  });






  if(xs > 1){
    console.log("Hello")
    delet2.addEventListener("click", function () {
      auth.onAuthStateChanged((user) => {
        const buttonElement = this; // Store the reference to the clicked button
        const divH = delet2.parentElement; // Find the closest parent element with class "expenses--div"
        const pathDoc = doc(firestore, "div_contents", user.uid);
        const innerDivText = divH.innerText; // Get the inner text of the .expenses--div parent              
        getDoc(pathDoc)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const documentData = docSnapshot.data();
              if (documentData.hasOwnProperty("content") && Array.isArray(documentData.content)) {
                const indexToRemove = documentData.content.findIndex(item => item === innerDivText);
                if (indexToRemove !== -1) {
                  // Remove the specific element from the array
                  documentData.content.splice(indexToRemove, 1);

                  // Update the document in Firestore with the modified array
                  updateDoc(pathDoc, { content: documentData.content })
                    .then(() => {
                      console.log("Element removed successfully from Firestore!");
                      // Now you can also remove the element from the DOM
                      buttonElement.parentElement.remove();
                    })
                    .catch((error) => {
                      console.log("Error updating document:", error);
                    });
                } else {
                  console.log("The element does not exist in the array.");
                }
              } else {
                console.log("The 'content' field does not exist or is not an array.");
              }
            } else {
              console.log("The document does not exist.");
            }
          })
          .catch((error) => {
            console.log("Error fetching document:", error);
          });
      });
    });
  }


  window.addEventListener("mouseover", function() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const collectionRef = doc(firestore, "div_contents", user.uid);
  
        const goal = document.getElementById("goal");
        const goalValue = goal.value; // Assuming goal is an input element; use the appropriate property to get its value.
  
        if (goalValue) {
          // Update the 'goalValue' field in the document in Firestore
          updateDoc(collectionRef, { goalValue: goalValue })
            .then(() => {
            })
            .catch((error) => {
              console.log("Error updating document:", error);
            });
        } 
      }
    });
  });

  window.addEventListener("click", function(){

    auth.onAuthStateChanged((user) => {
      if (user) {
        const collectionRef = doc(firestore, "div_contents", user.uid);
        const goal = this.document.getElementById("goal");
      // Fetch the document from Firestore
      getDoc(collectionRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            // If the document exists, get its data
            const data = docSnapshot.data();

            // Access the 'goalValue' field and store it in a variable
            const goalValue = data.goalValue;
            goal.value = goalValue;

            // Access the 'content' field and store it in a variable (assuming it's an array)
            const contentArray = data.content;
          } else {
            console.log("Document does not exist in Firestore.");
          }
        })
        .catch((error) => {
          console.log("Error fetching document:", error);
        });
            }
          });

      });


      
      const create = document.getElementById("create")
      create.addEventListener("click", function() {
        const expensesDivList = document.querySelectorAll(".expenses--div");
        const expensDivArray = expensesDivList.length - 1;
        const incrementValue = parseFloat(document.getElementById("expensesSpan" + expensDivArray).innerText);

        auth.onAuthStateChanged((user) => {
          if (user) {
            const collectionRef = doc(firestore, "div_contents", user.uid);
            
            // Fetch the document from Firestore
            getDoc(collectionRef)
              .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                  const data = docSnapshot.data(); // Extract the data from the Firestore document
                  let spentTillNow = data.spentTillNow || 0; // Default to 0 if spentTillNow field doesn't exist
                  
                  if (typeof spentTillNow === 'number' && !isNaN(spentTillNow)) {
                    // Increment the value inside the Firestore document
                    spentTillNow += incrementValue;
                    console.log(spentTillNow)

                    const spendings = document.getElementById("spendings");
                    spendings.innerHTML = "Till now you have spent: <br>" + spentTillNow;
                    // Update the Firestore document with the new value of spentTillNow
                    updateDoc(collectionRef, { spentTillNow })
                      .then(() => {
                        console.log("Document updated successfully.");
                      })
                      .catch((error) => {
                        console.log("Error updating document:", error);
                      });
                  } else {
                    console.log("The value of spentTillNow in Firestore is invalid.");
                  }
                } else {
                  // If the document doesn't exist, create a new document with spentTillNow set to incrementValue
                  setDoc(collectionRef, { spentTillNow: incrementValue })
                    .then(() => {
                      console.log("New document created successfully.");
                    })
                    .catch((error) => {
                      console.log("Error creating new document:", error);
                    });
                }
              })
              .catch((error) => {
                console.log("Error fetching document:", error);
              });
          } else {
            console.error("No user currently logged in!");
          }
        });

        
      });

      


  
      



});