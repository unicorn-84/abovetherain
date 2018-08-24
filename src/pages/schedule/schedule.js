// JS
import abovetherain from '../../scripts/init';
import '../../scripts/components/modal/modal';
import createSelect from '../../scripts/components/select/select';
// SCSS
import 'bootstrap/scss/bootstrap.scss';
import '../../styles/style.scss';
import './schedule.scss';

document.addEventListener('DOMContentLoaded', () => {
  abovetherain.initialize();
  createSelect();
  const tables = document.querySelectorAll('.schedule-table');
  tables.forEach((table) => {
    document.querySelectorAll('.select-list li').forEach((option) => {
      option.addEventListener('click', ({ target }) => {
        table.dataset.selected = target.getAttribute('value');
      });
    });
  });
});
