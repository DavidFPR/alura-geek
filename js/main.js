const darkMode = document.querySelector('#dark-mode-toggle');
const body = document.querySelector('body');
const icon = document.querySelector('i');

// Function to change the icon and its color
function updateIcon() {
  if (body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon', 'moon-color');
    icon.classList.add('fa-sun', 'sun-color');
    icon.setAttribute('title', 'Modo claro');
  } else {
    icon.classList.remove('fa-sun', 'sun-color');
    icon.classList.add('fa-moon', 'moon-color');
    icon.setAttribute('title', 'Modo oscuro');
  }
}

// Function to toggle dark mode and save the state to localStorage
function toggleDarkMode() {
  body.classList.toggle('dark-mode');
  updateIcon();
  localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}

// On button click, toggle dark mode
darkMode.addEventListener('click', toggleDarkMode);

// Apply dark mode state from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
  }
  updateIcon();
});

import {
  fetchProducts,
  postProduct,
  deleteProduct,
  addProductLocally,
} from './api.js';
import { addProduct } from './dom.js';

const productContainer = document.querySelector('.products__list');
const productForm = document.querySelector('#product-form');

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  products.forEach((product) => addProduct(product, productContainer));

  const noProductsMessage = document.createElement('h2');
  noProductsMessage.classList.add('products__list--empty');
  noProductsMessage.textContent = '¡No se han agregado productos!';
  if (!products.length) {
    productContainer.appendChild(noProductsMessage);
  }
});

productForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const newProduct = {
    name: document.querySelector('#product-name').value,
    image: document.querySelector('#product-image').value,
    price: document.querySelector('#product-price').value,
  };
  const formInputs = document.querySelectorAll('#product-form input');
  try {
    const product = await postProduct(newProduct);
    addProduct(product, productContainer);
  } catch (error) {
    console.error('Error posting product, posting locally:', error);
    addProductLocally(newProduct);
    addProduct(newProduct, productContainer);
  } finally {
    formInputs.forEach((input) => (input.value = ''));

    // Remove empty message if there are products
    const noProductsMessage = document.querySelector('.products__list--empty');
    if (productContainer.childElementCount > 0 && noProductsMessage) {
      noProductsMessage.remove();
    }
  }
});

productContainer.addEventListener('click', async (event) => {
  if (event.target.classList.contains('fa-trash-can')) {
    const productCard = event.target.closest('.product-card');
    const productId = productCard.dataset.id;
    await deleteProduct(productId);
    productCard.remove();
  }

  if (productContainer.childElementCount === 0) {
    const noProductsMessage = document.createElement('h2');
    noProductsMessage.classList.add('products__list--empty');
    noProductsMessage.textContent = '¡No se han agregado productos!';
    productContainer.appendChild(noProductsMessage);
  }
});
