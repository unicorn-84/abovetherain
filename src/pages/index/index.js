// Vendors
// TODO: 'Отдельный модуль для иконок'
import 'bootstrap.scss';
import 'collapse';
import 'carousel';
import { each } from 'underscore';
// Common
import '../../styles/main.scss';
import '../../scripts/components/sticky';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faPhoneSquare } from '@fortawesome/free-solid-svg-icons/faPhoneSquare';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { retinaCheck } from '../../scripts/components/helpers';
// Local
import './index.scss';
import fonImage from '../../images/fon/index-fon@1x.jpg';
import retinaFonImage from '../../images/fon/index-fon@2x.jpg';
// TODO: 'Добавить slides для retina'
import slide1 from '../../images/slides/001-slide-1920x1080.jpg';
import slide2 from '../../images/slides/002-slide-1920x1080.jpg';
import slide3 from '../../images/slides/003-slide-1920x1080.jpg';
// Inline

jQuery.noConflict();
jQuery(document).ready(($) => {
  const mobile = window.matchMedia('(max-width: 991px)');
  const $carousel = $('#abovetherain__primary-slider');
  $carousel.carousel('dispose');
  function imageLoad() {
    if (mobile.matches) {
      $('.carousel-indicators').hide();
      $('.carousel-controls').hide();
      const img = new Image();
      if (retinaCheck()) {
        img.src = retinaFonImage;
      } else {
        img.src = fonImage;
      }
      img.onload = () => {
        $carousel.css({
          backgroundImage: `url(${img.src})`,
        });
        setTimeout(() => {
          $carousel.carousel('next').carousel();
        }, 2500);
      };
    }
    if (!mobile.matches) {
      const slides = [slide1, slide2, slide3];
      const len = slides.length;
      let counter = 0;
      each(slides, (slide, index) => {
        const img = new Image();
        img.src = slide;
        img.addEventListener('load', () => {
          counter += 1;
          $('.carousel-image').eq(index).css({
            backgroundImage: `url(${slide})`,
          });
          if (counter === len) {
            $('.carousel-indicators').css('display', 'flex').hide().fadeIn();
            $('.carousel-controls').css('display', 'flex').hide().fadeIn();
            $('#abovetherain__primary-slider').carousel();
          }
        });
      });
    }
  }
  mobile.addListener(imageLoad);
  imageLoad();
});

library.add(faPhoneSquare, faBars);
dom.i2svg();
