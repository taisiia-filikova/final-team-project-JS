import paginator from './paginator';
import refs from './get-refs.js';
import ApiMovieService from './apiService';
import markupMovies from './renderMarkup';

const NEXT_PAGE = 'next';
const PREV_PAGE = 'prev';
const FIRST_PAGE = 'first';
const LAST_PAGE = 'last';

const apiMovieService = new ApiMovieService();

refs.paginatorElRef.addEventListener('click', clikPageNum);

async function clikPageNum(even) {
    const pageEl = even.target;
    const urlPage = pageEl.dataset.url;
   
    if (even.target.nodeName === 'A') {
        even.preventDefault();

        paginationSet(urlPage);
    }

    if (even.target.nodeName === 'LI') {
        const name = pageEl.dataset.name;
        switch (name) {
            case NEXT_PAGE:
                {
                    paginationSet(urlPage);
                    break;
                }

            case PREV_PAGE:
                {
                    paginationSet(urlPage);
                    break;
                }
            case FIRST_PAGE:
                {
                    paginationSet(urlPage);
                    break;
                }
            case LAST_PAGE:
                {
                    paginationSet(urlPage);
                    break;
                }
            default:
                {
                    break;
                }
        }
    }
}

function showPage(url) {
    return apiMovieService.showResult(url).then(r => {
        markupMovies(r);
    });
}

async function paginationSet(url) {
    await showPage(url);

    paginator(apiMovieService.getPage(), apiMovieService.total_result, url);
}
