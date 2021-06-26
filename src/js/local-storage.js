import filmCardTpl from '../templates/one-movie-card.hbs';

const watchedBtn = document.querySelector('.libr-watched');
const queueBtn = document.querySelector('.libr-queue');
const modal = document.querySelector('.lightbox');
const main = document.querySelector('.container');

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
  const targetId = el.getAttribute("id");
  localStorage.setItem('targetId', JSON.stringify(targetId));
  
  if (event.target.nodeName === 'BUTTON') {
    if (event.target.className === 'add-to-watched') {
      arrayOfWatched.push(localStorage.getItem('targetId'));
      localStorage.setItem('arrayOfWatched', JSON.stringify(arrayOfWatched));
    } if (event.target.className === 'add-to-queue') {
      arrayOfQueue.push(localStorage.getItem('targetId'));
      localStorage.setItem('arrayOfQueue', JSON.stringify(arrayOfQueue));

    }
  } else {
    return console.log('мимо кассы');
  }
});

watchedBtn.addEventListener('click', onWatchedBtn);

function onWatchedBtn() {
  const allList = document.querySelectorAll('.gallery');
    for (const list of allList) {
      list.remove();
    }
    const watchedList = document.createElement('li');
    watchedList.setAttribute('class', 'item');
    main.appendChild(watchedList);

    let watchedArray = localStorage.getItem('arrayOfWatched');
    watchedArray = JSON.parse(watchedArray);

    for (const object of watchedArray) {
      const innerHTML = JSON.parse(object);
      const li = document.createElement('li');
      li.setAttribute('class', 'list__element');
      li.insertAdjacentHTML('beforeend', innerHTML);
      watchedList.appendChild(li);
    }
  watchedBtn.removeEventListener('click', onWatchedBtn);
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
});

