const API_KEY = 'ded12b962797b74c61a2522ada6bc31b';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class FilmsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalPages;
  }

  fetchFilmsApi() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      language: 'en-US',
      page: this.page,
      include_adult: false,
      query: this.searchQuery,
    });

    const url = `${BASE_URL}/search/movie?${searchParams}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results, total_pages }) => {
        this.page += 1;
        this.totalPages = total_pages;
        return results;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  //Список жанров.
  fetchGenresList() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      language: 'en-US',
      page: this.page,
      include_adult: false,
      query: this.searchQuery,
    });

    const url = `${BASE_URL}/genre/movie/list?${searchParams}`;
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(({ genres }) => {
        return genres;
      });
  }

  //Названий жанров и обрезание даты.
  createSearchMovieGenres() {
    return this.fetchFilmsApi().then(data => {
      return this.fetchGenresList().then(genresList => {
        return data.map(movie => ({
          ...movie,
          year: movie.release_date ? movie.release_date.split('-')[0] : 'n/a',
          genres: movie.genre_ids
            ? movie.genre_ids
                .map(id => genresList.filter(el => el.id === id))
                .slice(0, 2)
                .flat()
            : 'Other',
        }));
      });
    });
  }
}

// Этот файл запроса для отрисовки фильмов по ключевому слову
