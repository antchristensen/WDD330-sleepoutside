import { getLocalStorage } from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img src="${item.Image}" alt="${item.NameWithoutBrand}" />
    </a>
    <div class="cart-card__info">
      <a href="/product_pages/index.html?product=${item.Id}">
        <h2 class="card__name">${item.NameWithoutBrand}</h2>
      </a>
      <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "N/A"}</p>
      <p class="cart-card__quantity">Qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </div>
  </li>`;
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
    renderListWithTemplate(cartItemTemplate, this.listElement, this.cartItems, 'afterbegin', true);
  }
}
