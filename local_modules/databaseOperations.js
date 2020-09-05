/*** IMPORTS ***/
const lowdb = require("lowdb");
const fileSync = require("lowdb/adapters/FileSync");
const adapter = new fileSync("database.json");
const database = lowdb(adapter);

/*** FUNCTIONS THAT ARE EXPORTED ***/
exports.getProducts = async () => {
  return await database.get("products");
};

exports.getCart = async () => {
  return await database.get("shoppingCart");
};

exports.addToCart = productName => {
  const findProduct = database
    .get("products")
    .find({ name: productName })
    .write();
  const checkCart = database
    .get("shoppingCart")
    .find({ name: productName })
    .write();
  let response = "";

  /*** IF/ELSE STATEMENT TO CHECK PRODUCTS & CART ***/
  if (typeof findProduct === "undefined") {
    response = {
      success: false,
      status: "400",
      message: "Unable to find product."
    };
  } else if (typeof checkCart !== "undefined") {
    response = {
      success: false,
      status: "400",
      message: "Product already in cart."
    };
  } else if (
    typeof findProduct !== "undefined" &&
    typeof checkCart === "undefined"
  ) {
    const addProduct = database
      .get("shoppingCart")
      .push(findProduct)
      .write();
    response = {
      success: true,
      status: "201",
      message: "Added product to cart.",
      data: addProduct
    };
  }
  return response;
};

exports.removeFromCart = productName => {
  let response = "";
  const findProduct = database
    .get("shoppingCart")
    .find({ name: productName })
    .write();

  /*** IF/ELSE STATEMENT TO CHECK IF PRODUCT EXISTS IN CART ***/
  if (typeof findProduct === "undefined") {
    response = {
      success: false,
      status: "400",
      message: "Unable to find and remove product from cart."
    };
  } else {
    const removeProduct = database
      .get("shoppingCart")
      .remove({ name: productName })
      .write();
    response = {
      success: true,
      status: "200",
      message: "Product removed from cart.",
      data: removeProduct
    };
  }
  return response;
};

/*** INITIATE DATABASE IF THERE IS NONE ***/
exports.initiateDatabase = () => {
  const productsInit = database.has("products").value();
  const shoppingCartInit = database.has("shoppingCart").value();

  if (!productsInit && !shoppingCartInit) {
    database.defaults({ products: [] }).write();
    database.defaults({ shoppingCart: [] }).write();
  }
};
