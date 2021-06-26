import FilmsApiService from './apiService';
import filmCardTpl from '../templates/one-movie-card.hbs';
import debounce from 'lodash.debounce';
// import { error } from '@pnotify/core/dist/PNotify.js';

const refsHs = {
  searchFormInput: document.querySelector('.header-search'),
  filmsRenderCard: document.querySelector('.gallery'),
  loaderEllips: document.querySelector('.loader-ellips'),
};

const filmApiService = new FilmsApiService();

refsHs.searchFormInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  console.log(e.target.value);
  clearfilmsContainer(); //Для очистки соджержимого если инпут пустой
  filmApiService.query = e.target.value;
  if (e.target.value === '') {
    return;
  }
  filmApiService.resetPage();
  filmApiService
    .fetchFilmsApi()
    .then(films => {
      console.log(films);
      clearfilmsContainer();
      addloaderEllipsClass();
      renderfilms(films);
    })
    .catch(onFetchError)
    .finally(removeloaderEllipsClass());
}

function renderfilms(films) {
  refsHs.filmsRenderCard.insertAdjacentHTML('beforeend', filmCardTpl(films));
}

function onFetchError(err) {
  error({
    title: 'Error. Something went wrong. Try again later or reload the page',
  });
}

function clearfilmsContainer() {
  refsHs.filmsRenderCard.innerHTML = '';
}

function addloaderEllipsClass() {
  refsHs.loaderEllips.classList.add('is-hidden');
}

function removeloaderEllipsClass() {
  refsHs.loaderEllips.classList.remove('is-hidden');
}

// const filmsApiService = new API();
// // const API_KEY = 'ded12b962797b74c61a2522ada6bc31b';
// // const BASE_URL = 'https://api.themoviedb.org/';
