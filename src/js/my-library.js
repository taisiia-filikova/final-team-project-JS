import ApiService from './apiService';
import markupMovies from './renderMarkup';
import { fetchMovie } from './modal-movie-card.js';
import libraryTpl from '../templates/movies.hbs';
import isResults from './page-header.js'

import commonRefs from './get-refs';


async function onWatchedLinkClick() {
  const refs = {
    libraryClick: document.querySelector('.librarry-filter'),
    watchedLink: document.querySelector('.watched-link'),
    queueLink: document.querySelector('.queue-link'),
  };

  refs.queueLink.classList.remove('library-button-is-active');
  refs.watchedLink.classList.add('library-button-is-active');
  const filmsWatchedIds = JSON.parse(localStorage.getItem('watched')).map(
    Number,
  );

  const moviesList = [];
  

  if (filmsWatchedIds !== null) {
    for (const id of filmsWatchedIds) {
      moviesList.push(await fetchMovie(id));
    }

    markupMovies(moviesList);
  }
}

async function onQueueLinkClick() {
  isResults()

  const refs = {
    libraryClick: document.querySelector('.librarry-filter'),
    watchedLink: document.querySelector('.watched-link'),
    queueLink: document.querySelector('.queue-link'),
  };

  refs.watchedLink.classList.remove('library-button-is-active');
  refs.queueLink.classList.add('library-button-is-active');

  const filmsInQueueIds = JSON.parse(localStorage.getItem('queue')).map(Number);

  const moviesInQueueList = [];

  if (filmsInQueueIds !== null) {
    for (const id of filmsInQueueIds) {
      moviesInQueueList.push(await fetchMovie(id));
    }

    markupMovies(moviesInQueueList);
  }
}

export { onWatchedLinkClick, onQueueLinkClick };
