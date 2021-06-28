import movieCardForLibrary from '../templates/local-storage-library.hbs';
const API_KEY = '8e21a9da93e3e26e31007a5f0585823a';
const BASE_URL = 'https://api.themoviedb.org';

const watchedBtn = document.querySelector('.libr-watched');
const queueBtn = document.querySelector('.libr-queue');
const modal = document.querySelector('.lightbox');
const renderList = document.querySelectorAll('.gallery');

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
  const el = document.querySelector('.movie-card__img');
  const targetId = el.getAttribute('data-id');
  localStorage.setItem('targetId', targetId);
  console.log(targetId);

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
    return console.log('мимо кассы');
  }
});

watchedBtn.addEventListener('click', onWatchedBtn);

function onWatchedBtn() {

  console.log('click on watched button')

  fetchFilms()
    .then(renderWatchedFilmes)
    .catch(error => console.log(error));
  
  watchedBtn.removeEventListener('click', onWatchedBtn);
}

function fetchFilms(filmID) {
// fetch('https://api.themoviedb.org/3/movie/646207?api_key=8e21a9da93e3e26e31007a5f0585823a')
  fetch(`${BASE_URL}/3/movie/${filmID}?api_key=${API_KEY}&language=en-US`)
    .then(response => {
      console.log(response);
      return response.json();
    })
}

function renderWatchedFilmes(film) {
  const markup = movieCardForLibrary(film);
  console.log(markup);
  renderList.innerHTML = markup;  
}
  
queueBtn.addEventListener('click', onQueueBtn);

function onQueueBtn() {
  const allList = document.querySelectorAll('.gallery');
  for (const list of allList) {
    list.remove();
  }
  const watchedList = document.createElement('li');
  watchedList.setAttribute('class', 'item');
  main.appendChild(watchedList);

  let queueArray = localStorage.getItem('arrayOfQueue');
  queueArray = JSON.parse(queueArray);

  for (const object of queueArray) {
    const innerHTML = JSON.parse(object);
    const li = document.createElement('li');
    li.setAttribute('class', 'list__element');
    li.insertAdjacentHTML('beforeend', innerHTML);
    watchedList.appendChild(li);
  }
  queueBtn.removeEventListener('click', onQueueBtn);
}
