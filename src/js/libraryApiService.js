import FetchQuery from './filmApiService';
import filmLibraryCardTpl from '../templates/local-storage-library.hbs';

const fetchQuery = new FetchQuery();

const refsLs = {
  searchFormInput: document.querySelector('.header-search'),
  filmsRenderCard: document.querySelector('.gallery'),
  loaderEllips: document.querySelector('.loader-ellips'),
};

let listOfLibraryFetch = [];

let queueArray = localStorage.getItem('arrayOfQueue');
queueArray = JSON.parse(queueArray);
// console.log(queueArray);
if (queueArray !== null) {
  queueArray.map(item => {
    // console.log(item);
    fetchQuery.query = item;
    fetchQuery
      .fetchFilmsApi()
      .then(films => {
        // clearImagesContainer();
        listOfLibraryFetch.push(films);
        renderFilms(listOfLibraryFetch);
        addloaderEllipsClass();
      })
      .catch(onFetchError);
  });
}

function onFetchError(err) {
  //   error({
  //     title: 'Error. Something went wrong. Try again later or reload the page',
  //   });
  console.log(
    'Error. Something went wrong. Try again later or reload the page',
  );
}

function renderFilms(films) {
  const markup = filmLibraryCardTpl(films);
  refsLs.filmsRenderCard.innerHTML = markup;
}

function clearfilmsContainer() {
  refsLs.filmsRenderCard.innerHTML = '';
}

function addloaderEllipsClass() {
  refsLs.loaderEllips.classList.add('is-hidden');
}
