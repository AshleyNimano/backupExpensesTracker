const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');

localStorage.setItem('myKey', 'myValue');
const value = localStorage.getItem('myKey');



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});



