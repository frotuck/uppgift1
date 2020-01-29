const express = require("express");
const lowdb = require("lowdb");
const app = express();
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("ecommerce.json");
const database = lowdb(adapter);
const port = process.env.PORT || 8000;

app.use(express.static("public"));

const initiateProducts = () => {
  const databaseInitiated1 = database.has("products").value();

  if (!databaseInitiated1) {
    database.defaults({ products: [] }).write();
  }

  const databaseInitiated2 = database.has("cart").value();

  if (!databaseInitiated2) {
    database.defaults({ cart: [] }).write();
  }
};

const insertProduct = async (name, price, picture) => {
  const response = await database
    .get("products")
    .push({ name: name, price: price, picture: picture })
    .write();
  return response;
};

const getProducts = async () => {
  return await database.get("products").value();
};

app.post("/api/product", async (request, response) => {
  console.log(request.url);
  const name = request.query.name;
  const price = request.query.price;
  const picture = request.query.picture;

  let message = {
    success: true,
    message: "Product added"
  };

  const res = await insertProduct(name, price, picture);
  message.data = res[0];
  response.send(message);
});

app.get("/api/product", async (request, response) => {
  const data = await getProducts();
  response.send(data);
});

const insertCart = async (name, price, picture) => {
  const response = await database
    .get("cart")
    .push({ name: name, price: price, picture: picture })
    .write();
  return response;
};

app.post("/api/cart/", async (request, response) => {
  console.log(request.url);
  const name = request.query.name;
  const price = request.query.price;
  const picture = request.query.picture;

  const shoppedItem = await database
    .get("cart")
    .find({ name: name, price: price, picture: picture })
    .value();

  const availableProduct = await database
    .get("products")
    .find({ name: name, price: price, picture: picture })
    .value();

  let message = {
    success: true,
    message: "Your cart is updated"
  };

  if (shoppedItem) {
    const errorMessage1 = {
      error: "ERROR1",
      message: "Item is already in your cart please choose another one"
    };
    response.send(errorMessage1);
  } else if (!availableProduct) {
    const errorMessage2 = {
      error: "ERROR2",
      message: "Item is does not exist on product list... please choose another product"
    };
    response.send(errorMessage2);
  } else {
    const res = await insertCart(name, price, picture);
    message.data = res[0];
    response.send(message);
  }
});

const getCart = async () => {
  return await database.get("cart").value();
};

app.get("/api/cart", async (request, response) => {
  const data = await getCart();
  response.send(data);
});

const deleteCart = async (name, price, picture) => {
  const response = await database
    .get("cart")
    .remove({ name: name, price: price, picture: picture })
    .write();
  return response;
};
app.delete("/api/cart", async (request, response) => {
  console.log(request.url);
  const name = request.query.name;
  const price = request.query.price;
  const picture = request.query.picture;

  const shoppedItem = await database
    .get("cart")
    .find({ name: name, price: price, picture: picture })
    .value();

  let message = {
    success: true,
    message: "Item is now removed"
  };

  if (shoppedItem) {
    const res = await deleteCart(name, price, picture);
    message.data = res[0];
    response.send(message);
  } else {
    const errorMessage = {
      error: "ERROR3",
      message: "Item does not exist in your cart please choose another one"
    };
    response.send(errorMessage);
  }
});

app.listen(port, () => {
  console.log("Server started on port:", port);
  initiateProducts();
});
