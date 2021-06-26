import FilmsApiService from './filmApiService';
import filmsCardTpl from '../templates/lightbox.hbs';
// import imageLightboxTpl from '../template/image-lightbox.hbs';
// import { error } from '@pnotify/core/dist/PNotify.js';

const refs = {
  filmsRenderCard: document.querySelector('.lightbox__content'),
  loaderEllips: document.querySelector('.loader-ellips'),
  lightboxContainer: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('[data-action="close-lightbox"]'),
  getMovieId: document.querySelector('.gallery'),
  // closeLightbox: document.querySelector('.lightbox__button'),
};

const filmsApiService = new FilmsApiService();

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
      turnOffScroll();
      const closeLightbox = document.querySelector('.lightbox__button');
      document.addEventListener('keydown', closeLightboxEsc);
      closeLightbox.addEventListener('click', removeLightboxClass);
      refs.lightboxOverlay.addEventListener('click', removeLightboxClass);
    })
    .catch(onFetchError)
    .finally(removeloaderEllipsClass());
}

function renderFilms(films) {
  refs.filmsRenderCard.insertAdjacentHTML('beforeend', filmsCardTpl(films));
}

function onFetchError(err) {
  //   error({
  //   title: 'Error. Something went wrong. Try again later or reload the page',
  // });
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
  refs.lightboxContainer.classList.add('is-open');
}

function removeLightboxClass() {
  console.log('Close lightbox');
  turnOnScroll();
  refs.lightboxContainer.classList.remove('is-open');
  // closeLightbox.removeEventListener('click', removeLightboxClass);
  refs.lightboxOverlay.removeEventListener('click', removeLightboxClass);
}

function closeLightboxEsc(e) {
  if (e.key === 'Escape') {
    removeLightboxClass();
    document.removeEventListener('keydown', closeLightboxEsc);
  }
}

function turnOffScroll() {
  document.body.style.overflowY = 'hidden';
}

function turnOnScroll() {
  document.body.style.overflow = 'auto';
}
