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
  closeLightbox: document.querySelector('.lightbox__button'),
};

const filmsApiService = new FilmsApiService();

document.addEventListener('keydown', closeLightbox);

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
      // offScroll();
      document.addEventListener('keydown', closeLightbox);
      refs.closeLightbox.addEventListener('click', removeLightboxClass);
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
  refs.lightboxContainer.classList.add('is-open');
}

function removeLightboxClass() {
  console.log('Close lightbox');
  // onScroll();
  refs.lightboxContainer.classList.remove('is-open');
  refs.closeLightbox.removeEventListener('click', removeLightboxClass);
  refs.lightboxOverlay.removeEventListener('click', removeLightboxClass);
}

function closeLightbox(e) {
  if (e.key === 'Escape') {
    removeLightboxClass();
    document.removeEventListener('keydown', closeLightbox);
  }
}

function offScroll() {
  document.body.style.overflowY = 'hidden';
  // filmsRenderCard.style.overflowY = 'auto'
}

function onScroll() {
  document.body.style.overflow = 'auto';
}
