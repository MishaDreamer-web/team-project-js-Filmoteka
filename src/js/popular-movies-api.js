export default class PopularMoviesApi {
  constructor() {
    this.requestPage = 1;
    this.url;
    this.API_KEY = 'ded12b962797b74c61a2522ada6bc31b';
    this.BASE_URL = `https://api.themoviedb.org/3`;
  }
  //Популярныe фильмы.
  fetchPopularMovies() {
    const url = `${this.BASE_URL}/trending/movie/day?api_key=${this.API_KEY}&language=en-US&page=${this.requestPage}`;
    this.url = url;
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data.results;
      });
  }
  //Список жанров.

  fetchGenresList() {
    const url = `${this.BASE_URL}/genre/movie/list?api_key=${this.API_KEY}&language=en-US&page=${this.requestPage}`;
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(({ genres }) => {
        return genres;
      });
  }

  //Названий жанров и обрезание даты.
  createPopMovieGenres() {
    return this.fetchPopularMovies().then(data => {
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

//if (genresList.length === 2) {
//    genresList.push(' Other');
//  }
