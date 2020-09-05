/*** IMPORTS ***/
const showCart = document.querySelector(".displayCart");
import { getCart, removeFromCart } from "./cartOperations.js";
const button = true;

/*** load cart ***/
window.onload = function() {
  getCart(button);
};

/*** create html with api data***/
export const displayCartWithBtn = cartProducts => {
  for (let i = 0; i < cartProducts.length; i++) {
    let productWrapper = document.createElement("article");
    let removeFromCartBtn = document.createElement("button");
    let productName = document.createElement("h3");
    let productPrice = document.createElement("p");
    let productIMG = document.createElement("img");

    productWrapper.className = "productWrapper";
    productName.innerHTML = cartProducts[i].name;
    productName.value = cartProducts[i].name;
    productPrice.innerHTML = cartProducts[i].price + ":- SEK";
    productIMG.src = cartProducts[i].imgURL;
    removeFromCartBtn.innerHTML = "Remove from cart";
    removeFromCartBtn.className = "removeProduct";

    showCart.append(productWrapper);
    productWrapper.append(productName);
    productWrapper.append(productPrice);
    productWrapper.append(removeFromCartBtn);
    productWrapper.append(productIMG);

    /*** refresh on click when you click a button ***/
    removeFromCartBtn.addEventListener("click", () => {
      removeFromCart(productName.value);
      window.location.reload();
    });
  }
};
