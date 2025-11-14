import { renderListWithTemplate, getCartItemCount } from "./utils.mjs";

// getCartItemCount();

function productCardTemplate(product, category) {
  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}&category=${encodeURIComponent(category)}">
      <img src="${product.Images?.PrimaryMedium || product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
    }
    renderList(list) {
      renderListWithTemplate(
        (p) => productCardTemplate(p, this.category),
        this.listElement,
        list
      );
    }
}