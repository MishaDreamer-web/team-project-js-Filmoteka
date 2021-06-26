import filmCardTpl from '../templates/one-movie-card.hbs';

const refs = {
  galleryList: document.querySelector('.gallery'),
};

const API_KEY = 'ded12b962797b74c61a2522ada6bc31b';
const BASE_URL = 'https://api.themoviedb.org/3';
let requestPage = 1;
let totalPages;
const drawnPages = 5;

fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${requestPage}`)
  .then(response => response.json())
  .then(({ results, total_pages }) => {
    //  console.log(results);
    totalPages = total_pages;
    const markup = filmCardTpl(results);
    refs.galleryList.innerHTML = markup;
    const paginationButtons = new PaginationButton(totalPages, drawnPages);

    paginationButtons.render();

    paginationButtons.onChange(e => {
      // console.log('-- changed', e.target.value);
      requestPage = e.target.value;
      fetch(
        `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${requestPage}`,
      )
        .then(response => response.json())
        .then(({ results }) => {
          //  console.log(results);
          const markup = filmCardTpl(results);
          refs.galleryList.innerHTML = markup;
        })
        .catch(error => {
          console.log(error);
        });
    });
  })
  .catch(error => {
    console.log(error);
  });

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
  paginationButtonContainer.className = 'pagination-buttons';

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
