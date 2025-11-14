import { getCartItemCount, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

await loadHeaderFooter();
// getCartItemCount();

const cart = new ShoppingCart(
  "so-cart",
  document.querySelector(".product-list"),
);
cart.init();
