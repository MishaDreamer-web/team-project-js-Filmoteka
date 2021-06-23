const main = document.querySelector('.container');
// console.log('main', main);
const list = document.querySelector('.gallery');
// console.log('list', list);
const watchedBtn = document.querySelector('.libr-watched');
// console.log('watchedBtn', watchedBtn);
const queueBtn = document.querySelector('.libr-queue');
// console.log('queueBtn', queueBtn);

// надо зацепиться за модалку. класс правильный?
const modal = document.querySelector('.lightbox');
console.log('modal', modal);

// массивы для Watched и Queue
let arrayOfWatched = [];
// console.log('array Of Watched:', arrayOfWatched);
let arrayOfQueue = [];
// console.log('array Of Queue:', arrayOfQueue);

// есть/нет проверка
if (localStorage.getItem('arrayOfWatched') !== null) {
  arrayOfWatched = localStorage.getItem('arrayOfWatched');
  arrayOfWatched = JSON.parse(arrayOfWatched);
}
if (localStorage.getItem('arrayOfQueue') !== null) {
  arrayOfQueue = localStorage.getItem('arrayOfQueue');
  arrayOfQueue = JSON.parse(arrayOfQueue);
}

// по модалке уточнить у Виталика?
modal.addEventListener('click', function () {
  console.log(event.target.nodeName);
  console.log('модалка клик');

  if (event.target.nodeName === 'BUTTON') {
    if (event.target.className === 'btn libr-watched') {
      arrayOfWatched.push(localStorage.getItem('targetModal'));

      //просмотр
      console.log(localStorage.getItem('targetModal'));
      console.log('arrayOfWatched:', arrayOfWatched);

      localStorage.setItem('arrayOfWatched', JSON.stringify(arrayOfWatched));
    } else {
      arrayOfQueue.push(localStorage.getItem('targetModal'));

      //просмотр
      console.log(localStorage.getItem('targetModal'));
      console.log(arrayOfQueue);

      localStorage.setItem('arrayOfQueue', JSON.stringify(arrayOfQueue));
    }
  } else {
    return console.log('noButton');
  }
});

// кнопка просмотрено
watchedBtn.addEventListener('click', function () {
  // проверить класс
  const allList = document.querySelectorAll('.gallery');
  console.log('allList:', allList);
  for (const list of allList) {
    list.remove();
  }
  // привязать правильный класс
  const allTitle = document.querySelectorAll('.card-view');
  for (const title of allTitle) {
    title.remove();
  }
  const watchedList = document.createElement('ul');
  // проверить класс
  watchedList.setAttribute('class', 'gallery');
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
});

queueBtn.addEventListener('click', function () {
  // проверить класс
  const allList = document.querySelectorAll('.gallery');
  console.log('allList:', allList);
  for (const list of allList) {
    list.remove();
  }
  // привязать правильный класс
  const allTitle = document.querySelectorAll('.card-view');
  for (const title of allTitle) {
    title.remove();
  }
  const queueList = document.createElement('ul');
  // проверить класс
  queueList.setAttribute('class', 'gallery');
  main.appendChild(queueList);
  let queueArray = localStorage.getItem('arrayOfQueue');
  queueArray = JSON.parse(queueArray);
  for (const object of queueArray) {
    const innerHTML = JSON.parse(object);

    const li = document.createElement('li');
    li.setAttribute('class', 'list__element');
    li.insertAdjacentHTML('beforeend', innerHTML);
    queueList.appendChild(li);
  }
});

// работающие, проверенные консоли закомментить
// после approve - убрать все консоли?
// отрисовка - кто?
