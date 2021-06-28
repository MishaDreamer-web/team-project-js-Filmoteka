import FilmsApiService from './apiService';
import ApiPopularMovies from './popular-movies-api.js';

import filmCardTpl from '../templates/local-storage-library.hbs';
import debounce from 'lodash.debounce';
// import { error } from '@pnotify/core/dist/PNotify.js';

const refsHs = {
  searchFormInput: document.querySelector('.header-search'),
  filmsRenderCard: document.querySelector('.gallery'),
  loaderEllips: document.querySelector('.loader-ellips'),
  errorSearcg: document.querySelector('.error-search'),
};

const filmApiService = new FilmsApiService();
const popularApiMovies = new ApiPopularMovies();
const drawnPages = 1;

refsHs.searchFormInput.addEventListener('input', debounce(onSearch, 1000));

function onSearch(e) {
  e.preventDefault();
  console.log(e.target.value);
  clearfilmsContainer(); //Для очистки соджержимого если инпут пустой
  filmApiService.query = e.target.value;
  if (e.target.value === '') {
    refsHs.errorSearcg.style.opacity = 0;
    fetchPopMovies();
    return;
  } else if (e.target.value === ' ') {
    refsHs.errorSearcg.style.opacity = 1;
    return;
  }
  filmApiService.resetPage();
  filmApiService
    .createSearchMovieGenres()
    .then(films => {
      if (films.length === 0) {
        refsHs.errorSearcg.style.opacity = 1;
      }
      const paginationTrending = document.querySelector(
        '.pagination-buttons-trending',
      );
      paginationTrending.remove(); //Удаляет пагинацию трендовых фильмов

      console.log(films);
      clearfilmsContainer();
      addloaderEllipsClass();
      renderfilms(films);

      const total = filmApiService.totalPages;
      const paginationButtons = new PaginationButton(total, drawnPages);
      // Отрисовка пагинации
      paginationButtons.render();
      // Посылает запрос на бекенд каждый раз при нажатии на кнопку страницы(нужно исправить, наверное)
      paginationButtons.onChange(e => {
        filmApiService.page = e.target.value;
        // Отрисовка найденых при переходе на другую страницу
        fetchSearchMovies();
      });
    })
    .catch(onFetchError)
    .finally(removeloaderEllipsClass());
}

function renderfilms(films) {
  refsHs.filmsRenderCard.insertAdjacentHTML('beforeend', filmCardTpl(films));
}

function onFetchError(err) {
  error({
    title: 'Error. Something went wrong. Try again later or reload the page',
  });
}

function clearfilmsContainer() {
  refsHs.filmsRenderCard.innerHTML = '';
}

function addloaderEllipsClass() {
  refsHs.loaderEllips.classList.add('is-hidden');
}

function removeloaderEllipsClass() {
  refsHs.loaderEllips.classList.remove('is-hidden');
}
const markup = results => {
  refsHs.filmsRenderCard.innerHTML = filmCardTpl(results);
  //   galleryList.insertAdjacentHTML('beforeend', filmCardTpl(results));
};

const fetchPopMovies = () => {
  popularApiMovies
    .createPopMovieGenres()
    .then(results => {
      markup(results);
    })
    .catch(error => {
      console.log(error);
    });
};

// const filmsApiService = new API();
// // const API_KEY = 'ded12b962797b74c61a2522ada6bc31b';
// // const BASE_URL = 'https://api.themoviedb.org/';

const fetchSearchMovies = () => {
  filmApiService
    .createSearchMovieGenres()
    .then(films => {
      clearfilmsContainer();
      addloaderEllipsClass();
      renderfilms(films);
    })
    .catch(error => {
      console.log(error);
    });
};

// Ниже идет код логики отрисовки пагинации (нужно вынести в отдельный файл)
const pageNumbers = (total, max, current) => {
  const half = Math.floor(max / 2);
  let to = max;

  if (current + half >= total) {
    to = total;
  } else if (current > half) {
    to = current + half;
  }

  let from = to - max;

  return Array.from({ length: max }, (_, i) => i + 1 + from);
};

function PaginationButton(totalPages, maxPagesVisible = 10, currentPage = 1) {
  let pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
  let currentPageBtn = null;
  const buttons = new Map();
  const disabled = {
    start: () => pages[0] === 1,
    prev: () => currentPage === 1,
    end: () => pages.slice(-1)[0] === totalPages,
    next: () => currentPage === totalPages,
  };
  const frag = document.createDocumentFragment();
  const paginationButtonContainer = document.createElement('div');
  paginationButtonContainer.className = 'pagination-buttons-search';

  const createAndSetupButton = (
    label = '',
    cls = '',
    disabled = false,
    handleClick,
  ) => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = label;
    buttonElement.className = `page-btn ${cls}`;
    buttonElement.disabled = disabled;
    buttonElement.addEventListener('click', e => {
      handleClick(e);
      this.update();
      paginationButtonContainer.value = currentPage;
      paginationButtonContainer.dispatchEvent(new Event('change'));
    });

    return buttonElement;
  };

  const onPageButtonClick = e =>
    (currentPage = Number(e.currentTarget.textContent));

  const onPageButtonUpdate = index => btn => {
    btn.textContent = pages[index];

    if (pages[index] === currentPage) {
      currentPageBtn.classList.remove('active');
      btn.classList.add('active');
      currentPageBtn = btn;
      currentPageBtn.focus();
    }
  };

  buttons.set(
    createAndSetupButton(
      'start',
      'start-page',
      disabled.start(),
      () => (currentPage = 1),
    ),
    btn => (btn.disabled = disabled.start()),
  );

  buttons.set(
    createAndSetupButton(
      'prev',
      'prev-page',
      disabled.prev(),
      () => (currentPage -= 1),
    ),
    btn => (btn.disabled = disabled.prev()),
  );

  pages.map((pageNumber, index) => {
    const isCurrentPage = currentPage === pageNumber;
    const button = createAndSetupButton(
      pageNumber,
      isCurrentPage ? 'active' : '',
      false,
      onPageButtonClick,
    );

    if (isCurrentPage) {
      currentPageBtn = button;
    }

    buttons.set(button, onPageButtonUpdate(index));
  });

  buttons.set(
    createAndSetupButton(
      'next',
      'next-page',
      disabled.next(),
      () => (currentPage += 1),
    ),
    btn => (btn.disabled = disabled.next()),
  );

  buttons.set(
    createAndSetupButton(
      'end',
      'end-page',
      disabled.end(),
      () => (currentPage = totalPages),
    ),
    btn => (btn.disabled = disabled.end()),
  );

  buttons.forEach((_, btn) => frag.appendChild(btn));
  paginationButtonContainer.appendChild(frag);

  this.render = (container = document.querySelector('.container')) => {
    container.appendChild(paginationButtonContainer);
  };

  this.update = (newPageNumber = currentPage) => {
    currentPage = newPageNumber;
    pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
    buttons.forEach((updateButton, btn) => updateButton(btn));
  };

  this.onChange = handler => {
    paginationButtonContainer.addEventListener('change', handler);
  };
}
