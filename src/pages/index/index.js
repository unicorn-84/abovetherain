// Vendors
import 'bootstrap.scss';
import 'collapse';
import 'carousel';
import { each } from 'underscore';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons'
// Common
import 'style.scss';
import '../../scripts/components/sticky';
import { retinaCheck } from '../../scripts/components/helpers';
// Local
import './index.scss';
import fonImage from '../../images/fon/index-fon@1x.jpg';
import retinaFonImage from '../../images/fon/index-fon@2x.jpg';
import slide1 from '../../images/slides/001-slide-1920x1080.jpg';
import slide2 from '../../images/slides/002-slide-1920x1080.jpg';
import slide3 from '../../images/slides/003-slide-1920x1080.jpg';
// Inline

jQuery.noConflict();
jQuery(document).ready(($) => {
  const $carousel = $('#abovetherain__primary-slider');
  $carousel.carousel('dispose');
  const mobile = window.matchMedia('(max-width: 991px)');
  function imageLoad() {
    if (mobile.matches) {
      const img = new Image();
      if (retinaCheck()) {
        img.src = retinaFonImage;
      } else {
        img.src = fonImage;
      }
      img.onload = () => {
        $('.carousel-indicators').css('display', 'flex').hide().fadeIn();
        $carousel.css({
          backgroundImage: `url(${img.src})`,
        });
        setTimeout(() => {
          $carousel.carousel('next').carousel();
        }, 1000);
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
  // FontAwesome icons
  library.add(fab, fas);
  dom.i2svg();
});
