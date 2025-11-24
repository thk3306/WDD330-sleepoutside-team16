import { renderListWithTemplate, getLocalStorage, setLocalStorage, getCartItemCount } from "./utils.mjs";

function cartItemTemplate(item) {
    return `<li class="cart-card divider">
  <button class="cart-remove" data-id="${item.Id}" aria-label="Remove item">✕</button>
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
  <p class="cart-card__quantity">Qty: ${item.quantity}</p>
  <p class="cart-card__price">$${(item.FinalPrice * item.quantity)}</p>
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
            const total = this.cartItems.reduce((sum, item) => sum + (item.FinalPrice * item.quantity), 0);
            document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
        }
    }

    renderCart(items) {
      // clear then render
      renderListWithTemplate(cartItemTemplate, this.parentElement, items, 'afterbegin', true);
      // attach remove listeners
      const removeButtons = this.parentElement.querySelectorAll('.cart-remove');
      removeButtons.forEach(btn => {
        btn.removeEventListener('click', this._boundRemove); // safe remove
        this._boundRemove = (e) => {
          const id = e.currentTarget.dataset.id;
          this.removeItem(id);
        };
        btn.addEventListener('click', this._boundRemove);
      });
    }

    removeItem(id) {
      // filter out the item by Id
      this.cartItems = this.cartItems.filter(item => String(item.Id) !== String(id));
      // persist
      setLocalStorage(this.key, this.cartItems);
      // update UI
      this.renderCart(this.cartItems);
      // update totals and footer visibility
      if (this.cartItems.length > 0) {
        document.querySelector('.cart-footer').classList.remove('hide');
        const total = this.cartItems.reduce((sum, item) => sum + (item.FinalPrice * item.quantity), 0);
        document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
      } else {
        document.querySelector('.cart-footer').classList.add('hide');
        document.querySelector('.cart-total').textContent = '';
      }
      // update cart count in header
      getCartItemCount();
    }
}
