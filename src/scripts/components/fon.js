import fonLg from '../../images/fon/laptop-common-fon.jpg';
import fonSm from '../../images/fon/mobile-common-fon.jpg';
import '../../styles/fon.scss';

document.addEventListener('DOMContentLoaded', () => {
  const mobile = window.matchMedia('(max-width: 991px)');
  function fonLoad() {
    if (mobile.matches) {
      const img = new Image();
      img.src = fonSm;
      img.onload = () => {
        setTimeout(() => {
          document.body.style.backgroundImage = `url(${img.src})`;
        }, 0);
      };
    }
    if (!mobile.matches) {
      const img = new Image();
      img.src = fonLg;
      img.onload = () => {
        setTimeout(() => {
          document.body.style.backgroundImage = `url(${img.src})`;
        }, 0);
      };
    }
  }
  mobile.addListener(fonLoad);
  fonLoad();
});
