import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, getCartItemCount } from "./utils.mjs";

getCartItemCount();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

productList.init();
