import { renderListWithTemplate, setLocalStorage, alertMessage } from './utils.mjs';

function productCardTemplate(product) {
  const template = `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}" class="product-card__link">
        <img src="${product.Images?.PrimaryMedium}" alt="${product.Name}" />
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__brand">${product.Brand?.Name}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      <button class="product-card__add" data-id="${product.Id}">Add to Cart</button>
    </li>`;
  return template;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    this.addListeners();
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  addListeners() {
    const buttons = document.querySelectorAll('.product-card__add');
    buttons.forEach(button => {
      button.addEventListener('click', async (e) => {
        const product = await this.dataSource.findProductById(e.target.dataset.id);
        this.addToCart(product);
      });
    });
  }

  addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('so-cart')) || [];
    cart.push(product);
    setLocalStorage('so-cart', cart);

    
    alertMessage("🛒 Item added to cart!");

    
    const cartIcon = document.querySelector(".cart-icon");
    if (cartIcon) {
      cartIcon.classList.add("animate-cart");
      setTimeout(() => {
        cartIcon.classList.remove("animate-cart");
      }, 800);
    }
  }
}


