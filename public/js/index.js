/*** IMPORTS ***/
const showProducts = document.querySelector(".displayProducts");
const miniCart = document.querySelector(".miniCart");
import { getProducts } from "./productOperations.js";
import { getCart, addToCart } from "./cartOperations.js";

/*** load cart ***/
window.onload = function() {
  getProducts();
  getCart();
};

/*** Display data from api ***/
export const displayProducts = products => {
  for (let i = 0; i < products.length; i++) {
    let productWrapper = document.createElement("article");
    let addToCartBtn = document.createElement("button");
    let productName = document.createElement("h3");
    let productPrice = document.createElement("p");
    let productIMG = document.createElement("img");

    productWrapper.className = "productWrapper";
    productName.innerHTML = products[i].name;
    productName.value = products[i].name;
    productPrice.innerHTML = products[i].price + ":- SEK";
    productIMG.src = products[i].imgURL;
    addToCartBtn.className = "addToCartBtn";
    addToCartBtn.innerHTML = "Add to cart.";

    showProducts.append(productWrapper);
    productWrapper.append(productName);
    productWrapper.append(productPrice);
    productWrapper.append(addToCartBtn);
    productWrapper.append(productIMG);

    /*** refresh page when clicking on button ***/
    addToCartBtn.addEventListener("click", () => {
      addToCart(productName.value);
      window.location.reload();
    });
  }
};

/*** show cart without remove button***/
export const displayCart = cartProducts => {
  for (let i = 0; i < cartProducts.length; i++) {
    let productWrapper = document.createElement("article");
    let productName = document.createElement("h5");
    let productPrice = document.createElement("p");
    let productIMG = document.createElement("img");

    productWrapper.className = "miniCartWrapper";
    productName.innerHTML = cartProducts[i].name;
    productPrice.className = "cartPrice";
    productPrice.innerHTML = cartProducts[i].price + ":- SEK";
    productIMG.className = "cartIMG";
    productIMG.src = cartProducts[i].imgURL;

    miniCart.append(productWrapper);
    productWrapper.append(productName);
    productWrapper.append(productPrice);
    productWrapper.append(productIMG);
  }
};
