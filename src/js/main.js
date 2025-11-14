import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getCartItemCount, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
// getCartItemCount();

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("all", dataSource, element);

productList.init();
