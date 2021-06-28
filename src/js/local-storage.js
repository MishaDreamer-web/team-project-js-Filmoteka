import filmCards from '../templates/watched-and-queue-lib.hbs';

const API_KEY = '8e21a9da93e3e26e31007a5f0585823a';
const BASE_URL = 'https://api.themoviedb.org';

const watchedBtn = document.querySelector('.libr-watched');
const queueBtn = document.querySelector('.libr-queue');
const modal = document.querySelector('.lightbox');
const filmList = document.querySelector('.gallery');
// const libraryBtn = document.querySelector('.js-library-current');

let arrayOfWatched = [];
let arrayOfQueue = [];

if (localStorage.getItem('arrayOfWatched') !== null) {
  arrayOfWatched = localStorage.getItem('arrayOfWatched');
  arrayOfWatched = JSON.parse(arrayOfWatched);
}

if (localStorage.getItem('arrayOfQueue') !== null) {
  arrayOfQueue = localStorage.getItem('arrayOfQueue');
  arrayOfQueue = JSON.parse(arrayOfQueue);
}

modal.addEventListener('click', function (event) {
  const el = document.querySelector('.film-img');
  const targetId = el.getAttribute('data-id');
  localStorage.setItem('targetId', targetId);

  if (event.target.nodeName === 'BUTTON') {
    if (event.target.className === 'add-to-watched') {
      arrayOfWatched.push(localStorage.getItem('targetId'));
      localStorage.setItem('arrayOfWatched', JSON.stringify(arrayOfWatched));
    }
    if (event.target.className === 'add-to-queue') {
      arrayOfQueue.push(localStorage.getItem('targetId'));
      localStorage.setItem('arrayOfQueue', JSON.stringify(arrayOfQueue));
    }
  } else {
    return;
  }
});

watchedBtn.addEventListener('click', onWatchedBtn);
queueBtn.addEventListener('click', onQueueBtn);
// libraryBtn.addEventListener('click', onLibraryBtn);

function onWatchedBtn() {
  let watchedArray = localStorage.getItem('arrayOfWatched');
  watchedArray = JSON.parse(watchedArray);
  filmList.innerHTML = '';
  console.log('Clear innerHTML');

  for (const film of watchedArray) {
    fetchFilm(film)
      .then(film => {
        renderFilms(film);
        console.log(film);
      })
      .catch(error => console.log(error));
  }
  watchedBtn.addEventListener('click', onQueueBtn);
  watchedBtn.removeEventListener('click', onWatchedBtn);
}

function onQueueBtn() {
  let queueArray = localStorage.getItem('arrayOfQueue');
  queueArray = JSON.parse(queueArray);
  console.log(filmList);
  filmList.innerHTML = '';
  console.log('Clear innerHTML');
  console.log(filmList);

  for (const film of arrayOfQueue) {
    fetchFilm(film)
      .then(film => {
        renderFilms(film);
        console.log(film);
      })
      .catch(error => console.log(error));
  }
  watchedBtn.addEventListener('click', onWatchedBtn);
  watchedBtn.removeEventListener('click', onQueueBtn);
}

function renderFilms(film) {
  const markup = filmCards(film);
  filmList.insertAdjacentHTML('beforeend', markup);
  console.log(filmList);
}

function fetchFilm(filmId) {
  return fetch(
    `${BASE_URL}/3/movie/${filmId}?api_key=${API_KEY}&language=en-US`,
  ).then(response => {
    return response.json();
  });
}

// function onLibraryBtn() {

// }