const API_KEY = '7e78d9d0b80a5a9938ce5aba09bf2c47';
const BASE_URL = 'https://api.themoviedb.org/3/';
const SEARCH_PATH = 'search/movie';
const TRENDING_PATH = 'trending/movie/day';
const ID_PATH = 'movie/';
export default class ApiMovieService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.movieId = null;

    this.searchUrl = `${BASE_URL}${SEARCH_PATH}?api_key=${API_KEY}`;
    this.trendingUrl = `${BASE_URL}${TRENDING_PATH}?api_key=${API_KEY}`;
    this.movieIdUrl = `${BASE_URL}${ID_PATH}`;

    this.total_result = 0;
    this.currentPage = this.page;
  }

  fetchMoviesId() {
    return fetch(`${BASE_URL}${ID_PATH}${this.id}?api_key=${API_KEY}`).then(
      this.checkRequestSuccess,
    );
  }

  fetchMovies(url) {
    return fetch(`${url}`)
      .then(this.checkRequestSuccess)
      .then(({ results, total_results, page }) => {
        this.currentPage = page;
        this.incrementPage();

        this.setTotalResult(total_results);
        // console.log(results);
        return results;
      });
  }

  fetchGenres() {
    return fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(list => {
        return list.genres;
      });
  }

  getGenres(url) {
    return this.fetchMovies(url).then(list => {
      return this.fetchGenres().then(arr =>
        list.map(el => ({
          ...el,
          genre_ids: el.genre_ids.flatMap(num =>
            arr.filter(el => el.id === num),
          ),
        })),
      );
    });
  }

  showResult(url) {
    return this.getGenres(url).then(list => {
      return list.map(el => ({
        ...el,
        release_date: el.release_date.split('-')[0],
      }));
    });
  }

  checkRequestSuccess(response) {
    let message = 'Oops! Looks like something went wrong';

    if (response.status === 422) {
      message =
        'Search result failed. Please enter the correct movie title and try again.';
      throw new Error(message);
    } else if (response.ok === false || response.status === 404) {
      throw new Error(message);
    } else {
      return response.json();
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  getPage() {
    return this.currentPage;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get search() {
    return this.searchUrl + `&page=${this.page}&query=${this.searchQuery}`;
  }

  get trending() {
    return this.trendingUrl + `&page=${this.page}`;
  }

  get id() {
    return this.movieId;
  }

  set id(newId) {
    this.movieId = newId;
  }

  get totalResult() {
    return this.total_result;
  }

  setTotalResult(newValue) {
    this.total_result = newValue;
  }
}
