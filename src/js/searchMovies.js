import refs from './get-refs';
import ApiServise from './apiService';
import markupMovies from './renderMarkup';
import paginator from './paginator';

const apiSearchServise = new ApiServise();

refs.searchFormRef.addEventListener('submit', onSearchMovies);

function onSearchMovies(e) {
  e.preventDefault();
  refs.paginatorElRef.innerHTML = '';
  const value = e.currentTarget.elements.query.value;

  if (value === '') {
    return;
  }

  apiSearchServise.query = value;

  apiSearchServise.resetPage();

  refs.filmContainer.innerHTML = '';

  refs.paginatorElRef.classList.add('invisible');
  refs.main.classList.add('spinner-is-open');
  refs.spinner.classList.add('is-open');

  apiSearchServise.showResult(apiSearchServise.search).then(numbersOfMovies);
 
  paginator(
    apiSearchServise.getPage(),
    apiSearchServise.total_result,
    apiSearchServise.search,
  );
}

function numbersOfMovies(r) {
 
  refs.searchErrorRef.classList.add('is-hidden');

  if (r.length === 0) {
    refs.searchErrorRef.classList.remove('is-hidden');
  } else {
    setTimeout(() => {
    refs.main.classList.remove('spinner-is-open');
    refs.spinner.classList.remove('is-open');


    markupMovies(r);
    refs.paginatorElRef.classList.remove('invisible');
  
    }, 1000);
  }
}


