const watchedBtn = document.querySelector('.libr-watched');
const queueBtn = document.querySelector('.libr-queue');
const modal = document.querySelector('.lightbox');

let arrayOfWatched = [];
let arrayOfQueue = [];

modal.addEventListener('click', function (event) {
// console.log(event.target.nodeName);
// console.log('модалка клик');
  
  // на чем словить таргет и что записать в local storage??
  const target = event.target.nodeName
  localStorage.setItem('target', JSON.stringify(target))
  console.log(target)
  
  if (event.target.nodeName === 'BUTTON') {
    if (event.target.className === 'add-to-watched') {
      arrayOfWatched.push(localStorage.getItem('target'));

      // console.log(localStorage.getItem('target'));
      // console.log('arrayOfWatched:', arrayOfWatched);

      localStorage.setItem('arrayOfWatched', JSON.stringify(arrayOfWatched));

    } else {
      arrayOfQueue.push(localStorage.getItem('target'));

      // console.log(localStorage.getItem('target'));
      // console.log(arrayOfQueue);

      localStorage.setItem('arrayOfQueue', JSON.stringify(arrayOfQueue));

    }
  } else {
    return console.log('noButton');
  }
});