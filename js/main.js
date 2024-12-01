const darkMode = document.querySelector('#dark-mode-toggle');
const body = document.querySelector('body');
const icon = document.querySelector('i');


// Dark mode  

// On button click, toggle dark mode and change the icon
darkMode.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  updateIcon();
});

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

import { fetchProducts, postProduct, deleteProduct, addProductLocally } from './api.js';
import { addProduct } from './dom.js';

const productContainer = document.querySelector('.products__list');
const productForm = document.querySelector('#product-form');

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  products.forEach(product => addProduct(product, productContainer));
});

productForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const newProduct = {
    name: document.querySelector('#product-name').value,
    image: document.querySelector('#product-image').value,
    price: document.querySelector('#product-price').value
  };
  try {
    const product = await postProduct(newProduct);
    addProduct(product, productContainer);
  } catch (error) {
    console.error('Error posting product:', error);
    addProductLocally(newProduct);
    addProduct(newProduct, productContainer);
  }
});

productContainer.addEventListener('click', async (event) => {
  if (event.target.classList.contains('fa-trash-can')) {
    const productCard = event.target.closest('.product-card');
    const productId = productCard.dataset.id;
    await deleteProduct(productId);
    productCard.remove();
  }
});

