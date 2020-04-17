//EXPRESS SERVER CODE
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));

//middleware launching - handles data parsing with Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http: //localhost:" + PORT);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/portfolio", (req, res) => {
  res.sendFile(path.join(__dirname, "public/portfolio.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public/contact.html"));
});
