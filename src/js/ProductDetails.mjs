import { getLocalStorage, setLocalStorage, getCartItemCount } from "./utils.mjs";

// getCartItemCount();

export default class ProductData {
  constructor(productId, dataSource){
  this.productId = productId;
  this.product = {};
  this.dataSource = dataSource;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  renderProductDetails(product) {
    const productdetails = document.createElement('section');
    const productName = document.createElement('h3');
    const productTitle = document.createElement('h2');
    const productImage = document.createElement('img');
    const productPrice = document.createElement('p');
    const productColor = document.createElement('p');
    const productDescription = document.createElement('p');
    const productDetailsAdd = document.createElement('div');
    const addToCart = document.createElement('button');
    productdetails.setAttribute('class', 'product-detail');
    productName.textContent = product.Brand.Name;
    productTitle.textContent = product.NameWithoutBrand;
    productTitle.setAttribute('class', 'divider');
    productImage.setAttribute('src', product.Image);
    productImage.setAttribute('class', 'divider');
    productImage.setAttribute('alt', product.Name);
    productPrice.setAttribute('class', 'product-card__price');
    productPrice.textContent = `$${product.ListPrice}`;
    productColor.setAttribute('class', 'product__color');
    productColor.textContent = product.Colors.ColorName;
    productDescription.setAttribute('class', 'product__description');
    productDescription.innerHTML = product.DescriptionHtmlSimple;
    productDetailsAdd.setAttribute('class', 'product-detail__add');
    addToCart.setAttribute('id', 'addToCart');
    addToCart.setAttribute('data-id', product.ProductID);
    addToCart.textContent = "Add to Cart";
    // attach the click handler to the button so it uses the class method
    addToCart.addEventListener('click', this.addProductToCart.bind(this));
    productDetailsAdd.appendChild(addToCart);
    productdetails.appendChild(productName);
    productdetails.appendChild(productTitle);
    productdetails.appendChild(productImage);
    productdetails.appendChild(productPrice);
    productdetails.appendChild(productColor);
    productdetails.appendChild(productDescription);
    productdetails.appendChild(productDetailsAdd);
    document.querySelector('main').appendChild(productdetails);
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    // getCartItemCount();
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails(this.product);
  }   
}