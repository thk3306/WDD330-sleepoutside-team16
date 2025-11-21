import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    // this.calculateItemSummary();
  }

  calculateItemSubTotal() {
    if (this.list.length > 0) {
      this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
      document.querySelector('.subtotal').textContent = `Subtotal: $${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = (this.itemTotal * 0.06);
    this.shipping = 10 + ((this.list.length-1) * 2);
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    document.querySelector(`${this.outputSelector} .subtotal`).innerText = `$${this.itemTotal.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} .tax`).innerText = `$${this.tax.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} .shipping`).innerText = `$${this.shipping.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} .order-total`).innerText = `$${this.orderTotal.toFixed(2)}`;
  }
}