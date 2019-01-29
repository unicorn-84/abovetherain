import { defer } from 'underscore';
import logo from '../../images/logo/logo.png';

document.addEventListener('DOMContentLoaded', () => {
  (function logoLoad() {
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      const logoContainer = document.querySelector('.navbar-brand img');
      defer(() => {
        logoContainer.src = img.src;
      });
    };
  }());
});
