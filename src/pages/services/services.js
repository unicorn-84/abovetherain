import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap';
import '../../styles/style.scss';
import './services.scss';

document.body.addEventListener('click', (e) => {
  const target = e.target.closest('[data-ajax]');
  if (target) {
    import('../../scripts/components/modal/modal')
      .then(module => module.default());
    e.stopPropagation();
    e.preventDefault();
  }
});

// function insertData(data) {
//   console.log('insert');
//   document.querySelector('.modal').insertAdjacentHTML('beforeEnd', data);
//   // document.querySelector('.modal').innerHTML = data;
//   document.querySelector('.abovetherain__css3-spinner').remove();
// }
//
// function fetchData(url) {
//   fetch(url)
//   .then((response) => {
//     if (response.status !== 200) {
//       throw new Error('No data');
//     }
//     return response.text();
//   })
//   .then((text) => {
//     insertData(text);
//   })
//   .catch(() => {
//     removeModal();
//   });
// }

// fetchData(element.href);
