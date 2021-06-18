import FilmsApiService from './filmApiService';
import filmCardTpl from '../template/modal-window.hbs';
// import imageLightboxTpl from '../template/image-lightbox.hbs';
import debounce from 'lodash.debounce';
// import * as basicLightbox from 'basiclightbox';
// import { error } from '@pnotify/core/dist/PNotify.js';

const refs = {
  searchFormInput: document.querySelector('.js-input-image-query'),
  filmsRenderCard: document.querySelector('.js-render-result'),
  loaderEllips: document.querySelector('.loader-ellips'),
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

refs.searchFormInput.addEventListener('input', debounce(onSearch, 500));
// refs.filmsRenderCard.addEventListener('click', setImageLightbox);

function onSearch(e) {
  e.preventDefault();
  clearImagesContainer(); //Для очистки соджержимого если инпут пустой
  filmsApiService.query = e.target.value;
  if (e.target.value === '') {
    return;
  }
  filmsApiService.resetPage();
  filmsApiService
    .fetchImagesApi()
    .then(films => {
      clearImagesContainer();
      addloaderEllipsClass();
      console.log(films);
      renderFilms(films);
    })
    .catch(onFetchError)
    .finally(removeloaderEllipsClass());
}

function renderFilms(films) {
  refs.filmsRenderCard.insertAdjacentHTML('beforeend', filmCardTpl(films));
}

function onFetchError(err) {
  //   error({
  //     title: 'Error. Something went wrong. Try again later or reload the page',
  //   });
  console.log('Error. Something went wrong. Try again later or reload the page');
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

// function setImageLightbox(e) {
//   const imageDataAttribute = e.target.dataset;
//   if (e.target.dataset.src === undefined) {
//     return;
//   }
//   const instance = basicLightbox.create(imageLightboxTpl(imageDataAttribute));
//   instance.show();
// }
