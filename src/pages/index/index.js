// Vendors
import 'bootstrap.scss';
import 'collapse';
import 'carousel';
import WebFont from 'webfontloader';
import { each, defer } from 'underscore';
// Common
import '../../styles/main.scss';
import '../../scripts/components/icons';
import '../../scripts/components/logo';
import { retinaCheck } from '../../scripts/components/helpers';
// Local
import './index.scss';
import mobileFon from '../../images/fon/mobile-index-fon.jpg';
import retinaMobileFon from '../../images/fon/mobile-index-fon@2x.jpg';
// TODO: 'Добавить retina'
import laptopFon from '../../images/fon/laptop-index-fon.jpg';
// import retinaLaptopFon from '../../images/slides/002-slide-1920x1080.jpg';
// Inline

const mobile = window.matchMedia('(max-width: 991px)');

WebFont.load({
  custom: {
    families: ['hercules_modern'],
  },
});

jQuery.noConflict();
jQuery(document).ready(($) => {
  const $wrapper = $('#wrapper');
  function imageLoad() {
    if (mobile.matches) {
      const img = new Image();
      if (retinaCheck()) {
        img.src = retinaMobileFon;
      } else {
        img.src = mobileFon;
      }
      img.onload = () => {
        $wrapper.css({
          backgroundImage: `url(${img.src})`,
        });
      };
    }
    if (!mobile.matches) {
      const img = new Image();
      if (retinaCheck()) {
        img.src = laptopFon;
      } else {
        img.src = laptopFon;
      }
      img.onload = () => {
        const spans = document.querySelectorAll('.caption h1 div span');
        defer(() => {
          $wrapper.css({
            backgroundImage: `url(${img.src})`,
          });
        });
        each(spans, (span) => {
          defer(() => {
            span.classList.add('in-up-animation');
          });
        });
      };
    }
  }
  mobile.addListener(imageLoad);
  imageLoad();
});
