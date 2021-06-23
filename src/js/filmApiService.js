const API_KEY = '8e21a9da93e3e26e31007a5f0585823a';
const BASE_URL = 'https://api.themoviedb.org';

export default class FilmsApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchFilmsApi() {
   

    const url = `${BASE_URL}/3/movie/${this.searchQuery}?api_key=${API_KEY}&language=en-US`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

//Изменил запрос для модального окна