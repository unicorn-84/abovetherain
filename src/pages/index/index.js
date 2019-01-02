// Vendors
import 'bootstrap.scss';
import 'collapse';
import 'carousel';
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
  $('#abovetherain__primary-slider').carousel('pause');
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
        $('#abovetherain__primary-slider').css({
          backgroundImage: `url(${img.src})`,
        }).carousel('cycle');
      };
    }
    if (!mobile.matches) {
      const img1 = new Image();
      if (retinaCheck()) {
        img1.src = slide1;
      } else {
        img1.src = slide1;
      }
      img1.onload = () => {
        $('.carousel-image').eq(0).css({
          backgroundImage: `url(${img1.src})`,
        });
        const img2 = new Image();
        const img3 = new Image();
        if (retinaCheck()) {
          img2.src = slide2;
          img3.src = slide3;
        } else {
          img2.src = slide2;
          img3.src = slide3;
        }
        img2.onload = () => {
          $('.carousel-image').eq(1).css({
            backgroundImage: `url(${img2.src})`,
          });
          $('#abovetherain__primary-slider').carousel('cycle');
        };
        img3.onload = () => {
          $('.carousel-image').eq(2).css({
            backgroundImage: `url(${img3.src})`,
          });
        };
      };
    }
  }
  mobile.addListener(imageLoad);
  imageLoad();
});
