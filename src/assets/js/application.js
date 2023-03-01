/* MENU */
const menuButton = document.getElementById("js-menu-button");
const menu = document.getElementById("js-menu");
const body = document.body;

/* OPEN-CLOSE MOBILE MENU */
const controlMobileMenu = () => menu.classList.toggle("is-visible");

/* NAVIGATION MOBILE */
const BREAKPOINT_MENU = 700; //Same value of media query change from mobile to desktop menu
const navigation = (e) => {
    if (!e.target.matches("a")) return;
    window.innerWidth <= BREAKPOINT_MENU && controlMobileMenu();
};

/************ EVENTS *************/

/* OPEN-CLOSE MOBILE MENU */
menuButton.addEventListener("click", controlMobileMenu);

/* MOBILE NAVIGATION */
menu.addEventListener("click", navigation);


/* GALLERY FILTERS */

const filters = document.querySelector(".js-filters");
const galleryCard = document.querySelectorAll(".js-card");

filters.addEventListener("click", (e) =>{
    if (e.target.classList.contains("js-filter__item")) {
        filters.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");

        const filterValue = e.target.getAttribute("data-filter");

        galleryCard.forEach((item)=> {
            if (item.classList.contains(filterValue) || filterValue === "all") {
                item.classList.remove("hide");
                item.classList.add("show");
            } else {
                item.classList.add("hide");
            }
        })
    }
})

