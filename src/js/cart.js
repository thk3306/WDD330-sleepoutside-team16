import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

document.querySelector('.checkout-button').addEventListener('click', () => location.href = '/checkout/index.html');

