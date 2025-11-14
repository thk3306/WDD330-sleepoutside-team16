import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import {loadHeaderFooter, getParam} from "./utils.mjs";

loadHeaderFooter();

const category = getParam('category') || 'tents'; // default to tents if no category specified
document.getElementById('category-name').textContent = category.charAt(0).toUpperCase() + category.slice(1);

const dataSource = new ProductData(category);
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

productList.init();