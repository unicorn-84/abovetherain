// TODO: 'Подложка для logo'
import logo from '../../images/logo/logo.png';
import logoRetina from '../../images/logo/logo@2x.png';
import { retinaCheck } from './helpers';
import { options } from '../../data';

document.addEventListener('DOMContentLoaded', () => {
  function logoLoad() {
    const img = new Image();
    img.alt = `Логотип | ${options.name}`;
    if (retinaCheck()) {
      img.src = logo;
      img.srcset = `${logoRetina} 2x`;
    } else {
      img.src = logo;
      img.srcset = `${logoRetina} 1x`;
    }
    img.onload = () => {
      setTimeout(() => {
        document.querySelector('.navbar-brand').appendChild(img);
      }, 0);
    };
  }
  logoLoad();
});
