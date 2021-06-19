import filmCardTpl from '../templates/one-movie-card.hbs';

const refs = {
  galleryList: document.querySelector('.gallery'),
};

const API_KEY = 'ded12b962797b74c61a2522ada6bc31b';
const BASE_URL = 'https://api.themoviedb.org/';
const requestPage = 1;

fetch(`${BASE_URL}3/trending/all/day?api_key=${API_KEY}&page=${requestPage}`)
  .then(response => {
    return response.json();
  })
  .then(({ results }) => {
    console.log(results);
    const markup = filmCardTpl(results);
    refs.galleryList.innerHTML = markup;
  })
  .catch(error => {
    console.log(error);
  });

// export default class ApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   fetchArticles() {
//     // console.log(this);
//     return fetch(`${BASE_URL}all/day?api_key=${API_KEY}`)
//       .then(response => response.json())
//       .then(({ hits }) => {
//         this.incrementPage();

//         return hits;
//       });
//   }

//   incrementPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }
