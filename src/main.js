// SCSS
import './sass/main.scss';
// JS
import 'bootstrap';
import createSchedule from './scripts/schedule';

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#abovetherain__schedule')) {
    createSchedule();
  }
});
