import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  const simpleItemList = items.map((item) => {
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1
    };
  });

  return simpleItemList;
}

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
    this.list = getLocalStorage(this.key) || [];
    if (this.list.length > 0) {
      this.calculateItemSubTotal();
      this.calculateOrderTotal();
      this.displayOrderTotals();
    }
  }

  calculateItemSubTotal() {
      this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = (this.itemTotal * 0.06);
    this.shipping = 10 + ((this.list.length - 1) * 2);
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    document.querySelector(`${this.outputSelector} .subtotal`).innerText = `Subtotal: $${this.itemTotal.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} .tax`).innerText = `Tax: $${this.tax.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} .shipping`).innerText = `Shipping: $${this.shipping.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} .order-total`).innerText = `Total: $${this.orderTotal.toFixed(2)}`;
  }

  async checkout() {
    const formElement = document.forms["checkout-form"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);
    //console.log(order);

    try {
      const response = await services.checkout(order);
      // console.log(response);
    } catch (err) {
      console.log(err);
      alert("There was a problem processing your order. Please try again.");
    }
  }
}
