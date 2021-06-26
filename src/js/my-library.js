const muLibraryHeder = document.querySelector('.header');
const home = document.querySelector('.js-home_link');
const library = document.querySelector('.js-library_link');
const currentHome = document.querySelector('.js-home-current');
const currentLibrary = document.querySelector('.js-library-current');

const Theme = {
  HOME: 'header-home',
  MY_LIBRARY: 'header-lbrary',
};

home.addEventListener('click', onClickHome);
library.addEventListener('click', onClickLibrary);

function onClickHome() {
  currentHome.classList.add('current');
  currentLibrary.classList.remove('current');
  onTheme();
}

function onClickLibrary() {
  currentHome.classList.remove('current');
  currentLibrary.classList.add('current');
  onTheme();
}

function onTheme() {
  if (currentHome.classList.contains('current')) {
    muLibraryHeder.classList.add(Theme.HOME);
    muLibraryHeder.classList.remove(Theme.MY_LIBRARY);
  } else {
    muLibraryHeder.classList.add(Theme.MY_LIBRARY);
    muLibraryHeder.classList.remove(Theme.HOME);
  }
}
