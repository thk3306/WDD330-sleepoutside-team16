import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".order-summary");
order.init();
order.calculateItemSubTotal();
order.calculateOrderTotal();
order.displayOrderTotals();

// listening for click on the button
document.querySelector("#checkout").addEventListener("click", (e) => {
  e.preventDefault();

  order.checkout();
});
