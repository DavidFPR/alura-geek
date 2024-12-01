export function addProduct(product, container) {
    const productCard = document.createElement('li');
    productCard.classList.add('product-card');
    productCard.dataset.id = product.id;
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-card__image">
      <h3 class="product-card__name">${product.name}</h3>
      <p class="product-card__price">$${product.price}</p>
      <i class="fa-solid fa-trash-can" title="Eliminar"></i>
    `;
    container.appendChild(productCard);
  }
