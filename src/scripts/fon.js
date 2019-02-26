import { defer } from 'underscore';
import { mobile } from './helpers';
import fonLg from '../images/fon/laptop-common-fon.jpg';
import fonSm from '../images/fon/mobile-common-fon.jpg';

document.addEventListener('DOMContentLoaded', () => {
  function fonLoad() {
    if (mobile.matches) {
      const img = new Image();
      img.src = fonSm;
      img.onload = () => {
        defer(() => {
          document.documentElement.classList.add('fon-loaded');
        });
      };
    }
    if (!mobile.matches) {
      const img = new Image();
      img.src = fonLg;
      img.onload = () => {
        defer(() => {
          document.documentElement.classList.add('fon-loaded');
        });
      };
    }
  }
  mobile.addListener(fonLoad);
  fonLoad();
});
