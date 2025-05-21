import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    
    this.product = await this.dataSource.findProductById(this.productId);

    
    this.renderProductDetails();

    
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  renderProductDetails() {
    document.querySelector(".product-detail").innerHTML = `
      <h3>${this.product.Brand?.Name || ''}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img src="${this.product.Images?.PrimaryLarge}" alt="${this.product.Name}" />
      <p class="product-card__price">$${this.product.FinalPrice}</p>
      <p class="product__color">${this.product.Colors?.[0]?.ColorName || ''}</p>
      <p>${this.product.DescriptionHtmlSimple}</p>
      <button id="addToCart">Add to Cart</button>
    `;
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }
}

