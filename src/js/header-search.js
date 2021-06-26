import FilmsApiService from './apiService';
import filmCardTpl from '../templates/one-movie-card.hbs';
import debounce from 'lodash.debounce';
// import { error } from '@pnotify/core/dist/PNotify.js';

const refs = {
  searchFormInput: document.querySelector('#querySearch'),
  filmsRenderCard: document.querySelector('.gallery'),
  loaderEllips: document.querySelector('.loader-ellips'),
};

const filmApiService = new FilmsApiService();

// const onEntry = entries => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting && filmApiService.query !== '') {
//       filmApiService
//         .fetchfilmsApi()
//         .then(films => {
//           addloaderEllipsClass();
//           renderfilms(films);
//         })
//         .catch(onFetchError);
//       removeloaderEllipsClass();
//     }
//   });
// };

// const option = {
//   rootMargin: '250px',
// };
// const observer = new IntersectionObserver(onEntry, option);

// observer.observe(refs.loaderEllips);

refs.searchFormInput.addEventListener('input', debounce(onSearch, 500));
// refs.filmsRenderCard.addEventListener('click', setfilmLightbox);

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
    .fetchfilmsApi()
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
  refs.filmsRenderCard.insertAdjacentHTML('beforeend', filmCardTpl(films));
}

function onFetchError(err) {
  error({
    title: 'Error. Something went wrong. Try again later or reload the page',
  });
}

function clearfilmsContainer() {
  refs.filmsRenderCard.innerHTML = '';
}

function addloaderEllipsClass() {
  refs.loaderEllips.classList.add('is-hidden');
}

function removeloaderEllipsClass() {
  refs.loaderEllips.classList.remove('is-hidden');
}

// function setfilmLightbox(e) {
//   const filmDataAttribute = e.target.dataset;
//   if (e.target.dataset.src === undefined) {
//     return;
//   }
//   const instance = basicLightbox.create(filmLightboxTpl(filmDataAttribute));
//   instance.show();
// }

// const filmsApiService = new API();
// // const API_KEY = 'ded12b962797b74c61a2522ada6bc31b';
// // const BASE_URL = 'https://api.themoviedb.org/';
