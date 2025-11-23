import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".order-summary");
order.init();

// listening for click on the button
document.querySelector("#checkout").addEventListener("click", (e) => {
  e.preventDefault();
  let form = document.forms["checkout-form"];
  let valid = form.checkValidity();
  form.reportValidity();
  if (valid) {
    order.checkout();
  }
});
