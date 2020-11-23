import refs from './get-refs'
import trendTpl from '../templates/movies.hbs';

export default function markupMovies(movies) {
    refs.filmContainer.innerHTML = '';
    refs.filmContainer.insertAdjacentHTML('beforeend', trendTpl(movies));
}