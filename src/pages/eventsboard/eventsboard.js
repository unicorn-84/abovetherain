// SCSS
import 'bootstrap/scss/bootstrap.scss';
import '../../styles/style.scss';
import './eventsboard.scss';
// JS
import abovetherain from '../../scripts/init';
import '../../scripts/components/modal/modal';

document.addEventListener('DOMContentLoaded', () => {
  abovetherain.initialize();
});
