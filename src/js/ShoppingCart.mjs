import { getLocalStorage } from "./utils.mjs";
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

  return `<li class="cart-card divider">
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
  </li>`;
}

export default class ShoppingCart {
  constructor(listElementSelector) {
    this.listElement = document.querySelector(listElementSelector);
    this.cartItems = getLocalStorage("so-cart") || [];
  }

  init() {
    console.log("🛒 Loaded cart items:", this.cartItems);
    this.renderCartContents();
  }

  renderCartContents() {
    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      this.cartItems,
      "afterbegin",
      true
    );
  }
}
