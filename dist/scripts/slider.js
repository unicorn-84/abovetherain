import './slider.scss';

const target = document.body;

function checkElement() {
  console.log('check element');
  const element = document.querySelector('div.abovetherain__modal-content');
  console.log(element);
}

const observer = new MutationObserver((mutations) => {
  console.log('Mutations');
  mutations.forEach(() => {
    checkElement();
  });
});

observer.observe(target, {
  childList: true,
});
