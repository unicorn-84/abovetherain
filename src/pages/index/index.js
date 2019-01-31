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
import { checkRetina, mobile } from '../../scripts/components/helpers';
// Local
import './index.scss';
import mobileFon from '../../images/fon/mobile-index-fon.jpg';
import retinaMobileFon from '../../images/fon/mobile-index-fon@2x.jpg';
import laptopFon from '../../images/fon/laptop-index-fon.jpg';
import retinaLaptopFon from '../../images/fon/laptop-index-fon@2x.jpg';
// Inline

WebFont.load({
  custom: {
    families: ['hercules_modern'],
  },
});

jQuery.noConflict();
jQuery(document).ready(($) => {
  function imageLoad() {
    if (mobile.matches) {
      const img = new Image();
      if (checkRetina()) {
        img.src = retinaMobileFon;
      } else {
        img.src = mobileFon;
      }
      img.onload = () => {
        defer(() => {
          $('html').addClass('fon-loaded');
        });
      };
    }
    if (!mobile.matches) {
      const img = new Image();
      if (checkRetina()) {
        img.src = retinaLaptopFon;
      } else {
        img.src = laptopFon;
      }
      img.onload = () => {
        const spans = document.querySelectorAll('.caption h1 div span');
        defer(() => {
          $('html').addClass('fon-loaded');
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
