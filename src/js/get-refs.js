import { doc } from 'prettier';

const refs = {
  headerRef: document.querySelector('header'),
  logoRef: document.querySelector('#logo'),
  homeRef: document.querySelector('#home'),
  libraryRef: document.querySelector('#library'),
  filmContainer: document.querySelector('.js-film-container'),
  searchFormRef: document.querySelector('#search'),
  searchErrorRef: document.querySelector('#search-error'),
  sectionMoviesRef: document.querySelector('#section-movies'),
  paginatorElRef: document.querySelector('.js-pagination'),
  modal: document.querySelector('.modal'),
  noResults: document.querySelector('.no-results'),
  main: document.querySelector('main'),
  spinner: document.querySelector('.loader'),
};

export default refs;
