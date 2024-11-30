const darkMode = document.querySelector('#dark-mode-toggle');
const body = document.querySelector('body');
const icon = document.querySelector('i');

// On button click, toggle dark mode and change the icon
darkMode.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  updateIcon();
});

// Function to change the icon and its color
function updateIcon() {
  if (body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    icon.style.color = '#00FF7F'; // Set color for .fa-sun
    icon.setAttribute('title', 'Modo claro');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    icon.style.color = '#ffffff'; // Set color for .fa-moon
    icon.setAttribute('title', 'Modo oscuro');
  }
}
