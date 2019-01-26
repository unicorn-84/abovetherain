import { defer } from 'underscore';
import logo from '../../images/logo/logo.png';
import logoRetina from '../../images/logo/logo@2x.png';
import { retinaCheck } from './helpers';

document.addEventListener('DOMContentLoaded', () => {
  function logoLoad() {
    const img = new Image();
    if (retinaCheck()) {
      img.src = logoRetina;
    } else {
      img.src = logo;
    }
    img.onload = () => {
      const logoContainer = document.querySelector('.navbar-brand img')
      defer(() => {
        logoContainer.src = img.src;
      });
    };
  }
  logoLoad();
});
