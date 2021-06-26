const API_KEY = '8e21a9da93e3e26e31007a5f0585823a';
const BASE_URL = 'https://api.themoviedb.org';

export default class FilmsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchfilmsApi() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      language: 'en-US',
      page: this.page,
      per_page: '12',
      include_adult: false,
      query: this.searchQuery,
    });

    const url = `${BASE_URL}/3/search/movie?${searchParams}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.page += 1;
        return data.results;
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
}

// Этот файл запроса для отрисовки фильмов по ключевому слову
