/***  IMPORTS ***/
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.port || 8000;
/*** LOCAL MODULE WITH DATABASE OPERTIONS ***/
const databaseOperations = require("./local_modules/databaseOperations");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*** ENDPOINTS ***/
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/myCart", (req, res) => {
  res.sendFile("public/myCart.html", { root: __dirname });
});

app.get("/products", async (req, res) => {
  const data = await databaseOperations.getProducts();
  res.send(data);
});

app.post("/cart/product", (req, res) => {
  const product = req.body;
  const data = databaseOperations.addToCart(product.name);
  res.status(data.status);
  res.send(data);
});

app.delete("/cart/product", (req, res) => {
  const product = req.body;
  const data = databaseOperations.removeFromCart(product.name);
  res.status(data.status);
  res.send(data);
});

app.get("/cart", async (req, res) => {
  const data = await databaseOperations.getCart();
  res.send(data);
});

/*** LISTEN TO FIND OUT PORT & INITIATE DATABASE ***/
app.listen(port, () => {
  console.log("Server started on port ", port);
  databaseOperations.initiateDatabase();
});
