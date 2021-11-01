'use strict';

//Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  console.log(window.scrollY);
  console.log(`navbarHeight: ${navbarHeight}`);
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
      navbar.classList.remove('navbar--dark');
  }
});


// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  console.log(event.target.dataset.link);
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  console.log(event.target.dataset.link);
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView( {behavior: 'smooth'});
});

//Handle click on "contack me" buttonn on home
const homeContackBtn = document.querySelector('.home__contact');
homeContackBtn.addEventListener('click', () => {
  const scrollTo = document.querySelector('#contact');
  scrollTo.scrollIntoView({ behavior: 'smooth' });
});

//make home slowly fade to transperent as the window scrolls down
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

//Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow__up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

//Handle click on "arrow Up"
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});






function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}