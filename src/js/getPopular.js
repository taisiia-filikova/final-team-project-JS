import ApiMovieService from './apiService';
import markupMovies from './renderMarkup';
import refs from './get-refs';

import paginator from './paginator';

const apiMovieService = new ApiMovieService();

function showPopular(url) {
  refs.main.classList.add('spinner-is-open');
  refs.spinner.classList.add('is-open');

  return apiMovieService.showResult(url).then(r => {
    

    setTimeout(() => {
      deleteSpinner();
      markupMovies(r);
      refs.paginatorElRef.classList.remove('invisible');
    }, 1000);

    

  });
}

async function paginationSet() {
  await showPopular(apiMovieService.trending);

  await paginator(
    apiMovieService.getPage(),
    apiMovieService.total_result,
    apiMovieService.trending,
  );
}

paginationSet();


export default function deleteSpinner() {
    refs.main.classList.remove('spinner-is-open');
  refs.spinner.classList.remove('is-open');
}