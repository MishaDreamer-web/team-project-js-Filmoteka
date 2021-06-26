import PopularMoviesApi from './popular-movies-api.js';
import filmCardTpl from '../templates/one-movie-card.hbs';

const galleryList = document.querySelector('.gallery');
const popularMoviesApi = new PopularMoviesApi();

const marcup = results => {
  galleryList.insertAdjacentHTML('beforeend', filmCardTpl(results));
};

const fetchPopMovies = () => {
  popularMoviesApi
    .createPopMovieGenres()
    .then(results => {
      console.log(results);
      marcup(results);
    })
    .catch(error => {
      console.log(error);
    });
};
//Отрисовка популярных при первой загрузке
fetchPopMovies();
