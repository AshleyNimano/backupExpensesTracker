//check if acces is allowed: 
if (localStorage.getItem("authenticated") === "true") {
  // User is authenticated, allow access to the route
  // Perform any additional actions related to the protected route
} else {
  // User is not authenticated, deny access to the route
  alert("Access denied. Please log in."); // Display an error message or take appropriate action
  window.location.href = "index.html"; // Redirect to the login page or another appropriate page
} localStorage.getItem("authenticated");



// Continue with your server-side code...

//Name pop up



//Variables
//Inputs values
const day = document.getElementById("day");
const expenses = document.getElementById("expenses");
const month = document.getElementById("month");
const createB = document.getElementById("create");
const goal = document.getElementById("goal");
const container2 = document.getElementById("container-2")


goal.innerText = goal.value + " $";
day.focus();

//Information Display Elements
const daysTracking = document.getElementById("days-tracking");
const spendings = document.getElementById("spendings");
const container = document.getElementById("container");

//Goal % eventListener
const monthIncome = document.getElementById("monthincome");
const createD = document.getElementById("created");
let counter = document.getElementById("counter");
const fill = document.getElementById("fill");
const savingGoal = document.getElementById("saving-goal");


createD.addEventListener("click", function () {
  if (monthIncome.value === '' || savingGoal.value === '') {
    alert("Enter Saving Goal and your Monthly Income");
  } else {
    monthIncomeValue = parseFloat(monthIncome.value);

    dailyGoal = Math.round(monthIncomeValue / 30);

    goal.value = dailyGoal;


  }
  // Get the input fields value before unloading 


});


//increment's
let i;
let expensesSpan;
let x = 0;
let y = 1;





const per = document.getElementById("total-expenses")

//Main eventListener
createB.addEventListener("click", function () {

  //Variables inside of the Create Function
  const textArea = document.getElementById("extra-information");
  const expensesValue = parseInt(expenses.value);


  // Counting the number of div elements with class .expenses--div
  function countExpenses() {
    var expensesDivs = document.querySelectorAll('.expenses--div');
    var count = expensesDivs.length;
    return count;
  }

  // Storing the count in the local storage
  var i = countExpenses();
  localStorage.setItem('myNumber', i);

  i = 1 + i;
  y = y + 1;


  //Error profing
  if (day.value === '') {
    alert("Add day of Month")
    i = i - 1
  } else if (day.value > 31) {
    alert("Day of Month is false")
    i = i - 1
  } else if (expenses.value === '') {
    alert("Add expenses from this month")
    i = i - 1
  } else if (goal.value === '') {
    alert("It is requiered to add your daily goal. Go in to setting to add ")
  } else if (i === 31) {
    alert("one month of tracking, big up")
    var divs = document.getElementsByClassName("expenses--div");
    while (divs.length > 0) {
      divs[0].parentNode.removeChild(divs[0]);
    }

  } else {

    var timeV;




    var expensesDivs = document.querySelectorAll('.expenses--div');
    var count = expensesDivs.length;

   


    const currency = document.getElementById("currency-select");
    let currenccV = currency.value;

    





    //Element creation

    //Elements
    var delet = document.createElement("button");
    iTag = document.createElement("i");
    iTag.className = "fa-solid fa-xmark";
    var divH = document.createElement("div");
    var info = document.createElement("button");
    var infoIcon = document.createElement("i");
    var extraInfo = document.createElement("span");
    var divHI = document.createElement("div")
    expensesSpan = document.createElement("span")

    //Values of Elements
    divHI.innerHTML = day.value + "<br>" + month.value + "<br>" + "<br>";
    expensesSpan.innerHTML = expenses.value;
    extraInfo.innerHTML = "Expenses: <br> <br>" + textArea.value;

    //attaching Class names to Elements
    divH.className = "expenses--div";
    divH.id = y;
    delet.className = "button-data";
    delet.id = "delet"
    info.className = "info-div-div"
    infoIcon.className = "fa-solid fa-circle-info";
    extraInfo.className = "extra-info"
    divHI.className = "inside-expense"
    expensesSpan.className ="expensesSpan"
    const expensesDivList = document.querySelectorAll(".expenses--div");
    const expensDivArray = expensesDivList.length;
    expensesSpan.id = "expensesSpan" + expensDivArray; 
    

    //Appending Elements to containers
    container.appendChild(delet);
    divH.appendChild(delet);
    container.appendChild(divH);
    divH.appendChild(info);
    info.appendChild(infoIcon);
    delet.appendChild(iTag)
    divH.appendChild(extraInfo)
    divH.appendChild(divHI)
    divH.appendChild(expensesSpan);


    delet.addEventListener("click", function () {

      y = y - 1;




      // Counting the number of div elements with class .expenses--div
      function countExpenses() {
        var expensesDivs = document.querySelectorAll('.expenses--div');
        var count = expensesDivs.length;
        return count;
      }
      // Storing the count in the local storage
      var i = countExpenses();
      localStorage.setItem('myNumber', i);


      //Infomation display function

      

    });


    






    

    //% for loading bar






    //Triggering the active sudo Class
    info.addEventListener("click", function () {
      extraInfo.classList.toggle("active")
      divHI.classList.toggle("active")
      expensesSpan.classList.toggle("active");
    });


    //Color render function
    if (goal.value === '') {
      divH.style.backgroundColor = "rgba(34, 166, 153, 0.5)";
    } else if (parseFloat(expenses.value) < parseFloat(goal.value)) {
      divH.style.backgroundColor = "rgba(34, 166, 153, 0.5)";
    } else if (parseFloat(expenses.value) > parseFloat(goal.value)) {
      divH.style.backgroundColor = "rgba(242, 76, 61, 0.5)";
    } else {
      divH.style.backgroundColor = "rgba(34, 166, 153, 0.5)";
    }


    //clear value of Inputs
    //expenses.value = '';
    //day.value = '';
    //textArea.value = '';

  };//end if-function


  //Apply settings eventListener


  //Delet div button function



  //show information

  //Inforamtion display function
  if (i === 0) {
    daysTracking.innerHTML = "";
  } else if (i === 1) {
    daysTracking.innerHTML = "Tracking for: " + i + " Day";
  } else {
    daysTracking.innerHTML = "Tracking for: " + i + " Days";
  }

  //Amount spend
  if (i === 0) {
    spend.innerHTML = '';
  }


  //Add function to the loading bar
  x = x + 1

 




}); //End event listener create button function




//Reset function
function deleteExpenses() {
  //Confirm from the user
  confirm("Are you sure you want to reset?")
  // Remove div elements with class .expenses
  const expenseDivs = document.querySelectorAll('.expenses--div');
  expenseDivs.forEach((div) => div.remove());

  // Clear local storage
  localStorage.clear();

  //Updating User Information
  i = 0;
  counterValue = 0;
  fill.style.width = "0%"
  daysTracking.innerHTML = "";
  spendings.innerHTML = "";
  x = 0;

  //reset the values of setting inputs
  goal.value = '';
  monthIncome.value = '';
  savingGoal.value = '';

}

const resetButton = document.getElementById('deletd');
resetButton.addEventListener('click', deleteExpenses,);











function deletButtonClickHandler(event) {
  var deletButton = event.target;
  var parentDiv = deletButton.parentNode;
  parentDiv.parentNode.removeChild(parentDiv);


  updateLocalStorage();
}

function updateLocalStorage() {
  var divs = document.getElementsByClassName("expenses--div");
  var deletedDivsData = [];

  for (var i = 0; i < divs.length; i++) {
    var div = divs[i];
    var divData = {
      content: div.innerHTML,
      className: div.className
    };
    deletedDivsData.push(divData);
  }

  var storedData = JSON.stringify(deletedDivsData);
  localStorage.setItem("deletedDivsData", storedData);
}


















// Store the input value in the local storage before the website is closed or refreshed





//Settings

//variables
const startSettings = document.getElementById("settings");
const settings = document.getElementById("settings-div");
const closeS = document.getElementById("close-s");



startSettings.addEventListener("click", function () {
  settings.classList.toggle("active");
});

closeS.addEventListener("click", function () {
  settings.classList.toggle("active");
})

// Store the input value in the local storage before the website is closed or refreshed
window.addEventListener("beforeunload", function () {
});

// Retrieve the stored value from the local storage and set it to the input
window.addEventListener("DOMContentLoaded", function () {
  // Getting the value of the daily goal
  // Getting the value of the saving Goal
  const savingGoalS = localStorage.getItem("savingGoalValue");
  savingGoal.value = savingGoalS;
});



//Firebase function Log Out

//Importing Firebase




const today = new Date();
const monthNames = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];
const currentMonth = monthNames[today.getMonth()];
month.value = currentMonth;



const todayd = new Date();
let dayOfMonth = todayd.getDate();
day.value = dayOfMonth


