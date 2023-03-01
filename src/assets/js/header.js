/* MENU */
const menuButton = document.getElementById('js-menu-button');
const menu = document.getElementById('js-menu');

/* OPEN-CLOSE MOBILE MENU */
const controlMobileMenu = () => menu.classList.toggle('is-visible');

/* NAVIGATION MOBILE */
const BREAKPOINT_MENU = 700; //Same value of media query change from mobile to desktop menu
const navigation = (e) => {
  if (!e.target.matches('a')) return;
  window.innerWidth <= BREAKPOINT_MENU && controlMobileMenu();
};

/************ EVENTS *************/

/* OPEN-CLOSE MOBILE MENU */
menuButton.addEventListener('click', controlMobileMenu);

/* MOBILE NAVIGATION */
menu.addEventListener('click', navigation);
