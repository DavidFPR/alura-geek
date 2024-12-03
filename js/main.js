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
const filePickerIcon = document.querySelector('#file-picker-icon');
const filePicker = document.querySelector('#file-picker');
const productImageInput = document.querySelector('#product-image');
const resetButton = document.querySelector('#reset-button'); // Select the reset button

let imageDataUrl = ''; // Variable to store the data URL

// Open file picker dialog on icon click
filePickerIcon.addEventListener('click', () => {
  filePicker.click();
});

// Update input value with filename and hide icon when a file is selected
filePicker.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageDataUrl = e.target.result; // Store the data URL
      productImageInput.value = file.name; // Set the input value to the filename
      filePickerIcon.classList.add('hidden');
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  }
});

// Hide icon when input has text
productImageInput.addEventListener('input', () => {
  if (productImageInput.value) {
    filePickerIcon.classList.add('hidden');
  } else {
    filePickerIcon.classList.remove('hidden');
  }
});

// Show icon when the form is reset
resetButton.addEventListener('click', () => {
  filePickerIcon.classList.remove('hidden');
  imageDataUrl = ''; // Clear the stored data URL
});

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
    image: imageDataUrl || productImageInput.value, // Use the stored data URL or the input value
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
    filePickerIcon.classList.remove('hidden');
    imageDataUrl = ''; // Clear the stored data URL

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
