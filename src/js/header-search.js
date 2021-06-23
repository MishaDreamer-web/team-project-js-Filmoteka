// import API from './filmApiService';
// import galleryCardsTpl from '../templates/one-movie-card.hbs'

// const refs = {
//     cardsFilm: document.querySelector('.js-gallery'),
//     searchForm: document.querySelector('.header-form')
// };

// const form = e.currentTarget;
// const searchInput = form.elements.query.value

// const filmsApiService = new API();
// // const API_KEY = 'ded12b962797b74c61a2522ada6bc31b';
// // const BASE_URL = 'https://api.themoviedb.org/';
// // const requestPage = 1;

// refs.searchForm.addEventListener('submit', debounce(onSearch, 500))



// function onSearch (e){
//     e.preventDefault ();


//     fetchFilms(searchInput)
// .then(renderCardFilm)
// .catch(error => console.log(error))
// .finally(() =>
// form.reset()
// )
// }

// function fetchFilms(filmId){
//     return fetch(`${BASE_URL}3//search/search-movies?api_key=${API_KEY}&page=${filmId}`)
//     .then(response => {
//             return response.json()
//         },
//     );
// }

// function renderCardFilm(film){
//     const markup = galleryCardsTpl(film)
//     refs.cardsFilm.innerHTML = markup
// }