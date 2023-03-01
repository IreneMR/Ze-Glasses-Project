/* GALLERY FILTERS */

const filters = document.querySelector('.js-filters');
const galleryCard = document.querySelectorAll('.js-card');

filters.addEventListener('click', (e) => {
  if (e.target.classList.contains('js-filter__item')) {
    filters.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');

    const filterValue = e.target.getAttribute('data-filter');

    galleryCard.forEach((item) => {
      if (item.classList.contains(filterValue) || filterValue === 'all') {
        item.classList.remove('hide');
        item.classList.add('show');
      } else {
        item.classList.add('hide');
      }
    });
  }
});
