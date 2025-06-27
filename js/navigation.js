// Navegación que aparece/desaparece según scroll
const header = document.querySelector('header');
const homeSection = document.getElementById('home');

function handleNavVisibility() {
  const homeSectionHeight = homeSection.offsetHeight;
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > homeSectionHeight - 100) {
    header.classList.add('nav-visible');
  } else {
    header.classList.remove('nav-visible');
  }
}

window.addEventListener('scroll', handleNavVisibility);

// Burger Menu Functionality
const burgerMenu = document.getElementById('burger-menu');
const navMenu = document.getElementById('nav-menu');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Cerrar menu al hacer click en un enlace
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    burgerMenu.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Cerrar menu al hacer scroll
window.addEventListener('scroll', () => {
  handleNavVisibility(); // Llamar también a la función de visibilidad
  if (navMenu.classList.contains('active')) {
    burgerMenu.classList.remove('active');
    navMenu.classList.remove('active');
  }
});
