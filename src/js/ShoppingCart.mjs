import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const image =
    item.Images?.PrimarySmall ||
    item.Images?.PrimaryMedium ||
    item.Images?.PrimaryLarge ||
    "";
  const name = item.NameWithoutBrand || item.Name || "Unnamed Product";
  const color = item.Colors?.[0]?.ColorName || "N/A";
  const price = item.FinalPrice ?? "0.00";

  return `
    <li class="cart-card divider" data-id="${item.Id}">
      <button class="cart-remove-btn" data-id="${item.Id}" aria-label="Remove ${name}">❌</button>
      <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
        <img src="${image}" alt="${name}" />
      </a>
      <div class="cart-card__info">
        <a href="/product_pages/index.html?product=${item.Id}">
          <h2 class="card__name">${name}</h2>
        </a>
        <p class="cart-card__color">${color}</p>
        <p class="cart-card__quantity">Qty: 1</p>
        <p class="cart-card__price">$${price}</p>
      </div>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(listElementSelector) {
    this.listElement = document.querySelector(listElementSelector);
    this.cartItems = getLocalStorage("so-cart") || [];
  }

  init() {
    this.renderCartContents();
  }

  renderCartContents() {
    
    const oldSummary = document.querySelector(".cart-summary");
    if (oldSummary) oldSummary.remove();

    
    renderListWithTemplate(cartItemTemplate, this.listElement, this.cartItems, "afterbegin", true);
    this.attachRemoveListeners();

    
    const subtotal = this.cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    const tax = +(subtotal * 0.06).toFixed(2);
    const itemCount = this.cartItems.length;
    const shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;

    const total = +(subtotal + tax + shipping).toFixed(2);

    const summary = document.createElement("div");
    summary.classList.add("cart-summary");
    summary.innerHTML = `
      <hr />
      <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
      <p><strong>Tax (6%):</strong> $${tax}</p>
      <p><strong>Shipping:</strong> $${shipping.toFixed(2)}</p>
      <p><strong>Total:</strong> $${total}</p>
      <a href="/checkout/index.html" class="checkout-button">Proceed to Checkout</a>
    `;

    this.listElement.parentElement.appendChild(summary);
  }

  attachRemoveListeners() {
    const buttons = document.querySelectorAll(".cart-remove-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = e.target.dataset.id;
        this.removeItem(productId);
      });
    });
  }

  removeItem(productId) {
    this.cartItems = this.cartItems.filter((item) => item.Id !== productId);
    setLocalStorage("so-cart", this.cartItems);
    this.renderCartContents();
  }
}
