import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category") || "tents"; // default to tents if no category specified
const categoryNameEl = document.getElementById("category-name");
if (categoryNameEl) {
  categoryNameEl.textContent = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const dataSource = new ExternalServices(category);
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

productList.init();
