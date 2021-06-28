import filmCards from '../templates/local-storage-library.hbs';

const API_KEY = '8e21a9da93e3e26e31007a5f0585823a';
const BASE_URL = 'https://api.themoviedb.org';

const watchedBtn = document.querySelector('.libr-watched');
const queueBtn = document.querySelector('.libr-queue');
const modal = document.querySelector('.lightbox');
const filmList = document.querySelectorAll('.gallery');

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

function onWatchedBtn() {
  let watchedArray = localStorage.getItem('arrayOfWatched');
  watchedArray = JSON.parse(watchedArray);
  // console.log(watchedArray);

  for (const film of watchedArray) {
    fetchFilm(film)
      .then(renderFilms)
      .catch(error => console.log(error));
  }
  watchedBtn.removeEventListener('click', onWatchedBtn);
}

function renderFilms(film) {
    const markup = filmCards(film);
    filmList.innerHTML = markup;
    console.log(markup);
}

function fetchFilm(filmId) {
  return fetch(`${BASE_URL}/3/movie/${filmId}?api_key=${API_KEY}&language=en-US`).then(
    response => {
      return response.json();
    },
  );
}
 
// watchedBtn.addEventListener('click', onWatchedBtn);

// function onWatchedBtn() {

  // const allList = document.querySelectorAll('.gallery');
  // for (const list of allList) {
  //   list.remove();
  // }
  // const watchedList = document.createElement('li');
  // watchedList.setAttribute('class', 'item');
  // filmList.appendChild(watchedList);

  // let watchedArray = localStorage.getItem('arrayOfWatched');
  // watchedArray = JSON.parse(watchedArray);

  // for (const object of watchedArray) {
  //   const innerHTML = JSON.parse(object);
  //   const li = document.createElement('li');
  //   li.setAttribute('class', 'list__element');
  //   li.insertAdjacentHTML('beforeend', innerHTML);
  //   watchedList.appendChild(li);
  // }
//   watchedBtn.removeEventListener('click', onWatchedBtn);
// }


queueBtn.addEventListener('click', onQueueBtn);

function onQueueBtn() {
  console.log('on Queue Button click')
//   // const allList = document.querySelectorAll('.gallery');
//   // for (const list of allList) {
//   //   list.remove();
//   // }
//   // const watchedList = document.createElement('li');
//   // watchedList.setAttribute('class', 'item');
//   // filmList.appendChild(watchedList);

//   let queueArray = localStorage.getItem('arrayOfQueue');
//   queueArray = JSON.parse(queueArray);

//   for (const object of queueArray) {
//     const innerHTML = JSON.parse(object);
//     // const li = document.createElement('li');
//     // li.setAttribute('class', 'list__element');
//     // li.insertAdjacentHTML('beforeend', innerHTML);
//     // watchedList.appendChild(li);
//     renderFilms(object)
//   }
  queueBtn.removeEventListener('click', onQueueBtn);
}
