import { mobile } from './helpers';
import fonLg from '../../images/fon/laptop-common-fon.jpg';
import fonSm from '../../images/fon/mobile-common-fon.jpg';

document.addEventListener('DOMContentLoaded', () => {
  function fonLoad() {
    if (mobile.matches) {
      const img = new Image();
      img.src = fonSm;
      img.onload = () => {
        setTimeout(() => {
          document.documentElement.classList.add('fon-loaded');
        }, 0);
      };
    }
    if (!mobile.matches) {
      const img = new Image();
      img.src = fonLg;
      img.onload = () => {
        setTimeout(() => {
          document.documentElement.classList.add('fon-loaded');
        }, 0);
      };
    }
  }
  mobile.addListener(fonLoad);
  fonLoad();
});
