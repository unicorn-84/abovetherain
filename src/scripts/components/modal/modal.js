function createModalSpinner() {
  const modalSpinner = document.createElement('div');

  modalSpinner.classList.add('rain-css3-spinner');
  modalSpinner.innerHTML = '<div class="rain-css3-spinner-bounce1"></div><div class="rain-css3-spinner-bounce2"></div><div class="rain-css3-spinner-bounce3"></div>';
  return modalSpinner;
}

function createModalClose() {
  const modalClose = document.createElement('div');

  modalClose.classList.add('rain-modal-close');
  return modalClose;
}

function createModalOverlay() {
  const modalOverlay = document.createElement('div');

  modalOverlay.classList.add('rain-modal-overlay');
  modalOverlay.append(createModalSpinner());
  return modalOverlay;
}

function createModal() {
  const modal = document.createElement('div');

  modal.classList.add('rain-modal');
  modal.append(createModalOverlay());
  modal.append(createModalClose());
  return modal;
}

function insertData(data) {
  document.querySelector('.rain-modal').insertAdjacentHTML('beforeEnd', data);
  document.querySelector('.rain-css3-spinner').remove();
}

function removeModal() {
  document.querySelector('.rain-modal').remove();
}

function fetchData(url) {
  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('No data');
      }
      return response.text();
    })
    .then((text) => {
      insertData(text);
    })
    .catch(() => {
      removeModal();
    });
}

function modalHandler(element) {
  document.body.prepend(createModal());
  document.querySelector('.rain-modal-overlay').addEventListener('click', removeModal);
  document.querySelector('.rain-modal-close').addEventListener('click', removeModal);
  fetchData(element.href);
}

document.body.addEventListener('click', (e) => {
  console.log(e.target);
  if (e.target.hasAttribute('data-ajax')) {
    console.log(e.target);
    e.stopPropagation();
    e.preventDefault();
    modalHandler(e.target);
  }
});
