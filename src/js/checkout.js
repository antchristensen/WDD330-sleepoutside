import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.getElementById("zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

document.getElementById("checkoutForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  if (!e.target.checkValidity()) {
    alert("Please fill out all fields.");
    return;
  }

  try {
    const result = await checkout.checkout(e.target);
    alert("✅ Order placed successfully!");
    localStorage.removeItem("so-cart");
    window.location.href = "/index.html";
  } catch {
    alert("❌ There was a problem submitting your order.");
  }
});
