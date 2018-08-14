// JS
import abovetherain from '../../scripts/init';
import '../../scripts/components/modal/modal';
import createSelect from '../../scripts/components/select/select';
// SCSS
import 'bootstrap/scss/bootstrap.scss';
import '../../styles/style.scss';
import './coaches.scss';

document.addEventListener('DOMContentLoaded', () => {
  abovetherain.initialize();
  createSelect();
});
