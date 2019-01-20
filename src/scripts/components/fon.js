import fonLg from '../../images/fon/001-fon-1920x1080.jpg';
import fonSm from '../../images/fon/001-fon-1080x1080.jpg';
import '../../styles/fon.scss';

document.addEventListener('DOMContentLoaded', () => {
  const mobile = window.matchMedia('(max-width: 991px)');
  function fonLoad() {
    if (mobile.matches) {
      const img = new Image();
      img.src = fonSm;
      img.onload = () => {
        const fonContainer = document.createElement('div');
        fonContainer.classList.add('fon');
        fonContainer.style.backgroundImage = `url(${img.src})`;
        setTimeout(() => {
          document.body.appendChild(fonContainer);
        }, 0);
      };
    }
    if (!mobile.matches) {
      const img = new Image();
      img.src = fonLg;
      img.onload = () => {
        const fonContainer = document.createElement('div');
        fonContainer.classList.add('fon');
        fonContainer.style.backgroundImage = `url(${img.src})`;
        setTimeout(() => {
          document.body.appendChild(fonContainer);
        }, 0);
      };
    }
  }
  mobile.addListener(fonLoad);
  fonLoad();
});
