import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.NameWithoutBrand}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();

    // Only show products with detail pages
    const allowedIds = ['880RR', '985RF', '985PR', '344YJ'];
    const filteredList = list.filter(item => allowedIds.includes(item.Id));

    console.log('Product list loaded:', filteredList);

    this.renderList(filteredList);
  }

  renderList(productList) {
    renderListWithTemplate(productCardTemplate, this.listElement, productList, 'afterbegin', true);
  }
}


