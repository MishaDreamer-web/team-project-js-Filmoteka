import throttle from 'lodash.throttle';

const upButton = document.querySelector('[data-up-btn]');

const hideElOnScroll = el => {
  return function hideOnScroll(e) {
    if (pageYOffset < document.documentElement.clientHeight) {
      el.classList.add('visually-hidden');
    } else {
      el.classList.remove('visually-hidden');
    }
  };
};

const toPageTopOnClick = e => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

upButton.addEventListener('click', toPageTopOnClick);
window.addEventListener('scroll', throttle(hideElOnScroll(upButton), 250));
