import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.getElementById("zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  if (!e.target.checkValidity()) {
    e.preventDefault();
    alert("Please fill out all fields.");
  } else {
    e.preventDefault();
    alert("Order placed successfully!");
    localStorage.removeItem("so-cart");
    window.location.href = "/index.html";
  }
});
