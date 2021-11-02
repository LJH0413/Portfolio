'use strict';

//Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  console.log(`navbarHeight: ${navbarHeight}`);
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
      navbar.classList.remove('navbar--dark');
  }
});

//Navbar to toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
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

//Projects 
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  //Remove Selection from the previuse item and select new item
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target =
    e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');

  projects.forEach((project) => {
    if (filter === '*' || filter === project.dataset.type) {
      project.classList.remove('invisible');
    } else {
      project.classList.add('invisible');
    }
  });
  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projectContainer.classList.remove('anim-out');
  }, 300);
});


function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}

//1.모든 섹션 요소들을 가지고 온다
//2. intersectionobserver를 이용 모든 섹션들을 관찰
//3. 보여지는 섹션에 해당되는 메뉴 아이템 활성화 

const sectionIds = ['#home', '#about', '#skills', '#work', '#contact'];
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
const secitons = sectionIds.map(id => document.querySelector(id));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      let selectedIndex;
      if (entry.boundingClientRect.y < 0) {
        selectedIndex = index + 1;
      } else {
        selectedIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
secitons.forEach(section => observer.observe(section));
