// Vendor
// TODO: 'Добавить алиас'
import 'bootstrap.scss';
import 'carousel';
// Common
import '../../styles/style.scss';
// Local
import './services.scss';
// Inline

// import { fetchData, insertDataToModal } from '../../scripts/components/helpers';

// document.body.addEventListener('click', (e) => {
//   const target = e.target.closest('[data-ajax]');
//   if (target) {
//     import('../../scripts/components/modal/modal').then((module) => {
//       module.modalHandler();
//       fetchData(target.href, (error, htmlString) => {
//         if (error) {
//           console.log(error);
//           return;
//         }
//         insertDataToModal(htmlString);
//         if (document.querySelector('.carousel')) {
//           $('.carousel').carousel();
//         }
//       });
//     });
//     e.stopPropagation();
//     e.preventDefault();
//   }
// });

// function insertData(data) {
//   console.log('insert');
//   document.querySelector('.modal').insertAdjacentHTML('beforeEnd', data);
//   // document.querySelector('.modal').innerHTML = data;
//   document.querySelector('.abovetherain__css3-spinner').remove();
// }
//
