import { getLocalStorage } from "./utils.mjs";
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
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);

    const subtotal = document.querySelector(`${this.outputSelector} #subtotal`);
    const numItems = document.querySelector(`${this.outputSelector} #num-items`);
    if (subtotal) subtotal.innerText = `$${this.itemTotal.toFixed(2)}`;
    if (numItems) numItems.innerText = this.list.length;
  }

  calculateOrderTotal() {
    const itemCount = this.list.length;
    this.tax = +(this.itemTotal * 0.06).toFixed(2);
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
    this.orderTotal = +(this.itemTotal + this.tax + this.shipping).toFixed(2);

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(`${this.outputSelector} #order-total`);
    if (tax) tax.innerText = `$${this.tax.toFixed(2)}`;
    if (shipping) shipping.innerText = `$${this.shipping.toFixed(2)}`;
    if (orderTotal) orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  
  packageItems(items) {
    return items.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1
    }));
  }

  
  formDataToJSON(formElement) {
    const formData = new FormData(formElement),
      convertedJSON = {};

    formData.forEach(function (value, key) {
      convertedJSON[key] = value;
    });

    return convertedJSON;
  }

  
  async checkout(form) {
    const order = this.formDataToJSON(form);

    order.orderDate = new Date().toISOString();
    order.items = this.packageItems(this.list);
    order.orderTotal = this.orderTotal.toFixed(2);
    order.shipping = this.shipping;
    order.tax = this.tax.toFixed(2);

    try {
      const result = await this.services.submitOrder(order);
      return result;
    } catch (err) {
      console.error("Checkout failed:", err);
      throw err;
    }
  }
}
