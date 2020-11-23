import refs from './get-refs.js';
import ApiMovieService from './apiService';
import markupMovies from './renderMarkup';

import pagTmp from '../templates/pagination-tmp.hbs';
import pagTmp20 from '../templates/paginator-20-tmp.hbs';

import PagTest from './apiPaginator';

const PER_PAGE = 20;

export default function setPaginatorStart(currentPage, totalPages, url = '/&') {
  const paginator = new PagTest({
    currentPage: currentPage,
    prelink: url,
    totalPages: totalPages,
    templateTmp: totalPages > PER_PAGE * 5 ? pagTmp : pagTmp20,
    perPage: PER_PAGE,
  });
  
  refs.paginatorElRef.innerHTML = paginator.render();
}
