import FilmsApiService from './filmApiService';
import filmsCardTpl from '../templates/lightbox.hbs';
// import imageLightboxTpl from '../template/image-lightbox.hbs';
import debounce from 'lodash.debounce';
// import * as basicLightbox from 'basiclightbox';
// import { error } from '@pnotify/core/dist/PNotify.js';

const refs = {
  filmsRenderCard: document.querySelector('.lightbox__content'),
  loaderEllips: document.querySelector('.loader-ellips'),
  lightboxBody: document.querySelector('.js-lightbox'),
  getMovieId: document.querySelector('.gallery'),
  closeLightbox: document.querySelector('.lightbox__button'),
};

const filmsApiService = new FilmsApiService();

// const onEntry = entries => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting && filmsApiService.query !== '') {
//       filmsApiService
//         .fetchImagesApi()
//         .then(films => {
//           addloaderEllipsClass();
//           //  console.log(films);
//           renderFilms(films);
//         })
//         .catch(onFetchError)
//         .finally(removeloaderEllipsClass());
//     }
//   });
// };

// const option = {
//   rootMargin: '250px',
// };

// const observer = new IntersectionObserver(onEntry, option);

// observer.observe(refs.loaderEllips);

// refs.searchFormInput.addEventListener('input', debounce(onSearch, 500));
refs.getMovieId.addEventListener('click', onFilmCardClick);

function onFilmCardClick(e) {
  e.preventDefault();
  console.log(e.target.dataset.id);
  filmsApiService.query = e.target.dataset.id;
  if (e.target.dataset.id === undefined) {
    return;
  }
  addLightboxClass();
  filmsApiService
    .fetchFilmsApi()
    .then(films => {
      clearImagesContainer();
      addloaderEllipsClass();
      console.log(films);
      renderFilms(films);
      refs.closeLightbox.addEventListener('click', removeLightboxClass);
    })
    .catch(onFetchError)
    .finally(removeloaderEllipsClass());
}

function renderFilms(films) {
  refs.filmsRenderCard.insertAdjacentHTML('beforeend', filmsCardTpl(films));
}

function onFetchError(err) {
  //   error({
  //     title: 'Error. Something went wrong. Try again later or reload the page',
  //   });
  console.log(
    'Error. Something went wrong. Try again later or reload the page',
  );
}

function clearImagesContainer() {
  refs.filmsRenderCard.innerHTML = '';
}

function addloaderEllipsClass() {
  refs.loaderEllips.classList.add('is-hidden');
}

function removeloaderEllipsClass() {
  refs.loaderEllips.classList.remove('is-hidden');
}

function addLightboxClass() {
  refs.lightboxBody.classList.add('is-open');
}

function removeLightboxClass() {
  console.log('Close lightbox');
  refs.lightboxBody.classList.remove('is-open');
  refs.closeLightbox.removeEventListener('click', removeLightboxClass);
}

// Изменил код в своем файле здесь нужно все принять