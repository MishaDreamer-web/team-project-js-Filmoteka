(() => {
  const openModalBtn = document.querySelector('[data-modal-open]');
  const closeModalBtn = document.querySelector('.team-modal__button');
  const modal = document.querySelector('.modal-overlay');
  const body = document.querySelector('body');

  openModalBtn.addEventListener('click', openModal);

  function openModal() {
    modal.classList.remove('is-hidden');
    window.addEventListener('keydown', onPressEscape);
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', backdropCloseModal);
    body.classList.add('scroll-hidden');
  }
  function closeModal() {
    body.classList.remove('scroll-hidden');
    closeModalBtn.removeEventListener('click', closeModal);
    modal.classList.add('is-hidden');
    modal.removeEventListener('click', closeModal);
    window.removeEventListener('keydown', onPressEscape);
  }
  function onPressEscape(event) {
    if (event.code === 'Escape') {
      closeModal();
    }
  }
  function backdropCloseModal(event) {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  }
})();
