import { getParam, getCartItemCount, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();
// getCartItemCount();

const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();

// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// Wait for DOM to load before adding listener
// document.addEventListener('DOMContentLoaded', function() {
//   const addToCartButton = document.getElementById("addToCart");
//   if (addToCartButton) {
//     addToCartButton.addEventListener("click", addToCartHandler);
//   } else {
//     console.error("Add to cart button not found");
//   }
// });
