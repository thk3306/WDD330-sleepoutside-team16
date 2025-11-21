import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

export default class ShoppingCart {
    constructor(key, parentElement) {
        this.key = key;
        this.parentElement = parentElement;
        this.cartItems = [];
    }

    init() {
        this.cartItems = getLocalStorage(this.key) || [];
        this.renderCart(this.cartItems);
        if (this.cartItems.length > 0) {
            document.querySelector('.cart-footer').classList.remove('hide');
            const total = this.cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
            document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
        }
    }

    renderCart(items) {
        renderListWithTemplate(cartItemTemplate, this.parentElement, items);
    }
}
