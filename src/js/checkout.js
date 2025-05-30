import { loadHeaderFooter, alertMessage } from "./utils.mjs";
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
    alertMessage("Please fill out all required fields correctly.");
    return;
  }

  try {
    
    await checkout.checkout(e.target);

    
    localStorage.removeItem("so-cart");
    window.location.href = "./success.html";

  } catch (err) {
    console.error("❌ Order submission error:", err);

    
    if (err.name === "servicesError" && err.message?.message) {
      alertMessage(err.message.message);
    } else {
      alertMessage("❌ There was a problem submitting your order.");
    }
  }
});
