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
    icon.classList.remove('fa-moon', 'moon-color');
    icon.classList.add('fa-sun', 'sun-color');
    icon.setAttribute('title', 'Modo claro');
  } else {
    icon.classList.remove('fa-sun', 'sun-color');
    icon.classList.add('fa-moon', 'moon-color');
    icon.setAttribute('title', 'Modo oscuro');
  }
}
