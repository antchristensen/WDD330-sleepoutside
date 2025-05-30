import { getLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.services = new ExternalServices();
  }

init() {
  this.list = getLocalStorage(this.key) || [];
  this.calculateItemSummary();    
  this.calculateOrderTotal();     
}


  calculateItemSummary() {
    this.itemTotal = this.list.reduce((acc, item) => acc + item.FinalPrice, 0);
    this.displayOrderTotals(); // Display subtotal right away
  }

  calculateOrderTotal() {
    const itemCount = this.list.length;
    this.tax = this.itemTotal * 0.06;
    this.shipping = 10 + (itemCount > 1 ? (itemCount - 1) * 2 : 0);
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const selector = this.outputSelector;
    document.querySelector(`${selector} #num-items`).innerText = this.list.length;
    document.querySelector(`${selector} #subtotal`).innerText = `$${this.itemTotal.toFixed(2)}`;
    document.querySelector(`${selector} #tax`).innerText = `$${this.tax.toFixed(2)}`;
    document.querySelector(`${selector} #shipping`).innerText = `$${this.shipping.toFixed(2)}`;
    document.querySelector(`${selector} #order-total`).innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  packageItems(items) {
    return items.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1
    }));
  }

  async checkout(form) {
    const formData = new FormData(form);
    const order = {};
    formData.forEach((value, key) => {
      order[key] = value;
    });

    order.orderDate = new Date().toISOString();
    order.items = this.packageItems(this.list);
    order.orderTotal = this.orderTotal.toFixed(2);
    order.shipping = this.shipping;
    order.tax = this.tax.toFixed(2);

    return await this.services.submitOrder(order);
  }
}
