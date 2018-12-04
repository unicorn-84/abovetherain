import './modal.scss';

function createModalSpinner() {
  const modalSpinner = document.createElement('div');

  modalSpinner.classList.add('abovetherain__css3-spinner');
  modalSpinner.innerHTML = '<div class="abovetherain__css3-spinner-bounce1"></div><div class="abovetherain__css3-spinner-bounce2"></div><div class="abovetherain__css3-spinner-bounce3"></div>';
  return modalSpinner;
}

function createModalClose() {
  const modalClose = document.createElement('div');

  modalClose.classList.add('modal-close');
  return modalClose;
}

function createModalOverlay() {
  const modalOverlay = document.createElement('div');

  modalOverlay.classList.add('modal-overlay');
  modalOverlay.append(createModalSpinner());
  return modalOverlay;
}

function createModal() {
  const modal = document.createElement('div');

  modal.classList.add('modal');
  modal.append(createModalOverlay());
  modal.append(createModalClose());
  return modal;
}

function removeModal() {
  if (document.querySelector('.modal')) {
    document.querySelector('.modal').remove();
  }
}

function modalHandler() {
  document.body.prepend(createModal());
  document.querySelector('.modal-overlay').addEventListener('click', removeModal);
  document.querySelector('.modal-close').addEventListener('click', removeModal);
}

export { modalHandler, removeModal };
